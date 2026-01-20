'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Lock, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const t = useTranslations('auth.login');
    const router = useRouter();
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        login(email, password);
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
                        label={t('email')}
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        leftIcon={<Mail className="w-5 h-5" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label={t('password')}
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        leftIcon={<Lock className="w-5 h-5" />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-gray-700">{t('rememberMe')}</span>
                        </label>
                        <Link href="/forgot-password" className="text-primary-500 hover:text-primary-600">
                            {t('forgotPassword')}
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        className="mt-6"
                    >
                        {t('signInButton')}
                    </Button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    {t('noAccount')}{' '}
                    <Link href="/signup" className="text-primary-500 hover:text-primary-600 font-medium">
                        {t('register')}
                    </Link>
                </p>
            </Card>
        </div>
    );
}
