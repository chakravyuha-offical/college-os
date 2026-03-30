// ============================================
// College OS — TypeScript Types
// ============================================

// --- Roles ---
export type UserRole =
  | 'super_admin'
  | 'principal'
  | 'vice_principal'
  | 'coordinator'
  | 'hod'
  | 'teacher'
  | 'student'
  | 'parent';

// --- Subscription ---
export type SubscriptionStatus = 'TRIAL' | 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
export type BillStatus = 'GENERATED' | 'PAID' | 'OVERDUE';
export type PremiumPlan = 'AI_BASIC' | 'AI_PRO';
export type PremiumStatus = 'ACTIVE' | 'EXPIRED';

// --- Academic ---
export type CycleType = 'PHYSICS' | 'CHEMISTRY' | 'BRANCH';
export type TimetableSlotStatus = 'DRAFT' | 'PUBLISHED';

// --- Attendance ---
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE';

// --- Assignments ---
export type AssignmentPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type SubmissionStatus =
  | 'PENDING'
  | 'SUBMITTED'
  | 'LATE_SUBMITTED'
  | 'GRADED'
  | 'RETURNED'
  | 'RESUBMITTED';

// --- Exams ---
export type ExamType = 'CIE1' | 'CIE2' | 'SEE';
export type ExamStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'RESULTS_PUBLISHED';

// --- Files ---
export type FileVisibility = 'PUBLIC' | 'PRIVATE';

// --- Notices ---
export type NoticePriority = 'NORMAL' | 'IMPORTANT' | 'URGENT';
export type NoticeCategory =
  | 'GENERAL'
  | 'ACADEMIC'
  | 'EVENT'
  | 'EXAM'
  | 'HOLIDAY'
  | 'SPORTS'
  | 'CULTURAL';

// --- Social ---
export type ProfileVisibility = 'PUBLIC' | 'PRIVATE' | 'HIDDEN';
export type FollowStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'BLOCKED';
export type ConversationType = 'STUDENT_DM' | 'PARENT_TEACHER';

// --- Branch Allocation ---
export type BranchPreferenceStatus = 'SUBMITTED' | 'ALLOCATED' | 'CONFIRMED';

// --- VTU Import ---
export type VtuImportSource = 'MANUAL_CSV' | 'VTU_SCRAPE';
export type VtuImportStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

// ============================================
// Database Row Interfaces
// ============================================

export interface College {
  id: string;
  name: string;
  address: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  college_id: string;
  status: SubscriptionStatus;
  trial_ends_at: string | null;
  plan_started_at: string | null;
  student_rate: number;
  staff_rate: number;
}

export interface Profile {
  id: string;
  user_id: string;
  college_id: string | null;
  role: UserRole;
  full_name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  profile_visibility: ProfileVisibility;
  department_id: string | null;
  class_id: string | null;
  follower_count: number;
  following_count: number;
  created_at: string;
}

export interface Department {
  id: string;
  college_id: string;
  name: string;
  code: string;
}

export interface Branch {
  id: string;
  college_id: string;
  name: string;
  code: string;
}

export interface Division {
  id: string;
  branch_id: string;
  college_id: string;
  letter: string;
}

export interface Semester {
  id: string;
  college_id: string;
  number: number;
  year: number;
  cycle_type: CycleType;
  start_date: string | null;
  end_date: string | null;
}

export interface Subject {
  id: string;
  college_id: string;
  branch_id: string;
  semester_id: string;
  name: string;
  code: string;
  credits: number;
}

export interface TimetableSlot {
  id: string;
  college_id: string;
  division_id: string;
  subject_id: string;
  teacher_id: string;
  day: string;
  start_time: string;
  end_time: string;
  room: string;
  status: TimetableSlotStatus;
}

export interface AttendanceRecord {
  id: string;
  college_id: string;
  student_id: string;
  slot_id: string;
  date: string;
  status: AttendanceStatus;
  marked_by: string;
}

export interface Assignment {
  id: string;
  college_id: string;
  subject_id: string;
  division_id: string;
  teacher_id: string;
  title: string;
  description: string;
  due_date: string;
  priority: AssignmentPriority;
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  status: SubmissionStatus;
  submitted_at: string | null;
  grade: string | null;
  feedback: string | null;
  file_urls: string[];
  resubmission_count: number;
}

export interface Exam {
  id: string;
  college_id: string;
  subject_id: string;
  division_id: string;
  semester_id: string;
  exam_type: ExamType;
  total_marks: number;
  passing_marks: number;
  date: string;
  status: ExamStatus;
}

export interface Result {
  id: string;
  exam_id: string;
  student_id: string;
  marks_obtained: number;
  entered_by: string;
  published: boolean;
}

export interface Notice {
  id: string;
  college_id: string;
  title: string;
  body: string;
  category: NoticeCategory;
  priority: NoticePriority;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  target_audience: string | null;
  image_url: string | null;
  attachment_urls: string[];
  created_at: string;
}

export interface FileEntry {
  id: string;
  college_id: string;
  owner_id: string;
  name: string;
  file_url: string;
  visibility: FileVisibility;
  is_vault: boolean;
  folder_path: string;
  size_bytes: number;
  created_at: string;
}

// --- Navigation ---
export interface NavItem {
  title: string;
  href: string;
  icon: string; // Material Symbols icon name
  roles: UserRole[];
  badge?: number;
}
