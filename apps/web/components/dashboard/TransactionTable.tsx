'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/routing';
import type { Transaction } from '@dashboard/types';
import { formatCurrency, formatDate } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface TransactionTableProps {
    transactions: Transaction[];
    showViewAll?: boolean;
    locale: string;
}

export function TransactionTable({ transactions, showViewAll = true, locale }: TransactionTableProps) {
    const t = useTranslations('dashboard');

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{t('recentTransactions')}</h3>
                {showViewAll && (
                    <Link
                        href={`/${locale}/dashboard/transactions`}
                        className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-1"
                    >
                        {t('viewAll')} →
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {t('transaction')}
                            </th>
                            <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {t('date')}
                            </th>
                            <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {t('category')}
                            </th>
                            <th className="pb-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {t('amount')}
                            </th>
                            <th className="pb-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="group hover:bg-gray-50">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                                            {transaction.icon || '💰'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{transaction.description}</p>
                                            <p className="text-sm text-gray-500">
                                                {transaction.type === 'income' ? 'Transfer from' : 'Payment to'} Vendor
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="text-sm text-gray-600">{formatDate(transaction.date)}</span>
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
                                        transaction.type === 'income' ? 'text-success-600' : 'text-gray-900'
                                    )}>
                                        {transaction.type === 'income' ? '+ ' : '- '}
                                        {formatCurrency(transaction.amount).replace('IDR', 'Rp')}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <button className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="w-4 h-4 text-gray-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
