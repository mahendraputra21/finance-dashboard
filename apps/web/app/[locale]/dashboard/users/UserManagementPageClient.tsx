'use client';

import React, { useState } from 'react';
import { Search, Edit, Plus, ChevronRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { mockUsers, getUserInitials, getAvatarColor } from '@/lib/mockUsers';
import type { UserManagement } from '@/lib/mockUsers';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/mockData';

export function UserManagementPageClient({ locale }: { locale: string }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter users based on search
    const filteredUsers = mockUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const getStatusBadge = (status: UserManagement['status']) => {
        const styles = {
            active: 'bg-success-100 text-success-700',
            inactive: 'bg-gray-100 text-gray-700',
            pending: 'bg-yellow-100 text-yellow-700',
        };

        const labels = {
            active: 'Active',
            inactive: 'Inactive',
            pending: 'Pending',
        };

        return (
            <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', styles[status])}>
                <span className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    status === 'active' && 'bg-success-600',
                    status === 'inactive' && 'bg-gray-600',
                    status === 'pending' && 'bg-yellow-600'
                )} />
                {labels[status]}
            </span>
        );
    };

    const getRoleBadge = (role: 'admin' | 'user') => {
        return (
            <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                role === 'admin' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
            )}>
                {role === 'admin' ? 'Admin' : 'User'}
            </span>
        );
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
                <span className="text-gray-900 font-medium">User Management</span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">
                    Manage access levels, roles, and status for all registered members within the organization.
                </p>
            </div>

            {/* Search and Add User */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <Button
                    variant="primary"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={() => {/* TODO: Open add user modal */ }}
                >
                    Tambah User
                </Button>
            </div>

            {/* Users Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Joined Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm',
                                                getAvatarColor(user.fullName)
                                            )}>
                                                {getUserInitials(user.fullName)}
                                            </div>
                                            <span className="font-medium text-gray-900">{user.fullName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoleBadge(user.role)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600">{formatDate(user.joinedDate)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(user.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => {/* TODO: Open edit user modal */ }}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                            title="Edit user"
                                        >
                                            <Edit className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                    <p className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </Card>
        </DashboardLayout>
    );
}
