import React from 'react';
import { TransactionHistoryPageClient } from './TransactionHistoryPageClient';

interface TransactionHistoryPageProps {
    params: Promise<{ locale: string }>;
}

export default async function TransactionHistoryPage({ params }: TransactionHistoryPageProps) {
    const { locale } = await params;
    return <TransactionHistoryPageClient locale={locale} />;
}
