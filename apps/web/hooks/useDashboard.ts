import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface DashboardFilters {
    startDate?: string;
    endDate?: string;
}

// Get dashboard statistics
export function useDashboardStats(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ['dashboardStats', filters],
        queryFn: async () => {
            return api.getDashboardStats(filters);
        },
    });
}

// Get chart data
export function useChartData(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ['chartData', filters],
        queryFn: async () => {
            const response = await api.getChartData(filters);
            return response.data;
        },
    });
}
