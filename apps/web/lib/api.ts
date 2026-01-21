import { getAccessToken } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class APIClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async getHeaders(): Promise<HeadersInit> {
        const token = await getAccessToken();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers = await this.getHeaders();
        const url = `${this.baseURL}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: response.statusText }));
            throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return response.json();
    }

    // Auth endpoints
    async signup(email: string, password: string, name: string) {
        return this.request<{ user: any; session: any }>('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });
    }

    async login(email: string, password: string) {
        return this.request<{ user: any; access_token: string }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async logout() {
        return this.request<{ message: string }>('/api/auth/logout', {
            method: 'POST',
        });
    }

    async getCurrentUser() {
        return this.request<{ user: any }>('/api/auth/me');
    }

    // Transaction endpoints
    async getTransactions(filters?: {
        type?: string;
        category?: string;
        startDate?: string;
        endDate?: string;
    }) {
        const params = new URLSearchParams();
        if (filters?.type) params.append('type', filters.type);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);

        const query = params.toString();
        return this.request<{ transactions: any[] }>(
            `/api/transactions${query ? `?${query}` : ''}`
        );
    }

    async getTransaction(id: string) {
        return this.request<{ transaction: any }>(`/api/transactions/${id}`);
    }

    async createTransaction(data: {
        type: string;
        amount: string;
        category: string;
        description: string;
        date: string;
    }) {
        return this.request<{ transaction: any }>('/api/transactions', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateTransaction(id: string, data: Partial<{
        type: string;
        amount: string;
        category: string;
        description: string;
        date: string;
    }>) {
        return this.request<{ transaction: any }>(`/api/transactions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteTransaction(id: string) {
        return this.request<{ message: string }>(`/api/transactions/${id}`, {
            method: 'DELETE',
        });
    }

    // Category endpoints
    async getCategories(type?: 'income' | 'expense') {
        const query = type ? `?type=${type}` : '';
        return this.request<{ categories: any[] }>(`/api/categories${query}`);
    }

    async createCategory(data: {
        name: string;
        nameId: string;
        type: 'income' | 'expense';
        icon?: string;
        color?: string;
    }) {
        return this.request<{ category: any }>('/api/categories', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Dashboard endpoints
    async getDashboardStats(filters?: { startDate?: string; endDate?: string }) {
        const params = new URLSearchParams();
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);

        const query = params.toString();
        return this.request<{
            totalIncome: string;
            totalExpense: string;
            balance: string;
            transactionCount: number;
        }>(`/api/dashboard/stats${query ? `?${query}` : ''}`);
    }

    async getChartData(filters?: { startDate?: string; endDate?: string }) {
        const params = new URLSearchParams();
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);

        const query = params.toString();
        return this.request<{
            data: Array<{ date: string; income: number; expense: number }>;
        }>(`/api/dashboard/chart${query ? `?${query}` : ''}`);
    }
}

export const api = new APIClient(API_URL);
