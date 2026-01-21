import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { categoryService } from '../services/category.service';

const app = new Hono();

// Validation schemas
const createCategorySchema = z.object({
    name: z.string().min(1),
    nameId: z.string().min(1),
    type: z.enum(['income', 'expense']),
    icon: z.string().optional(),
    color: z.string().optional(),
});

const updateCategorySchema = createCategorySchema.partial();

/**
 * GET /api/categories
 * Get all categories (public - no auth required)
 */
app.get('/', async (c) => {
    const type = c.req.query('type') as 'income' | 'expense' | undefined;

    try {
        const categories = await categoryService.getCategories(type);
        return c.json({ categories });
    } catch (error: any) {
        console.error('Get categories error:', error);
        return c.json({ error: 'Failed to fetch categories' }, 500);
    }
});

/**
 * GET /api/categories/:id
 * Get a single category (public - no auth required)
 */
app.get('/:id', async (c) => {
    const id = c.req.param('id');

    try {
        const category = await categoryService.getCategoryById(id);

        if (!category) {
            return c.json({ error: 'Category not found' }, 404);
        }

        return c.json({ category });
    } catch (error: any) {
        console.error('Get category error:', error);
        return c.json({ error: 'Failed to fetch category' }, 500);
    }
});

/**
 * POST /api/categories
 * Create a new category (admin only)
 */
app.post('/', requireAdmin, zValidator('json', createCategorySchema), async (c) => {
    const data = c.req.valid('json');

    try {
        const category = await categoryService.createCategory(data);
        return c.json({ category }, 201);
    } catch (error: any) {
        console.error('Create category error:', error);
        return c.json({ error: 'Failed to create category' }, 500);
    }
});

/**
 * PUT /api/categories/:id
 * Update a category (admin only)
 */
app.put('/:id', requireAdmin, zValidator('json', updateCategorySchema), async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');

    try {
        const category = await categoryService.updateCategory(id, data);

        if (!category) {
            return c.json({ error: 'Category not found' }, 404);
        }

        return c.json({ category });
    } catch (error: any) {
        console.error('Update category error:', error);
        return c.json({ error: 'Failed to update category' }, 500);
    }
});

/**
 * DELETE /api/categories/:id
 * Delete a category (admin only)
 */
app.delete('/:id', requireAdmin, async (c) => {
    const id = c.req.param('id');

    try {
        const deleted = await categoryService.deleteCategory(id);

        if (!deleted) {
            return c.json({ error: 'Category not found' }, 404);
        }

        return c.json({ message: 'Category deleted successfully' });
    } catch (error: any) {
        console.error('Delete category error:', error);
        return c.json({ error: 'Failed to delete category' }, 500);
    }
});

export { app as categoryRoutes };
