import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface Profile {
  full_name: string;
  date_of_birth?: string;
  gender?: string;
  phone?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  profile: Profile | null;
  setAuth: (token: string, user: User, profile: Profile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  user: null,
  profile: null,
  setAuth: (token, user, profile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
    set({ token, user, profile });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    set({ token: null, user: null, profile: null });
  },
}));
