// User types
export interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
}

// Transaction types
export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    category: string;
    description: string;
    date: string;
    icon?: string;
    userId: string;
}

// Category types
export interface Category {
    id: string;
    name: string;
    nameId: string; // Indonesian translation
    type: TransactionType;
    icon?: string;
    color?: string;
}

// Dashboard statistics
export interface DashboardStats {
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
    incomeChange: number; // Percentage change from last period
    expenseChange: number;
}

// Chart data
export interface ChartDataPoint {
    date: string;
    income: number;
    expense: number;
}

// Filter types
export interface TransactionFilters {
    search: string;
    startDate: string | null;
    endDate: string | null;
    category: string | null;
    type: TransactionType | 'all';
}
