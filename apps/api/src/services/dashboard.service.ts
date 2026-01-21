import { transactionService } from './transaction.service';

export interface ChartDataPoint {
    date: string;
    income: number;
    expense: number;
}

export class DashboardService {
    /**
     * Get dashboard statistics
     */
    async getDashboardStats(userId: string, startDate?: string, endDate?: string) {
        return await transactionService.getTransactionStats(userId, startDate, endDate);
    }

    /**
     * Get chart data aggregated by date
     */
    async getChartData(userId: string, startDate?: string, endDate?: string): Promise<ChartDataPoint[]> {
        const transactions = await transactionService.getTransactions(userId, { startDate, endDate });

        // Group by date
        const dateMap = new Map<string, { income: number; expense: number }>();

        for (const transaction of transactions) {
            const existing = dateMap.get(transaction.date) || { income: 0, expense: 0 };

            if (transaction.type === 'income') {
                existing.income += parseFloat(transaction.amount);
            } else {
                existing.expense += parseFloat(transaction.amount);
            }

            dateMap.set(transaction.date, existing);
        }

        // Convert to array and sort by date
        const chartData: ChartDataPoint[] = Array.from(dateMap.entries())
            .map(([date, data]) => ({
                date,
                income: data.income,
                expense: data.expense,
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        return chartData;
    }
}

export const dashboardService = new DashboardService();
