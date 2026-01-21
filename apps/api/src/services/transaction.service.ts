import { db, transactions, type Transaction, type NewTransaction } from '@dashboard/database';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export interface TransactionFilters {
    search?: string;
    startDate?: string;
    endDate?: string;
    category?: string;
    type?: 'income' | 'expense' | 'all';
}

export interface DashboardStats {
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
    incomeChange: number;
    expenseChange: number;
}

export class TransactionService {
    /**
     * Get all transactions for a user with optional filters
     */
    async getTransactions(userId: string, filters?: TransactionFilters): Promise<Transaction[]> {
        let query = db.select().from(transactions).where(eq(transactions.userId, userId));

        // Apply filters
        const conditions = [eq(transactions.userId, userId)];

        if (filters?.startDate) {
            conditions.push(gte(transactions.date, filters.startDate));
        }

        if (filters?.endDate) {
            conditions.push(lte(transactions.date, filters.endDate));
        }

        if (filters?.category) {
            conditions.push(eq(transactions.category, filters.category));
        }

        if (filters?.type && filters.type !== 'all') {
            conditions.push(eq(transactions.type, filters.type));
        }

        const result = await db
            .select()
            .from(transactions)
            .where(and(...conditions))
            .orderBy(desc(transactions.date), desc(transactions.createdAt));

        // Apply search filter in memory (description search)
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            return result.filter((t) =>
                t.description.toLowerCase().includes(searchLower)
            );
        }

        return result;
    }

    /**
     * Get a single transaction by ID
     */
    async getTransactionById(id: string, userId: string): Promise<Transaction | null> {
        const result = await db
            .select()
            .from(transactions)
            .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
            .limit(1);

        return result[0] || null;
    }

    /**
     * Create a new transaction
     */
    async createTransaction(data: Omit<NewTransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
        const newTransaction: NewTransaction = {
            id: createId(),
            ...data,
        };

        const result = await db.insert(transactions).values(newTransaction).returning();
        return result[0];
    }

    /**
     * Update a transaction
     */
    async updateTransaction(
        id: string,
        userId: string,
        data: Partial<Omit<Transaction, 'id' | 'userId' | 'createdAt'>>
    ): Promise<Transaction | null> {
        const result = await db
            .update(transactions)
            .set({ ...data, updatedAt: new Date() })
            .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
            .returning();

        return result[0] || null;
    }

    /**
     * Delete a transaction
     */
    async deleteTransaction(id: string, userId: string): Promise<boolean> {
        const result = await db
            .delete(transactions)
            .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
            .returning();

        return result.length > 0;
    }

    /**
     * Get dashboard statistics for a user
     */
    async getTransactionStats(
        userId: string,
        startDate?: string,
        endDate?: string
    ): Promise<DashboardStats> {
        const conditions = [eq(transactions.userId, userId)];

        if (startDate) {
            conditions.push(gte(transactions.date, startDate));
        }

        if (endDate) {
            conditions.push(lte(transactions.date, endDate));
        }

        const result = await db
            .select()
            .from(transactions)
            .where(and(...conditions));

        const totalIncome = result
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const totalExpense = result
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        // TODO: Calculate actual percentage changes from previous period
        return {
            totalIncome,
            totalExpense,
            currentBalance: totalIncome - totalExpense,
            incomeChange: 0, // Placeholder
            expenseChange: 0, // Placeholder
        };
    }
}

export const transactionService = new TransactionService();
