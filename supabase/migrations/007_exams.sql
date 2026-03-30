-- 007_exams.sql

CREATE TYPE exam_type_enum AS ENUM ('CIE1', 'CIE2', 'CIE3', 'SEE', 'LAB_INTERNAL', 'LAB_EXTERNAL');
CREATE TYPE exam_status AS ENUM ('PLANNED', 'PUBLISHED', 'COMPLETED', 'RESULTS_DECLARED');

-- 14. EXAMS
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    exam_type exam_type_enum NOT NULL,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_marks INT NOT NULL DEFAULT 50,
    status exam_status NOT NULL DEFAULT 'PLANNED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. RESULTS
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    marks_obtained DECIMAL(5,2),
    grade TEXT,
    entered_by UUID NOT NULL REFERENCES profiles(id),
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(exam_id, student_id)
);
