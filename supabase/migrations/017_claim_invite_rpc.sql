-- 017_claim_invite_rpc.sql
-- RPC function for users to claim an invite and get their profile + role assigned

DROP FUNCTION IF EXISTS claim_invite(text, text, text);

CREATE OR REPLACE FUNCTION claim_invite(
    p_code TEXT,
    p_full_name TEXT,
    p_email TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_invite RECORD;
    v_auth_uid UUID;
    v_profile_id UUID;
    v_result JSONB;
BEGIN
    -- 1. Must be authenticated
    v_auth_uid := auth.uid();
    IF v_auth_uid IS NULL THEN
        RAISE EXCEPTION 'Not authenticated.';
    END IF;

    -- 2. Prevent duplicate profile creation
    IF EXISTS (SELECT 1 FROM profiles WHERE auth_user_id = v_auth_uid) THEN
        RAISE EXCEPTION 'User profile already exists. You have already joined a college.';
    END IF;

    -- 3. Find and validate the invite
    SELECT * INTO v_invite FROM invites
    WHERE code = p_code
      AND status = 'ACTIVE'
    LIMIT 1;

    IF v_invite IS NULL THEN
        RAISE EXCEPTION 'Invalid or expired invite code.';
    END IF;

    -- 4. Check expiry
    IF v_invite.expires_at IS NOT NULL AND v_invite.expires_at < NOW() THEN
        UPDATE invites SET status = 'EXPIRED' WHERE id = v_invite.id;
        RAISE EXCEPTION 'This invite has expired.';
    END IF;

    -- 5. Check usage limit
    IF v_invite.max_uses IS NOT NULL AND v_invite.use_count >= v_invite.max_uses THEN
        UPDATE invites SET status = 'USED' WHERE id = v_invite.id;
        RAISE EXCEPTION 'This invite has reached its maximum uses.';
    END IF;

    -- 6. Create the profile
    INSERT INTO profiles (id, auth_user_id, college_id, department_id, role, full_name, email)
    VALUES (
        v_auth_uid,
        v_auth_uid,
        v_invite.college_id,
        v_invite.department_id,
        v_invite.target_role,
        p_full_name,
        p_email
    )
    RETURNING id INTO v_profile_id;

    -- 7. If student + class_id provided, enroll in class
    IF v_invite.target_role = 'student' AND v_invite.class_id IS NOT NULL THEN
        INSERT INTO class_enrollments (college_id, student_id, class_id, status)
        VALUES (v_invite.college_id, v_profile_id, v_invite.class_id, 'ACTIVE');
    END IF;

    -- 8. If parent invite, create parent_link
    IF v_invite.target_role = 'parent' AND v_invite.student_id IS NOT NULL THEN
        INSERT INTO parent_links (college_id, parent_id, student_id, relationship, status)
        VALUES (v_invite.college_id, v_profile_id, v_invite.student_id, 'GUARDIAN', 'ACTIVE');
    END IF;

    -- 9. Increment usage
    UPDATE invites
    SET use_count = use_count + 1,
        status = CASE
            WHEN max_uses IS NOT NULL AND use_count + 1 >= max_uses THEN 'USED'::invite_status
            ELSE 'ACTIVE'::invite_status
        END
    WHERE id = v_invite.id;

    -- 10. Return result
    v_result := jsonb_build_object(
        'profile_id', v_profile_id,
        'college_id', v_invite.college_id,
        'role', v_invite.target_role::text,
        'department_id', v_invite.department_id
    );

    RETURN v_result;
END;
$$;
