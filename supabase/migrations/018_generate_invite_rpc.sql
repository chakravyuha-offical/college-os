-- 018_generate_invite_rpc.sql
-- RPC function for admins to generate invite codes/links

DROP FUNCTION IF EXISTS generate_invite(user_role, uuid, uuid, uuid, invite_type, int, interval, text);

CREATE OR REPLACE FUNCTION generate_invite(
    p_target_role user_role,
    p_department_id UUID DEFAULT NULL,
    p_class_id UUID DEFAULT NULL,
    p_student_id UUID DEFAULT NULL,
    p_invite_type invite_type DEFAULT 'CODE',
    p_max_uses INT DEFAULT 1,
    p_expires_in INTERVAL DEFAULT INTERVAL '7 days',
    p_label TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_auth_uid UUID;
    v_caller RECORD;
    v_code TEXT;
    v_invite_id UUID;
    v_result JSONB;
BEGIN
    -- 1. Must be authenticated
    v_auth_uid := auth.uid();
    IF v_auth_uid IS NULL THEN
        RAISE EXCEPTION 'Not authenticated.';
    END IF;

    -- 2. Get caller's profile
    SELECT id, college_id, role INTO v_caller
    FROM profiles WHERE auth_user_id = v_auth_uid;

    IF v_caller IS NULL THEN
        RAISE EXCEPTION 'No profile found.';
    END IF;

    -- 3. Permission check: only principal, vice_principal, coordinator, hod, teacher can create invites
    IF v_caller.role NOT IN ('principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'super_admin') THEN
        RAISE EXCEPTION 'You do not have permission to create invites.';
    END IF;

    -- 4. Role hierarchy enforcement
    -- Teachers can only invite students and parents
    IF v_caller.role = 'teacher' AND p_target_role NOT IN ('student', 'parent') THEN
        RAISE EXCEPTION 'Teachers can only invite students and parents.';
    END IF;

    -- HODs can invite teachers, students, parents
    IF v_caller.role = 'hod' AND p_target_role NOT IN ('teacher', 'student', 'parent') THEN
        RAISE EXCEPTION 'HODs can only invite teachers, students, and parents.';
    END IF;

    -- 5. Generate code
    IF p_invite_type = 'CODE' THEN
        -- Generate 6-char alphanumeric code
        v_code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
        -- Ensure uniqueness
        WHILE EXISTS (SELECT 1 FROM invites WHERE code = v_code) LOOP
            v_code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
        END LOOP;
    ELSE
        -- Generate UUID token for links
        v_code := gen_random_uuid()::text;
    END IF;

    -- 6. Insert invite
    INSERT INTO invites (
        college_id, created_by, target_role,
        department_id, class_id, student_id,
        invite_type, code, max_uses, expires_at, label
    )
    VALUES (
        v_caller.college_id, v_caller.id, p_target_role,
        p_department_id, p_class_id, p_student_id,
        p_invite_type, v_code,
        p_max_uses,
        CASE WHEN p_expires_in IS NOT NULL THEN NOW() + p_expires_in ELSE NULL END,
        p_label
    )
    RETURNING id INTO v_invite_id;

    -- 7. Return result
    v_result := jsonb_build_object(
        'invite_id', v_invite_id,
        'code', v_code,
        'invite_type', p_invite_type::text,
        'target_role', p_target_role::text,
        'max_uses', p_max_uses,
        'expires_at', (NOW() + p_expires_in)::text
    );

    RETURN v_result;
END;
$$;
