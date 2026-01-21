import { db, categories, type Category, type NewCategory } from '@dashboard/database';
import { eq, and } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export class CategoryService {
    /**
     * Get all categories, optionally filtered by type
     */
    async getCategories(type?: 'income' | 'expense'): Promise<Category[]> {
        if (type) {
            return await db.select().from(categories).where(eq(categories.type, type));
        }
        return await db.select().from(categories);
    }

    /**
     * Get a single category by ID
     */
    async getCategoryById(id: string): Promise<Category | null> {
        const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
        return result[0] || null;
    }

    /**
     * Create a new category
     */
    async createCategory(data: Omit<NewCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
        const newCategory: NewCategory = {
            id: createId(),
            ...data,
        };

        const result = await db.insert(categories).values(newCategory).returning();
        return result[0];
    }

    /**
     * Update a category
     */
    async updateCategory(
        id: string,
        data: Partial<Omit<Category, 'id' | 'createdAt'>>
    ): Promise<Category | null> {
        const result = await db
            .update(categories)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(categories.id, id))
            .returning();

        return result[0] || null;
    }

    /**
     * Delete a category
     */
    async deleteCategory(id: string): Promise<boolean> {
        const result = await db.delete(categories).where(eq(categories.id, id)).returning();
        return result.length > 0;
    }
}

export const categoryService = new CategoryService();
