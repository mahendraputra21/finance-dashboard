import { pgTable, text, numeric, date, timestamp, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const transactions = pgTable('transactions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id),
    type: text('type').notNull(), // 'income' | 'expense'
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    category: text('category').notNull(),
    description: text('description').notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    userIdIdx: index('transactions_user_id_idx').on(table.userId),
    dateIdx: index('transactions_date_idx').on(table.date),
    userDateIdx: index('transactions_user_date_idx').on(table.userId, table.date),
}));

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
