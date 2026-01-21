import { Hono } from 'hono';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new Hono();
console.log('Base app created');

try {
    const { authRoutes } = await import('./routes/auth.routes');
    console.log('Auth routes imported');

    app.route('/api/auth', authRoutes);
    console.log('Auth routes mounted');
} catch (error) {
    console.error('Error importing auth routes:', error);
}

console.log('Test complete!');
