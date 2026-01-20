'use client';

import React, { useState } from 'react';
import { Search, Calendar, Download, MoreVertical } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTransactionStore } from '@/stores/transactionStore';
import { formatCurrency, formatDate } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function TransactionHistoryPageClient({ locale }: { locale: string }) {
    const { filters, setFilters, getFilteredTransactions } = useTransactionStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredTransactions = getFilteredTransactions();
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    const handleExportCSV = () => {
        const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
        const rows = filteredTransactions.map(t => [
            t.date,
            t.description,
            t.category,
            t.type,
            t.amount.toString()
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
    };

    return (
        <DashboardLayout locale={locale}>
            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-600 mt-1">View and manage all your transactions</p>
                </div>
                <Button
                    variant="primary"
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={handleExportCSV}
                >
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by description..."
                                value={filters.search}
                                onChange={(e) => setFilters({ search: e.target.value })}
                                className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={filters.startDate || ''}
                                onChange={(e) => setFilters({ startDate: e.target.value })}
                                className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Type Filter Buttons */}
                <div className="mt-4 flex items-center gap-2">
                    <button
                        onClick={() => setFilters({ type: 'all' })}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            filters.type === 'all'
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilters({ type: 'income' })}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            filters.type === 'income'
                                ? 'bg-success-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                    >
                        Income
                    </button>
                    <button
                        onClick={() => setFilters({ type: 'expense' })}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            filters.type === 'expense'
                                ? 'bg-danger-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                    >
                        Expense
                    </button>
                </div>
            </Card>

            {/* Transactions Table */}
            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="pb-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="pb-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="py-4">
                                        <span className="text-sm text-gray-900">{formatDate(transaction.date)}</span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                                                {transaction.icon || '💰'}
                                            </div>
                                            <span className="font-medium text-gray-900">{transaction.description}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={cn(
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                            transaction.type === 'income'
                                                ? 'bg-success-100 text-success-700'
                                                : 'bg-purple-100 text-purple-700'
                                        )}>
                                            {transaction.category}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className={cn(
                                            'font-semibold',
                                            transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                                        )}>
                                            {transaction.type === 'income' ? '+' : '-'}
                                            {formatCurrency(transaction.amount).replace('IDR', '')}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="p-1 rounded hover:bg-gray-100">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ‹
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                    'px-3 py-1 rounded text-sm',
                                    page === currentPage
                                        ? 'bg-primary-500 text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                )}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </Card>
        </DashboardLayout>
    );
}
