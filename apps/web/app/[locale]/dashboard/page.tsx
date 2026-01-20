import React from 'react';
import { DashboardPageClient } from './DashboardPageClient';

interface DashboardPageProps {
    params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const { locale } = await params;
    return <DashboardPageClient locale={locale} />;
}
