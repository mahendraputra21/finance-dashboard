import { db } from './client';
import { users, categories, transactions } from './schema/index';
import { createId } from '@paralleldrive/cuid2';

async function seed() {
    console.log('🌱 Seeding database...');

    try {
        // Seed categories
        console.log('📂 Seeding categories...');

        const incomeCategories = [
            { name: 'Salary', nameId: 'Gaji', type: 'income' as const, icon: '💼', color: '#10B981' },
            { name: 'Freelance', nameId: 'Freelance', type: 'income' as const, icon: '💻', color: '#10B981' },
            { name: 'Investment', nameId: 'Investasi', type: 'income' as const, icon: '📈', color: '#10B981' },
            { name: 'Gifts', nameId: 'Hadiah', type: 'income' as const, icon: '🎁', color: '#10B981' },
            { name: 'Rental', nameId: 'Sewa', type: 'income' as const, icon: '🏠', color: '#10B981' },
        ];

        const expenseCategories = [
            { name: 'Groceries', nameId: 'Belanja', type: 'expense' as const, icon: '🛒', color: '#EF4444' },
            { name: 'Utilities', nameId: 'Utilitas', type: 'expense' as const, icon: '⚡', color: '#EF4444' },
            { name: 'Entertainment', nameId: 'Hiburan', type: 'expense' as const, icon: '🎵', color: '#EF4444' },
            { name: 'Dining', nameId: 'Makan', type: 'expense' as const, icon: '☕', color: '#EF4444' },
            { name: 'Shopping', nameId: 'Belanja', type: 'expense' as const, icon: '🛍️', color: '#EF4444' },
            { name: 'Transport', nameId: 'Transport', type: 'expense' as const, icon: '🚗', color: '#EF4444' },
        ];

        for (const category of [...incomeCategories, ...expenseCategories]) {
            await db.insert(categories).values({
                id: createId(),
                ...category,
            }).onConflictDoNothing();
        }

        console.log(`✅ Seeded ${incomeCategories.length + expenseCategories.length} categories`);

        // Seed test user (note: with Supabase Auth, users are created via auth.signUp, but we keep this for reference)
        console.log('👤 Seeding test user...');

        const testUserId = createId();
        await db.insert(users).values({
            id: testUserId,
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
        }).onConflictDoNothing();

        console.log('✅ Seeded test user (admin@example.com)');

        // Seed sample transactions
        console.log('💳 Seeding sample transactions...');

        const sampleTransactions = [
            {
                type: 'income',
                amount: '90000000',
                category: 'Salary',
                description: 'Monthly Salary',
                date: '2024-01-24',
            },
            {
                type: 'income',
                amount: '5000000',
                category: 'Freelance',
                description: 'Freelance Design Project',
                date: '2024-01-22',
            },
            {
                type: 'expense',
                amount: '12990',
                category: 'Entertainment',
                description: 'Spotify Premium',
                date: '2024-01-24',
            },
            {
                type: 'expense',
                amount: '885050',
                category: 'Groceries',
                description: 'Whole Foods Market',
                date: '2024-01-22',
            },
            {
                type: 'expense',
                amount: '1200000',
                category: 'Utilities',
                description: 'Electric Bill',
                date: '2024-01-21',
            },
            {
                type: 'income',
                amount: '4500000',
                category: 'Freelance',
                description: 'Website Development',
                date: '2024-01-20',
            },
            {
                type: 'expense',
                amount: '57500',
                category: 'Dining',
                description: 'Starbucks',
                date: '2024-01-19',
            },
        ];

        for (const transaction of sampleTransactions) {
            await db.insert(transactions).values({
                id: createId(),
                userId: testUserId,
                ...transaction,
            });
        }

        console.log(`✅ Seeded ${sampleTransactions.length} transactions`);
        console.log('✨ Database seeding completed successfully!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }

    process.exit(0);
}

seed();
