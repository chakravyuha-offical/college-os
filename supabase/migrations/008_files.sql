-- 008_files.sql

CREATE TYPE file_visibility AS ENUM ('PRIVATE', 'SHARED', 'PUBLIC', 'ARCHIVED');

-- 16. FILE_ENTRIES (Metadata for Storage Buckets)
CREATE TABLE file_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES profiles(id),
    folder_id UUID REFERENCES file_entries(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    size_bytes BIGINT DEFAULT 0,
    visibility file_visibility NOT NULL DEFAULT 'PRIVATE',
    is_vault BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
