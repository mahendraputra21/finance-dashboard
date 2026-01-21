// Re-export database types
export type {
    User,
    NewUser,
    Session,
    Transaction,
    NewTransaction,
    Category,
    NewCategory,
} from '@dashboard/database';

// User types (for frontend compatibility)
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

// API Request/Response Types

// Auth
export interface SignupRequest {
    email: string;
    password: string;
    name: string;
    role?: 'admin' | 'user';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token?: string;
    message?: string;
}

// Transactions
export interface CreateTransactionRequest {
    type: TransactionType;
    amount: number;
    category: string;
    description: string;
    date: string;
    icon?: string;
}

export interface UpdateTransactionRequest extends Partial<CreateTransactionRequest> { }

export interface TransactionResponse {
    transaction: Transaction;
}

export interface TransactionsResponse {
    transactions: Transaction[];
}

// Categories
export interface CreateCategoryRequest {
    name: string;
    nameId: string;
    type: TransactionType;
    icon?: string;
    color?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> { }

export interface CategoryResponse {
    category: Category;
}

export interface CategoriesResponse {
    categories: Category[];
}

// Dashboard
export interface DashboardStatsResponse {
    stats: DashboardStats;
}

export interface ChartDataResponse {
    chartData: ChartDataPoint[];
}

// Error Response
export interface ApiError {
    error: string;
}

