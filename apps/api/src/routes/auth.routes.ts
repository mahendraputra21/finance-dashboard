import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { db, users } from '@dashboard/database';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

const app = new Hono();

// Validation schemas
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    role: z.enum(['admin', 'user']).optional().default('user'),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

/**
 * POST /api/auth/signup
 * Register a new user with Supabase Auth
 */
app.post('/signup', zValidator('json', signupSchema), async (c) => {
    const { email, password, name, role } = c.req.valid('json');

    try {
        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role
                }
            }
        });

        if (authError) {
            return c.json({ error: authError.message }, 400);
        }

        if (!authData.user) {
            return c.json({ error: 'Failed to create user' }, 500);
        }

        // Create user record in our database
        await db.insert(users).values({
            id: authData.user.id,
            email: authData.user.email!,
            name,
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return c.json({
            message: 'User created successfully',
            user: {
                id: authData.user.id,
                email: authData.user.email!,
                name,
                role
            },
            session: authData.session
        }, 201);
    } catch (error: any) {
        console.error('Signup error:', error);
        return c.json({ error: error.message || 'Failed to create user' }, 500);
    }
});

/**
 * POST /api/auth/login
 * Login user with Supabase Auth
 */
app.post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return c.json({ error: 'Invalid credentials' }, 401);
        }

        if (!data.user || !data.session) {
            return c.json({ error: 'Login failed' }, 401);
        }

        // Get user details from our database
        const [userRecord] = await db.select().from(users).where(eq(users.id, data.user.id)).limit(1);

        return c.json({
            message: 'Login successful',
            user: userRecord || {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name,
                role: data.user.user_metadata?.role || 'user'
            },
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return c.json({ error: 'Login failed' }, 401);
    }
});

/**
 * POST /api/auth/logout
 * Logout user (client should clear token)
 */
app.post('/logout', async (c) => {
    const authHeader = c.req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);

        try {
            // Sign out the session
            await supabase.auth.admin.signOut(token);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return c.json({ message: 'Logout successful' });
});

/**
 * GET /api/auth/me
 * Get current user from token
 */
app.get('/me', async (c) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Not authenticated' }, 401);
    }

    const token = authHeader.substring(7);

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return c.json({ error: 'Invalid or expired token' }, 401);
        }

        // Get user record from our database
        const [userRecord] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);

        return c.json({
            user: userRecord || {
                id: user.id,
                email: user.email!,
                name: user.user_metadata?.name,
                role: user.user_metadata?.role || 'user'
            }
        });
    } catch (error: any) {
        console.error('Get user error:', error);
        return c.json({ error: 'Failed to get user' }, 500);
    }
});

export { app as authRoutes };
