import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { supabase } from '@/lib/supabase';

// Signup mutation
export function useSignup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { email: string; password: string; name: string }) => {
            return api.signup(data.email, data.password, data.name);
        },
        onSuccess: (data) => {
            // Set the session in Supabase client
            if (data.session) {
                supabase.auth.setSession({
                    access_token: data.session.access_token,
                    refresh_token: data.session.refresh_token,
                });
            }
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
}

// Login mutation
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            return api.login(data.email, data.password);
        },
        onSuccess: async (data) => {
            // Set the session in Supabase client
            if (data.access_token) {
                // Get full session from Supabase
                const { data: session } = await supabase.auth.getSession();
                if (!session.session) {
                    // If no session exists, create one by signing in
                    await supabase.auth.signInWithPassword({
                        email: '', // Will use token instead
                        password: '',
                    });
                }
            }
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
}

// Logout mutation
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await api.logout();
            await supabase.auth.signOut();
        },
        onSuccess: () => {
            queryClient.clear(); // Clear all queries
        },
    });
}

// Get current user query
export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const session = await supabase.auth.getSession();
            if (!session.data.session) {
                return null;
            }
            const response = await api.getCurrentUser();
            return response.user;
        },
        retry: false,
    });
}

// Check if user is authenticated
export function useIsAuthenticated() {
    const { data: user, isLoading } = useCurrentUser();
    return {
        isAuthenticated: !!user,
        isLoading,
        user,
    };
}
