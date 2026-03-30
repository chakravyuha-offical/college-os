-- 011_parents.sql

CREATE TYPE parent_relationship AS ENUM ('FATHER', 'MOTHER', 'GUARDIAN', 'SIBLING', 'OTHER');
CREATE TYPE parent_link_status AS ENUM ('PENDING', 'ACTIVE', 'REVOKED');

-- 18. PARENT_LINKS
CREATE TABLE parent_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    relationship parent_relationship NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_emergency BOOLEAN NOT NULL DEFAULT FALSE,
    is_billing BOOLEAN NOT NULL DEFAULT FALSE,
    status parent_link_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);
