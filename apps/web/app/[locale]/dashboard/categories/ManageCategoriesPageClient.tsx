'use client';

import React, { useState } from 'react';
import { Plus, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { mockCategories } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function ManageCategoriesPageClient({ locale }: { locale: string }) {
    const incomeCategories = mockCategories.filter(cat => cat.type === 'income');
    const expenseCategories = mockCategories.filter(cat => cat.type === 'expense');

    const getCategoryDescription = (categoryName: string) => {
        const descriptions: Record<string, string> = {
            'Salary': 'Monthly paycheck & bonuses',
            'Freelance': 'Side projects & consulting',
            'Investment': 'Dividends, stock sales',
            'Groceries': 'Food shopping, markets',
            'Shopping': 'Clothing, accessories, misc',
            'Utilities': 'Electricity, water, internet',
            'Entertainment': 'Movies, games, hobbies',
            'Dining': 'Restaurants, cafes, food delivery',
            'Transport': 'Fuel, uber, public transit',
            'Healthcare': 'Medical, dental, pharmacy',
            'Education': 'Courses, books, learning',
        };
        return descriptions[categoryName] || 'Transaction category';
    };

    const getCategoryColor = (type: 'income' | 'expense') => {
        return type === 'income' ? 'bg-green-50' : 'bg-orange-50';
    };

    return (
        <DashboardLayout locale={locale}>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link href="/dashboard" className="hover:text-primary-600">
                    Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-400">Settings</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Manage Categories</span>
            </div>

            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Categories</h1>
                    <p className="text-gray-600">
                        Organize your income and expense taxonomy. These categories will be used for transaction tagging and reporting.
                    </p>
                </div>
                <Button
                    variant="primary"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={() => {/* TODO: Open add category modal */ }}
                >
                    + Kategori
                </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Income Categories */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-success-500 rounded-full"></div>
                        <h2 className="text-lg font-semibold text-gray-900">Kategori Pemasukan</h2>
                        <span className="px-2 py-0.5 bg-success-100 text-success-700 text-sm font-medium rounded">
                            {incomeCategories.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {incomeCategories.map((category) => (
                            <Card key={category.id} className={cn('p-4 hover:shadow-md transition-shadow', getCategoryColor('income'))}>
                                <div className="flex items-start gap-3 group">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                                        {category.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                        <p className="text-sm text-gray-600 mt-0.5">
                                            {getCategoryDescription(category.name)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {/* TODO: Edit category */ }}
                                            className="p-2 rounded-lg hover:bg-white transition-colors"
                                            title="Edit category"
                                        >
                                            <Edit className="w-4 h-4 text-gray-500" />
                                        </button>
                                        <button
                                            onClick={() => {/* TODO: Delete category */ }}
                                            className="p-2 rounded-lg hover:bg-white transition-colors"
                                            title="Delete category"
                                        >
                                            <Trash2 className="w-4 h-4 text-danger-500" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Expense Categories */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-danger-500 rounded-full"></div>
                        <h2 className="text-lg font-semibold text-gray-900">Kategori Pengeluaran</h2>
                        <span className="px-2 py-0.5 bg-danger-100 text-danger-700 text-sm font-medium rounded">
                            {expenseCategories.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {expenseCategories.map((category) => (
                            <Card key={category.id} className={cn('p-4 hover:shadow-md transition-shadow', getCategoryColor('expense'))}>
                                <div className="flex items-start gap-3 group">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                                        {category.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                        <p className="text-sm text-gray-600 mt-0.5">
                                            {getCategoryDescription(category.name)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {/* TODO: Edit category */ }}
                                            className="p-2 rounded-lg hover:bg-white transition-colors"
                                            title="Edit category"
                                        >
                                            <Edit className="w-4 h-4 text-gray-500" />
                                        </button>
                                        <button
                                            onClick={() => {/* TODO: Delete category */ }}
                                            className="p-2 rounded-lg hover:bg-white transition-colors"
                                            title="Delete category"
                                        >
                                            <Trash2 className="w-4 h-4 text-danger-500" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
