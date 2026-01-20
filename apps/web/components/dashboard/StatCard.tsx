'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/mockData';

interface StatCardProps {
    title: string;
    amount: number;
    change?: number;
    changeLabel?: string;
    variant?: 'default' | 'income' | 'expense' | 'balance';
}

export function StatCard({ title, amount, change, changeLabel, variant = 'default' }: StatCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    const variantStyles = {
        default: 'bg-white',
        income: 'bg-white',
        expense: 'bg-white',
        balance: 'bg-primary-500 text-white',
    };

    const changeColor = isPositive ? 'text-success-600' : 'text-danger-600';

    return (
        <Card className={cn('p-6', variantStyles[variant])}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className={cn(
                        'text-sm font-medium mb-2',
                        variant === 'balance' ? 'text-primary-100' : 'text-gray-600'
                    )}>
                        {title}
                    </p>
                    <p className={cn(
                        'text-3xl font-bold',
                        variant === 'balance' ? 'text-white' : 'text-gray-900'
                    )}>
                        {formatCurrency(amount).replace('IDR', 'Rp')}
                    </p>
                    {change !== undefined && changeLabel && (
                        <div className={cn(
                            'flex items-center gap-1 mt-2',
                            variant === 'balance' ? 'text-primary-100' : changeColor
                        )}>
                            {isPositive && <TrendingUp className="w-4 h-4" />}
                            {isNegative && <TrendingDown className="w-4 h-4" />}
                            <span className="text-sm font-medium">
                                {isPositive ? '+' : ''}{change}%
                            </span>
                            <span className={cn(
                                'text-xs',
                                variant === 'balance' ? 'text-primary-200' : 'text-gray-500'
                            )}>
                                {changeLabel}
                            </span>
                        </div>
                    )}
                </div>
                {variant === 'balance' && (
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                    </div>
                )}
            </div>
            {variant === 'balance' && (
                <p className="text-xs text-primary-100 mt-3">Current Balance</p>
            )}
        </Card>
    );
}

// Import Wallet icon
import { Wallet } from 'lucide-react';
