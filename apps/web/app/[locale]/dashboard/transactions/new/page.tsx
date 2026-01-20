import React from 'react';
import { AddTransactionPageClient } from './AddTransactionPageClient';

interface AddTransactionPageProps {
    params: Promise<{ locale: string }>;
}

export default async function AddTransactionPage({ params }: AddTransactionPageProps) {
    const { locale } = await params;
    return <AddTransactionPageClient locale={locale} />;
}
