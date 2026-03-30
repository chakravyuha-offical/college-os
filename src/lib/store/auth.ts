import { create } from 'zustand';
import { type UserRole, type ProfileVisibility } from '@/types';

interface UserProfile {
  id: string;
  userId: string;
  collegeId: string | null;
  role: UserRole;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  profileVisibility: ProfileVisibility;
  departmentId: string | null;
  classId: string | null;
}

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));

// Mock user for development (before Supabase is connected)
export const MOCK_STUDENT: UserProfile = {
  id: 'mock-profile-1',
  userId: 'mock-user-1',
  collegeId: 'mock-college-1',
  role: 'student',
  fullName: 'Aditya Gothe',
  email: 'aditya@college.edu',
  avatarUrl: null,
  bio: 'CSE student at KLE Tech',
  profileVisibility: 'PUBLIC',
  departmentId: 'cse-dept',
  classId: 'cse-d-sem2',
};

export const MOCK_TEACHER: UserProfile = {
  id: 'mock-profile-2',
  userId: 'mock-user-2',
  collegeId: 'mock-college-1',
  role: 'teacher',
  fullName: 'Prof. K.A. Kalagond',
  email: 'kalagond@college.edu',
  avatarUrl: null,
  bio: 'Mathematics & Data Structures',
  profileVisibility: 'PUBLIC',
  departmentId: 'cse-dept',
  classId: null,
};

export const MOCK_PRINCIPAL: UserProfile = {
  id: 'mock-profile-3',
  userId: 'mock-user-3',
  collegeId: 'mock-college-1',
  role: 'principal',
  fullName: 'Dr. B.V. Gopalakrishna',
  email: 'principal@college.edu',
  avatarUrl: null,
  bio: 'Principal, KLE Technological University',
  profileVisibility: 'PUBLIC',
  departmentId: null,
  classId: null,
};
