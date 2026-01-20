import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    locale: string;
}

export function DashboardLayout({ children, locale }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar locale={locale} />
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
