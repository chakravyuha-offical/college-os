-- 016_invites.sql
-- Invite system for controlled role-based onboarding

CREATE TYPE invite_type AS ENUM ('LINK', 'CODE');
CREATE TYPE invite_status AS ENUM ('ACTIVE', 'USED', 'EXPIRED', 'REVOKED');

CREATE TABLE invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    -- What role does this invite grant?
    target_role user_role NOT NULL,

    -- Optional: link to specific department/class
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,

    -- For parent invites: which student is linked?
    student_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

    -- The invite mechanism
    invite_type invite_type NOT NULL DEFAULT 'LINK',
    code TEXT UNIQUE NOT NULL,  -- 6-char alphanumeric for CODE type, UUID token for LINK type

    -- Usage limits
    max_uses INT DEFAULT 1,
    use_count INT DEFAULT 0,
    expires_at TIMESTAMPTZ,

    -- Metadata
    label TEXT,  -- Friendly label like "CSE Div-D Students"
    status invite_status DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invites_code ON invites(code);
CREATE INDEX idx_invites_college ON invites(college_id);

-- RLS
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

-- College members can view invites for their college
CREATE POLICY "tenant_isolation_invites" ON invites
    FOR ALL
    USING (
        college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid())
    );

-- Allow anyone to read an invite by code (needed for the join flow before profile exists)
CREATE POLICY "public_read_invite_by_code" ON invites
    FOR SELECT
    USING (true);
