'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTransactionStore } from '@/stores/transactionStore';
import { useAuthStore } from '@/stores/authStore';
import { mockCategories } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import type { TransactionType } from '@dashboard/types';

export function AddTransactionPageClient({ locale }: { locale: string }) {
    const t = useTranslations('transactions.add');
    const router = useRouter();
    const { addTransaction } = useTransactionStore();
    const { user } = useAuthStore();

    const [transactionType, setTransactionType] = useState<TransactionType>('income');
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const availableCategories = mockCategories.filter(cat => cat.type === transactionType);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        const selectedCategory = availableCategories.find(c => c.id === formData.category);

        addTransaction({
            type: transactionType,
            amount: parseFloat(formData.amount),
            category: selectedCategory?.name || formData.category,
            description: formData.notes || `${selectedCategory?.name} transaction`,
            date: formData.date,
            icon: selectedCategory?.icon,
            userId: user.id,
        });

        router.push('/dashboard');
    };

    return (
        <DashboardLayout locale={locale}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                <p className="text-gray-600 mt-1">{t('subtitle')}</p>
            </div>

            {/* Form */}
            <div className="max-w-3xl">
                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Transaction Type Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                {t('type')}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTransactionType('income');
                                        setFormData({ ...formData, category: '' });
                                    }}
                                    className={cn(
                                        'px-4 py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-center gap-2',
                                        transactionType === 'income'
                                            ? 'border-success-500 bg-success-50 text-success-700'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    )}
                                >
                                    <span className="text-lg">↗</span>
                                    {t('income')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTransactionType('expense');
                                        setFormData({ ...formData, category: '' });
                                    }}
                                    className={cn(
                                        'px-4 py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-center gap-2',
                                        transactionType === 'expense'
                                            ? 'border-danger-500 bg-danger-50 text-danger-700'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    )}
                                >
                                    <span className="text-lg">↘</span>
                                    {t('expense')}
                                </button>
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('amount')}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0"
                                    className="w-full h-14 pl-12 pr-4 text-2xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category and Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('category')}
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="">{t('categoryPlaceholder')}</option>
                                    {availableCategories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.icon} {locale === 'id' ? cat.nameId : cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('date')}
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('notes')}
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder={t('notesPlaceholder')}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push('/dashboard')}
                                className="flex-1"
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="flex-1"
                            >
                                {t('save')}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
