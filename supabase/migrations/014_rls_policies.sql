-- 014_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_bills ENABLE ROW LEVEL SECURITY;

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

ALTER TABLE timetable_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

ALTER TABLE file_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_links ENABLE ROW LEVEL SECURITY;

---
--- Tenant Isolation Policies (The most important security layer)
---

-- 1. Profiles
-- A user can see profiles from their own college, plus super_admins can see anything.
CREATE POLICY "tenant_isolation_profiles" ON profiles
    FOR ALL
    USING (
        college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid())
        OR 
        (SELECT role FROM profiles WHERE auth_user_id = auth.uid()) = 'super_admin'
    );

-- 2. Classes
-- Filter by the user's `college_id` inside their JWT (preferred) or by querying profiles. 
-- Using JWT metadata is much faster for RLS.
-- Ensure we set `college_id` in app metadata on login/signup using a trigger.
CREATE POLICY "tenant_isolation_classes" ON classes
    FOR ALL
    USING (
        college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid())
    );

-- Repeating this basic wrapper for all tenant tables to secure against cross-tenant attacks
CREATE POLICY "tenant_isolation_departments" ON departments FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_subjects" ON subjects FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_teacher_assignments" ON teacher_assignments FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_class_enrollments" ON class_enrollments FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_timetable_slots" ON timetable_slots FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_attendance" ON attendance_records FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_assignments" ON assignments FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_submissions" ON submissions FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_exams" ON exams FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_results" ON results FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_files" ON file_entries FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_notices" ON notices FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "tenant_isolation_parents" ON parent_links FOR ALL USING (college_id = (SELECT college_id FROM profiles WHERE auth_user_id = auth.uid()));

-- Specific Scoped Policies (Example: Submissions)
-- Teachers can see submissions for their assignments; students can only see their own.
CREATE POLICY "student_own_submission" ON submissions
    FOR SELECT
    USING (student_id = (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "student_own_attendance" ON attendance_records
    FOR SELECT
    USING (student_id = (SELECT id FROM profiles WHERE auth_user_id = auth.uid()));
