import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Get all categories
export function useCategories(type?: 'income' | 'expense') {
    return useQuery({
        queryKey: ['categories', type],
        queryFn: async () => {
            const response = await api.getCategories(type);
            return response.categories;
        },
    });
}

// Create category mutation (admin only)
export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            name: string;
            nameId: string;
            type: 'income' | 'expense';
            icon?: string;
            color?: string;
        }) => {
            return api.createCategory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}
