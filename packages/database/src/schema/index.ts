import { relations } from 'drizzle-orm';
import { users } from './users';
import { transactions } from './transactions';
import { categories } from './categories';

// User relations
export const usersRelations = relations(users, ({ many }) => ({
    transactions: many(transactions),
}));

// Transaction relations
export const transactionsRelations = relations(transactions, ({ one }) => ({
    user: one(users, {
        fields: [transactions.userId],
        references: [users.id],
    }),
}));

// Export all tables
export { users, transactions, categories };
export type { User, NewUser } from './users';
export type { Transaction, NewTransaction } from './transactions';
export type { Category, NewCategory } from './categories';
