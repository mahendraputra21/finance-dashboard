import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});

// Helper to get current session
export const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

// Helper to get access token
export const getAccessToken = async () => {
    const session = await getSession();
    return session?.access_token || null;
};
