import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import { dashboardService } from '../services/dashboard.service';
import type { AuthContext } from '../middleware/auth';

const app = new Hono();

// Apply auth middleware to all routes
app.use('*', requireAuth);

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics for the authenticated user
 */
app.get('/stats', async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');

    try {
        const stats = await dashboardService.getDashboardStats(user.id, startDate, endDate);
        return c.json({ stats });
    } catch (error: any) {
        console.error('Get dashboard stats error:', error);
        return c.json({ error: 'Failed to fetch dashboard stats' }, 500);
    }
});

/**
 * GET /api/dashboard/chart-data
 * Get chart data for the authenticated user
 */
app.get('/chart-data', async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');

    try {
        const chartData = await dashboardService.getChartData(user.id, startDate, endDate);
        return c.json({ chartData });
    } catch (error: any) {
        console.error('Get chart data error:', error);
        return c.json({ error: 'Failed to fetch chart data' }, 500);
    }
});

export { app as dashboardRoutes };
