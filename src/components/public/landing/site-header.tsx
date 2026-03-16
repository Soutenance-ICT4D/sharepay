"use client";

import { useState, useEffect } from "react";
import { Link, useRouter } from "@/core/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tokenStorage } from "@/core/lib/token-storage";
import { authService } from "@/core/services/auth.service";
import {
    Menu,
    X,
    LayoutDashboard,
    LogIn,
    LogOut,
} from "lucide-react";

export function SiteHeader() {
    const t = useTranslations('Navigation');
    const headerT = useTranslations('Dashboard.Header');
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        setIsAuthenticated(false);
        router.push('/');
    };

    // Configuration des menus avec liens directs
    const menuItems = [
        { label: t('features'), href: '/features' },
        { label: t('pricing'), href: '/pricing' },
        { label: t('api_lab'), href: '/api-lab' },
        { label: t('documentation'), href: '/docs' },
        { label: t('about'), href: '/about' },
    ];

    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-6xl bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-background/90">
                <div className="px-6 h-16 flex items-center justify-between">

                    {/* --- 1. LOGO & NOM --- */}
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

                    {/* --- 2. NAVIGATION DESKTOP --- */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href || '#'}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>


                    {/* --- 3. ACTIONS --- */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Toggles: Disparaissent en premier (mobile/tablette < md) */}
                        <div className="hidden md:flex items-center gap-0 border rounded-full pl-1 pr-3 py-1 bg-background/50 shadow-sm hover:border-primary/50 transition-colors">
                            <ThemeToggle />
                            <div className="h-4 w-px bg-border mx-1" />
                            <LanguageSwitcher />
                        </div>

                        {/* Auth: Disparaissent en dernier (petit mobile < sm) */}
                        <div className="hidden sm:flex items-center gap-2">
                            {isLoading ? (
                                <div className="h-9 w-[150px] animate-pulse bg-muted rounded-full" />
                            ) : isAuthenticated ? (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="font-medium rounded-full" asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                    <div className="h-6 w-[1px] bg-border mx-1"></div>
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
                                                <LogOut className="h-4 w-4 mr-2" />
                                                {headerT('logout')}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" className="font-medium rounded-full" asChild>
                                        <Link href="/login">
                                            <LogIn className="h-4 w-4 mr-2" />
                                            {t('login')}
                                        </Link>
                                    </Button>
                                    <Button size="sm" asChild className="font-bold rounded-full shadow-md hover:shadow-lg transition-all">
                                        <Link href="/register">{t('register')}</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* --- 4. MOBILE HAMBURGER --- */}
                        {/* Visible dès que le menu principal disparaît (< lg) */}
                        <button
                            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {/* --- MENU MOBILE MODIFIÉ --- */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-4 mx-4 rounded-2xl border bg-card p-6 shadow-2xl animate-in slide-in-from-top-5 duration-200">
                        <nav className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href || '#'}
                                    className="block font-bold text-lg text-foreground hover:text-primary px-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="h-px bg-border w-full my-2" />

                            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border">
                                <span className="text-sm font-semibold">Réglages</span>
                                <div className="flex items-center bg-background rounded-full border px-2 py-1">
                                    <ThemeToggle />
                                    <div className="h-4 w-px bg-border mx-1" />
                                    <LanguageSwitcher />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pb-2">
                                {isLoading ? (
                                    <div className="h-24 w-full animate-pulse bg-muted rounded-xl" />
                                ) : isAuthenticated ? (
                                    <>
                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border">
                                            <Avatar className="h-10 w-10 border border-primary/10">
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {user.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </div>
                                        <Button className="w-full h-12 text-base shadow-lg rounded-xl" asChild>
                                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Accéder au Dashboard</Link>
                                        </Button>
                                        <Button variant="outline" className="w-full h-12 text-base rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}>
                                            <LogOut className="h-5 w-5 mr-3" />
                                            {headerT('logout')}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline" className="w-full h-12 text-base rounded-xl" asChild>
                                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                                <LogIn className="h-5 w-5 mr-3" />
                                                {t('login')}
                                            </Link>
                                        </Button>
                                        <Button className="w-full h-12 text-base shadow-lg rounded-xl" asChild>
                                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>{t('register')}</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}