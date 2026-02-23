'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/core/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { Button } from '@/components/ui/button';
import { tokenStorage } from '@/core/lib/token-storage';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/core/i18n/routing";
import { SiteHeader } from '@/components/public/landing/site-header';
import { authService } from '@/core/services/auth.service';

export function NotFoundHeader() {
    const headerT = useTranslations('Dashboard.Header');
    const sidebarT = useTranslations('Dashboard.Sidebar');
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const user = {
        name: "User",
        email: "user@sharepay.com"
    };

    useEffect(() => {
        const checkAuth = async () => {
            const tokens = tokenStorage.get();
            setIsAuthenticated(!!tokens?.accessToken);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        router.push('/login');
    };

    if (isLoading) {
        return <div className="h-[88px]" />; // Placeholder to prevent jump
    }

    if (!isAuthenticated) {
        return <SiteHeader />;
    }

    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-6xl bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-background/90">
                <div className="px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <div className="relative h-8 w-8">
                            <Image
                                src="/images/logo_sharepay_bg_remove_svg.svg"
                                alt="SharePay Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="font-bold text-xl text-primary">SharePay</span>
                    </Link>

                    <div className="hidden md:flex flex-1 justify-center gap-10">
                        <Link className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
                            {sidebarT('overview')}
                        </Link>
                        <Link className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors" href="/dashboard/transactions">
                            {sidebarT('transactions')}
                        </Link>
                        <Link className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors" href="/dashboard/payment-links">
                            {sidebarT('paymentLinks')}
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="hidden md:flex items-center gap-0 border rounded-full pl-1 pr-3 py-1 bg-background/50 shadow-sm hover:border-primary/50 transition-colors">
                            <ThemeToggle />
                            <div className="h-4 w-px bg-border mx-1" />
                            <LanguageSwitcher />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative" onClick={() => router.push('/dashboard/notifications')}>
                                <span className="h-9 w-9 rounded-full flex items-center justify-center bg-muted/40 hover:bg-muted/60 dark:bg-muted/30 dark:hover:bg-muted/40 dark:ring-1 dark:ring-border/40 transition-colors">
                                    <Image
                                        src="/icons/notification.png"
                                        alt="Notifications"
                                        width={20}
                                        height={20}
                                        className="h-5 w-5 opacity-80 dark:invert dark:opacity-90"
                                    />
                                </span>
                                <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
                            </Button>

                            <div className="hidden sm:block h-6 w-[1px] bg-border mx-1"></div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full" suppressHydrationWarning>
                                        <Avatar className="h-8 w-8 border border-primary/10">
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {user.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel onClick={() => router.push('/dashboard/profile')} className="cursor-pointer">
                                        {headerT('profile')}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                                        {headerT('settings')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                        {headerT('logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
