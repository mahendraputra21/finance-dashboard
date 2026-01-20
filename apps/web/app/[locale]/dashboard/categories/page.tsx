import React from 'react';
import { ManageCategoriesPageClient } from './ManageCategoriesPageClient';

interface ManageCategoriesPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ManageCategoriesPage({ params }: ManageCategoriesPageProps) {
    const { locale } = await params;
    return <ManageCategoriesPageClient locale={locale} />;
}
