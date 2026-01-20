import type { Transaction, Category } from '@dashboard/types';

// Mock categories
export const mockCategories: Category[] = [
    // Income categories
    { id: '1', name: 'Salary', nameId: 'Gaji', type: 'income', icon: '💼', color: '#10B981' },
    { id: '2', name: 'Freelance', nameId: 'Freelance', type: 'income', icon: '💻', color: '#10B981' },
    { id: '3', name: 'Investment', nameId: 'Investasi', type: 'income', icon: '📈', color: '#10B981' },

    // Expense categories
    { id: '4', name: 'Groceries', nameId: 'Belanja', type: 'expense', icon: '🛒', color: '#EF4444' },
    { id: '5', name: 'Utilities', nameId: 'Utilitas', type: 'expense', icon: '⚡', color: '#EF4444' },
    { id: '6', name: 'Entertainment', nameId: 'Hiburan', type: 'expense', icon: '🎵', color: '#EF4444' },
    { id: '7', name: 'Dining', nameId: 'Makan', type: 'expense', icon: '☕', color: '#EF4444' },
    { id: '8', name: 'Shopping', nameId: 'Belanja', type: 'expense', icon: '🛍️', color: '#EF4444' },
    { id: '9', name: 'Transport', nameId: 'Transport', type: 'expense', icon: '🚗', color: '#EF4444' },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'income',
        amount: 90000000,
        category: 'Salary',
        description: 'Monthly Salary',
        date: '2023-10-24',
        icon: '💼',
        userId: '1',
    },
    {
        id: '2',
        type: 'expense',
        amount: 5000000,
        category: 'Freelance',
        description: 'Freelance Design',
        date: '2023-10-22',
        icon: '💻',
        userId: '1',
    },
    {
        id: '3',
        type: 'expense',
        amount: 12990,
        category: 'Entertainment',
        description: 'Spotify Premium',
        date: '2023-10-24',
        icon: '🎵',
        userId: '1',
    },
    {
        id: '4',
        type: 'income',
        amount: 3500000,
        category: 'Salary',
        description: 'Salary Deposit',
        date: '2023-10-23',
        icon: '💼',
        userId: '1',
    },
    {
        id: '5',
        type: 'expense',
        amount: 885050,
        category: 'Groceries',
        description: 'Whole Foods Market',
        date: '2023-10-22',
        icon: '🛒',
        userId: '1',
    },
    {
        id: '6',
        type: 'expense',
        amount: 1200000,
        category: 'Utilities',
        description: 'Electric Bill',
        date: '2023-10-21',
        icon: '⚡',
        userId: '1',
    },
    {
        id: '7',
        type: 'income',
        amount: 4500000,
        category: 'Freelance',
        description: 'Freelance Work',
        date: '2023-10-20',
        icon: '💻',
        userId: '1',
    },
    {
        id: '8',
        type: 'expense',
        amount: 57500,
        category: 'Dining',
        description: 'Starbucks',
        date: '2023-10-19',
        icon: '☕',
        userId: '1',
    },
];

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// Helper function to format date
export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};
