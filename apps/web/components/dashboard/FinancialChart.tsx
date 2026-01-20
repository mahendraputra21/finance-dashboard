'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import type { ChartDataPoint } from '@dashboard/types';

interface FinancialChartProps {
    data: ChartDataPoint[];
    title: string;
    subtitle: string;
    incomeLabel: string;
    expenseLabel: string;
}

export function FinancialChart({ data, title, subtitle, incomeLabel, expenseLabel }: FinancialChartProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Format date for display
    const chartData = data.map(item => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short'
        }),
    }));

    return (
        <Card className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>

            {!mounted ? (
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Loading chart...</p>
                </div>
            ) : chartData.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No data to display</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="displayDate"
                            stroke="#6B7280"
                            style={{ fontSize: '12px' }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            stroke="#6B7280"
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                fontSize: '12px',
                            }}
                            formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: '12px' }}
                            iconType="square"
                        />
                        <Bar
                            dataKey="income"
                            fill="#10B981"
                            name={incomeLabel}
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="expense"
                            fill="#EF4444"
                            name={expenseLabel}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
}
