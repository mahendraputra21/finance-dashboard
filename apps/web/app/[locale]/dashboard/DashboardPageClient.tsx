'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Search, Bell, User, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { FinancialChart } from '@/components/dashboard/FinancialChart';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useTransactionStore } from '@/stores/transactionStore';

export function DashboardPageClient({ locale }: { locale: string }) {
    const t = useTranslations('dashboard');
    const { getStats, getChartData, startDate, endDate, setDateRange } = useDashboardStore();
    const { transactions } = useTransactionStore();

    const stats = getStats();
    const chartData = getChartData();
    const recentTransactions = transactions.slice(0, 5);

    return (
        <DashboardLayout locale={locale}>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                        />
                    </div>
                    {/* Notifications */}
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
                    </button>
                    {/* User Avatar */}
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>

            {/* Date Range Filters */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter Tanggal:</span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={startDate || ''}
                        onChange={(e) => setDateRange(e.target.value, endDate)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Dari"
                    />
                    <span className="text-gray-500">—</span>
                    <input
                        type="date"
                        value={endDate || ''}
                        onChange={(e) => setDateRange(startDate, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Sampai"
                    />
                </div>
                {(startDate || endDate) && (
                    <button
                        onClick={() => setDateRange(null, null)}
                        className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title={t('totalIncome')}
                    amount={stats.totalIncome}
                    change={stats.incomeChange}
                    changeLabel={t('vsLastMonth')}
                    variant="income"
                />
                <StatCard
                    title={t('totalExpense')}
                    amount={stats.totalExpense}
                    change={stats.expenseChange}
                    changeLabel={t('vsLastMonth')}
                    variant="expense"
                />
                <StatCard
                    title={t('currentBalance')}
                    amount={stats.currentBalance}
                    variant="balance"
                />
            </div>

            {/* Financial Chart */}
            <div className="mb-8">
                <FinancialChart
                    data={chartData}
                    title={t('financialTrend')}
                    subtitle={t('incomeVsExpenses')}
                    incomeLabel={t('income')}
                    expenseLabel={t('expenses')}
                />
            </div>

            {/* Recent Transactions */}
            <TransactionTable
                transactions={recentTransactions}
                showViewAll
                locale={locale}
            />
        </DashboardLayout>
    );
}
