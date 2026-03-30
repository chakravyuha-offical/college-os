-- 015_onboarding_rpc.sql

-- This RPC function allows a new principal to simultaneously create their User Profile
-- AND register their College Tenant in one atomic transaction, entirely bypassing RLS safely.

DROP FUNCTION IF EXISTS register_new_college(text, text, text, text);

CREATE OR REPLACE FUNCTION register_new_college(
    p_college_name TEXT,
    p_address TEXT,
    p_full_name TEXT,
    p_email TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER -- Essential: Elevates privilege so it can INSERT into blocked RLS tables
SET search_path = public
AS $$
DECLARE
    v_college_id UUID;
    v_profile_id UUID;
    v_auth_uid UUID;
BEGIN
    -- 1. We must verify this is being called by an authenticated user
    v_auth_uid := auth.uid();
    IF v_auth_uid IS NULL THEN
        RAISE EXCEPTION 'Not authenticated.';
    END IF;

    -- 2. Prevent duplicate profile creation
    IF EXISTS (SELECT 1 FROM profiles WHERE auth_user_id = v_auth_uid) THEN
        RAISE EXCEPTION 'User profile already exists.';
    END IF;

    -- 3. INSERT into Colleges (matches 001_core_tables.sql schema)
    INSERT INTO colleges (name, address)
    VALUES (p_college_name, p_address)
    RETURNING id INTO v_college_id;

    -- 4. INSERT into Subscriptions (Free Trial — matches 001_core_tables.sql schema)
    INSERT INTO subscriptions (college_id, plan, status, trial_start, trial_end)
    VALUES (v_college_id, 'TRIAL', 'TRIAL', NOW(), NOW() + INTERVAL '14 days');

    -- 5. Finally, INSERT the Principal's Profile mapped to this new College ID
    --    (matches 003_users.sql schema: id and auth_user_id both reference auth.users)
    INSERT INTO profiles (id, auth_user_id, college_id, role, full_name, email)
    VALUES (v_auth_uid, v_auth_uid, v_college_id, 'principal', p_full_name, p_email)
    RETURNING id INTO v_profile_id;

    -- Return the newly created college tenant ID
    RETURN v_college_id;
END;
$$;
