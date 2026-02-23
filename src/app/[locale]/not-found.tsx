'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotFoundHeader } from '@/components/public/layout/not-found-header';
import Image from 'next/image';
import { SiteFooter } from '@/components/public/landing/site-footer';
import {
    Search,
    ChevronRight,
    Home,
    Headset,
    HelpCircle,
    History,
    ShieldCheck,
    Server
} from 'lucide-react';

export default function NotFoundPage() {
    const t = useTranslations('NotFound');

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
            <NotFoundHeader />

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:py-32 mt-4">
                <div className="max-w-[800px] w-full text-center">

                    {/* Logo Illustration */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
                            <Image
                                src="/images/logo_sharepay_bg_remove_svg.svg"
                                alt="SharePay Logo"
                                fill
                                className="object-contain p-4 sm:p-8 drop-shadow-md"
                                priority
                            />
                        </div>
                    </div>

                    {/* Error Messages */}
                    <h1 className="text-foreground text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                        404 - {t('title')}
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                        {t('description')} <span className="font-semibold text-primary">{t('descriptionNote')}</span>.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-12 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <Input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="block w-full pl-12 pr-4 py-6 border rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 text-base shadow-sm transition-all"
                        />
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild size="lg" className="h-14 px-8 rounded-xl shadow-lg shadow-primary/20 min-w-[220px] text-base gap-2">
                            <Link href="/">
                                <Home className="h-5 w-5" />
                                {t('backHome')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-xl hover:bg-muted transition-all min-w-[220px] text-base gap-2">
                            <Link href="/contact">
                                <Headset className="h-5 w-5" />
                                {t('contactSupport')}
                            </Link>
                        </Button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-16 pt-8 border-t">
                        <p className="text-muted-foreground text-sm font-medium mb-6 uppercase tracking-wider">{t('quickLinks')}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/help" className="p-3 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all text-sm flex items-center justify-center gap-2">
                                <HelpCircle className="h-5 w-5" /> {t('helpCenter')}
                            </Link>
                            <Link href="/dashboard/transactions" className="p-3 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all text-sm flex items-center justify-center gap-2">
                                <History className="h-5 w-5" /> {t('transactions')}
                            </Link>
                            <Link href="/security" className="p-3 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all text-sm flex items-center justify-center gap-2">
                                <ShieldCheck className="h-5 w-5" /> {t('security')}
                            </Link>
                            <Link href="/status" className="p-3 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all text-sm flex items-center justify-center gap-2">
                                <Server className="h-5 w-5" /> {t('systemStatus')}
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
