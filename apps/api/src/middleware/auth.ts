import type { Context, Next } from 'hono';
import { supabase } from '../lib/supabase';

export interface AuthContext {
    user: {
        id: string;
        email: string;
        name?: string;
        role?: string;
    };
}

/**
 * Middleware to verify authentication via Supabase JWT token
 */
export async function requireAuth(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Missing or invalid authorization header' }, 401);
    }

    const token = authHeader.substring(7);

    try {
        // Verify the JWT token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return c.json({ error: 'Invalid or expired token' }, 401);
        }

        // Attach user to context
        c.set('user', {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name,
            role: user.user_metadata?.role || 'user'
        });

        await next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return c.json({ error: 'Authentication failed' }, 401);
    }
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin(c: Context, next: Next) {
    await requireAuth(c, async () => {
        const user = c.get('user') as AuthContext['user'];

        if (user.role !== 'admin') {
            return c.json({ error: 'Admin access required' }, 403);
        }

        await next();
    });
}
