'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Lock, User, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const t = useTranslations('auth.signUp');
    const router = useRouter();
    const { register } = useAuthStore();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user' as 'admin' | 'user',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        register(formData.fullName, formData.email, formData.password, formData.role);
        setIsLoading(false);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold">C</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    {t('title')}
                </h1>
                <p className="text-sm text-center text-gray-600 mb-8">
                    {t('subtitle')}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label={t('fullName')}
                        type="text"
                        placeholder={t('fullNamePlaceholder')}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />

                    <Input
                        label={t('email')}
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label={t('password')}
                            type="password"
                            placeholder={t('passwordPlaceholder')}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <Input
                            label={t('confirmPassword')}
                            type="password"
                            placeholder={t('confirmPasswordPlaceholder')}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t('selectRole')}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Admin Radio */}
                            <label
                                className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === 'admin'
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={formData.role === 'admin'}
                                    onChange={(e) => setFormData({ ...formData, role: 'admin' })}
                                    className="sr-only"
                                />
                                <div className="flex items-center">
                                    <div
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.role === 'admin'
                                                ? 'border-primary-500'
                                                : 'border-gray-300'
                                            }`}
                                    >
                                        {formData.role === 'admin' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                                            {t('admin')} <Info className="w-3.5 h-3.5 text-gray-400" />
                                        </p>
                                        <p className="text-xs text-gray-500">{t('adminDesc')}</p>
                                    </div>
                                </div>
                            </label>

                            {/* User Radio */}
                            <label
                                className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === 'user'
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={formData.role === 'user'}
                                    onChange={(e) => setFormData({ ...formData, role: 'user' })}
                                    className="sr-only"
                                />
                                <div className="flex items-center">
                                    <div
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.role === 'user'
                                                ? 'border-primary-500'
                                                : 'border-gray-300'
                                            }`}
                                    >
                                        {formData.role === 'user' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                                            {t('user')} <Info className="w-3.5 h-3.5 text-gray-400" />
                                        </p>
                                        <p className="text-xs text-gray-500">{t('userDesc')}</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        className="mt-6"
                    >
                        {t('signUpButton')}
                    </Button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    {t('haveAccount')}{' '}
                    <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                        {t('logIn')}
                    </Link>
                </p>
            </Card>
        </div>
    );
}
