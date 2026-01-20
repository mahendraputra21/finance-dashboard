import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@dashboard/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, role?: 'admin' | 'user') => void;
    logout: () => void;
    register: (fullName: string, email: string, password: string, role: 'admin' | 'user') => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (email, password, role = 'user') => {
                // Mock login - in production, this would call an API
                const mockUser: User = {
                    id: '1',
                    fullName: 'John Doe',
                    email,
                    role,
                    createdAt: new Date().toISOString(),
                };
                set({ user: mockUser, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            register: (fullName, email, password, role) => {
                // Mock registration - in production, this would call an API
                const mockUser: User = {
                    id: Date.now().toString(),
                    fullName,
                    email,
                    role,
                    createdAt: new Date().toISOString(),
                };
                set({ user: mockUser, isAuthenticated: true });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
