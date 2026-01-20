import React from 'react';
import { UserManagementPageClient } from './UserManagementPageClient';

interface UserManagementPageProps {
    params: Promise<{ locale: string }>;
}

export default async function UserManagementPage({ params }: UserManagementPageProps) {
    const { locale } = await params;
    return <UserManagementPageClient locale={locale} />;
}
