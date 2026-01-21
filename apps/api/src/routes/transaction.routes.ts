import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import { transactionService } from '../services/transaction.service';
import type { AuthContext } from '../middleware/auth';

const app = new Hono();

// Apply auth middleware to all routes
app.use('*', requireAuth);

// Validation schemas
const createTransactionSchema = z.object({
    type: z.enum(['income', 'expense']),
    amount: z.number().positive(),
    category: z.string().min(1),
    description: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
    icon: z.string().optional(),
});

const updateTransactionSchema = createTransactionSchema.partial();

const queryFiltersSchema = z.object({
    search: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    category: z.string().optional(),
    type: z.enum(['income', 'expense', 'all']).optional(),
});

/**
 * GET /api/transactions
 * Get all transactions for the authenticated user
 */
app.get('/', zValidator('query', queryFiltersSchema), async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const filters = c.req.valid('query');

    try {
        const transactions = await transactionService.getTransactions(user.id, filters);
        return c.json({ transactions });
    } catch (error: any) {
        console.error('Get transactions error:', error);
        return c.json({ error: 'Failed to fetch transactions' }, 500);
    }
});

/**
 * GET /api/transactions/:id
 * Get a single transaction
 */
app.get('/:id', async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const id = c.req.param('id');

    try {
        const transaction = await transactionService.getTransactionById(id, user.id);

        if (!transaction) {
            return c.json({ error: 'Transaction not found' }, 404);
        }

        return c.json({ transaction });
    } catch (error: any) {
        console.error('Get transaction error:', error);
        return c.json({ error: 'Failed to fetch transaction' }, 500);
    }
});

/**
 * POST /api/transactions
 * Create a new transaction
 */
app.post('/', zValidator('json', createTransactionSchema), async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const data = c.req.valid('json');

    try {
        const transaction = await transactionService.createTransaction({
            ...data,
            amount: data.amount.toString(),
            userId: user.id,
        });

        return c.json({ transaction }, 201);
    } catch (error: any) {
        console.error('Create transaction error:', error);
        return c.json({ error: 'Failed to create transaction' }, 500);
    }
});

/**
 * PUT /api/transactions/:id
 * Update a transaction
 */
app.put('/:id', zValidator('json', updateTransactionSchema), async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const id = c.req.param('id');
    const data = c.req.valid('json');

    try {
        const updateData = {
            ...data,
            ...(data.amount && { amount: data.amount.toString() }),
        };

        const transaction = await transactionService.updateTransaction(id, user.id, updateData);

        if (!transaction) {
            return c.json({ error: 'Transaction not found' }, 404);
        }

        return c.json({ transaction });
    } catch (error: any) {
        console.error('Update transaction error:', error);
        return c.json({ error: 'Failed to update transaction' }, 500);
    }
});

/**
 * DELETE /api/transactions/:id
 * Delete a transaction
 */
app.delete('/:id', async (c) => {
    const user = c.get('user') as AuthContext['user'];
    const id = c.req.param('id');

    try {
        const deleted = await transactionService.deleteTransaction(id, user.id);

        if (!deleted) {
            return c.json({ error: 'Transaction not found' }, 404);
        }

        return c.json({ message: 'Transaction deleted successfully' });
    } catch (error: any) {
        console.error('Delete transaction error:', error);
        return c.json({ error: 'Failed to delete transaction' }, 500);
    }
});

export { app as transactionRoutes };
