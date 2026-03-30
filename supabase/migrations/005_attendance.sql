-- 005_attendance.sql

CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE');

-- 11. ATTENDANCE_RECORDS
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    timetable_slot_id UUID REFERENCES timetable_slots(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    status attendance_status NOT NULL DEFAULT 'PRESENT',
    marked_by UUID NOT NULL REFERENCES profiles(id),
    marked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    edited_by UUID REFERENCES profiles(id),
    edit_reason TEXT,
    UNIQUE(student_id, timetable_slot_id, date)
);
