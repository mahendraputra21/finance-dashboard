import { create } from 'zustand';
import type { DashboardStats, ChartDataPoint } from '@dashboard/types';
import { useTransactionStore } from './transactionStore';

interface DashboardState {
    startDate: string | null;
    endDate: string | null;
    setDateRange: (startDate: string | null, endDate: string | null) => void;
    getStats: () => DashboardStats;
    getChartData: () => ChartDataPoint[];
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    startDate: null,
    endDate: null,

    setDateRange: (startDate, endDate) => set({ startDate, endDate }),

    getStats: () => {
        const transactions = useTransactionStore.getState().transactions;
        const { startDate, endDate } = get();

        // Filter by date range if set
        const filteredTransactions = transactions.filter(t => {
            if (startDate && t.date < startDate) return false;
            if (endDate && t.date > endDate) return false;
            return true;
        });

        const totalIncome = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            currentBalance: totalIncome - totalExpense,
            incomeChange: 5.2,
            expenseChange: -3.1,
        };
    },

    getChartData: () => {
        const transactions = useTransactionStore.getState().transactions;
        const { startDate, endDate } = get();

        // Filter by date range
        const filteredTransactions = transactions.filter(t => {
            if (startDate && t.date < startDate) return false;
            if (endDate && t.date > endDate) return false;
            return true;
        });

        // Group by date
        const dateMap = new Map<string, { income: number; expense: number }>();

        filteredTransactions.forEach(t => {
            const existing = dateMap.get(t.date) || { income: 0, expense: 0 };
            if (t.type === 'income') {
                existing.income += t.amount;
            } else {
                existing.expense += t.amount;
            }
            dateMap.set(t.date, existing);
        });

        // Convert to array and sort by date
        const chartData: ChartDataPoint[] = Array.from(dateMap.entries())
            .map(([date, data]) => ({
                date,
                income: data.income,
                expense: data.expense,
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        return chartData;
    },
}));
