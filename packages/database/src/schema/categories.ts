import { pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    nameId: text('name_id').notNull(),
    type: text('type', { enum: ['income', 'expense'] }).notNull(),
    icon: text('icon'),
    color: text('color'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
    nameTypeIdx: uniqueIndex('categories_name_type_idx').on(table.name, table.type),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
