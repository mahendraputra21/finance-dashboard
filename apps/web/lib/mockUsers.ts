import type { User } from '@dashboard/types';

export interface UserManagement extends User {
    status: 'active' | 'inactive' | 'pending';
    joinedDate: string;
}

export const mockUsers: UserManagement[] = [
    {
        id: '1',
        fullName: 'Alice Smith',
        email: 'alice@finance.com',
        role: 'admin',
        status: 'active',
        joinedDate: '2023-10-24',
        createdAt: '2023-10-24T00:00:00Z',
    },
    {
        id: '2',
        fullName: 'Bob Jones',
        email: 'bob@finance.com',
        role: 'user',
        status: 'active',
        joinedDate: '2023-11-01',
        createdAt: '2023-11-01T00:00:00Z',
    },
    {
        id: '3',
        fullName: 'Charlie Day',
        email: 'charlie@finance.com',
        role: 'user',
        status: 'inactive',
        joinedDate: '2023-11-12',
        createdAt: '2023-11-12T00:00:00Z',
    },
    {
        id: '4',
        fullName: 'Diana Prince',
        email: 'diana@finance.com',
        role: 'admin',
        status: 'active',
        joinedDate: '2023-09-15',
        createdAt: '2023-09-15T00:00:00Z',
    },
    {
        id: '5',
        fullName: 'Evan Stone',
        email: 'evan@finance.com',
        role: 'user',
        status: 'pending',
        joinedDate: '2023-12-05',
        createdAt: '2023-12-05T00:00:00Z',
    },
];

export function getUserInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

export function getAvatarColor(name: string): string {
    const colors = [
        'bg-purple-500',
        'bg-blue-500',
        'bg-orange-500',
        'bg-pink-500',
        'bg-green-500',
    ];

    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}
