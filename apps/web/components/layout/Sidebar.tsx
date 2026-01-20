'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
    LayoutDashboard,
    Plus,
    History,
    FolderOpen,
    Users,
    Settings,
    LogOut,
    Wallet
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

interface SidebarProps {
    locale: string;
}

export function Sidebar({ locale }: SidebarProps) {
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const mainMenuItems = [
        { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { href: '/dashboard/transactions/new', label: t('newTransaction'), icon: Plus },
        { href: '/dashboard/transactions', label: t('history'), icon: History },
    ];

    const adminMenuItems = [
        { href: '/dashboard/categories', label: t('categories'), icon: FolderOpen },
        { href: '/dashboard/users', label: t('userManagement'), icon: Users },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">{t('financeApp')}</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                {/* Main Menu */}
                <div className="mb-6">
                    <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t('mainMenu')}
                    </p>
                    <div className="space-y-1">
                        {mainMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        isActive(item.href)
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Admin Menu */}
                {user?.role === 'admin' && (
                    <div>
                        <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {t('admin')}
                        </p>
                        <div className="space-y-1">
                            {adminMenuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                            isActive(item.href)
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    {t('logout')}
                </button>
            </div>
        </aside>
    );
}
