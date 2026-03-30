-- 009_notices.sql

CREATE TYPE notice_category AS ENUM ('GENERAL', 'EXAM', 'EVENT', 'IMPORTANT', 'CULTURAL', 'HOLIDAY', 'ACADEMIC', 'SPORTS');
CREATE TYPE notice_priority AS ENUM ('NORMAL', 'IMPORTANT', 'URGENT');

-- 17. NOTICES
CREATE TABLE notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    category notice_category NOT NULL DEFAULT 'GENERAL',
    priority notice_priority NOT NULL DEFAULT 'NORMAL',
    target_audience JSONB NOT NULL DEFAULT '{"roles": ["all"]}'::jsonb, -- e.g. {"roles": ["student"], "classes": ["id-1", "id-2"]}
    attachments JSONB DEFAULT '[]'::jsonb,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
