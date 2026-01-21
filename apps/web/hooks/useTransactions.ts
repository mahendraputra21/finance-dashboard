import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface TransactionFilters {
    type?: 'income' | 'expense';
    category?: string;
    startDate?: string;
    endDate?: string;
}

// Get all transactions
export function useTransactions(filters?: TransactionFilters) {
    return useQuery({
        queryKey: ['transactions', filters],
        queryFn: async () => {
            const response = await api.getTransactions(filters);
            return response.transactions;
        },
    });
}

// Get single transaction
export function useTransaction(id: string) {
    return useQuery({
        queryKey: ['transaction', id],
        queryFn: async () => {
            const response = await api.getTransaction(id);
            return response.transaction;
        },
        enabled: !!id,
    });
}

// Create transaction mutation
export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            type: 'income' | 'expense';
            amount: string;
            category: string;
            description: string;
            date: string;
        }) => {
            return api.createTransaction(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
            queryClient.invalidateQueries({ queryKey: ['chartData'] });
        },
    });
}

// Update transaction mutation
export function useUpdateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: Partial<{
                type: 'income' | 'expense';
                amount: string;
                category: string;
                description: string;
                date: string;
            }>;
        }) => {
            return api.updateTransaction(id, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transaction', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
            queryClient.invalidateQueries({ queryKey: ['chartData'] });
        },
    });
}

// Delete transaction mutation
export function useDeleteTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return api.deleteTransaction(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
            queryClient.invalidateQueries({ queryKey: ['chartData'] });
        },
    });
}
