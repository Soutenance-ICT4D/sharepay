"use client";

import Image from "next/image";

import { Link, usePathname } from "@/core/i18n/routing";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Menu,
    Bell,
    Settings,
    ChevronRight,
    User
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/core/services/auth.service";
import { useRouter } from "@/core/i18n/routing";

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

function toTitleCase(value: string) {
    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildBreadcrumbs(pathname: string) {
    // Remove locale from path if present (e.g. /fr/dashboard -> /dashboard)
    // The usePathname hook from i18n/routing ALREADY gives us the path without locale prefix!
    // But let's verify. usually usePathname returns "/dashboard".
    const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);

    // Example: ["dashboard", "payments"]
    const crumbs: { href: string; label: string }[] = [];

    parts.forEach((part, index) => {
        const href = "/" + parts.slice(0, index + 1).join("/");
        crumbs.push({
            href,
            label: toTitleCase(part)
        });
    });

    return crumbs;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const t = useTranslations('Dashboard.Header');
    const pathname = usePathname();
    const router = useRouter();
    const breadcrumbs = buildBreadcrumbs(pathname);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    // Mock user for now
    const user = {
        name: "User",
        email: "user@sharepay.com",
        avatarUrl: null
    };

    const handleLogout = async () => {
        await authService.logout();
        router.push('/login');
    };

    return (
        <div className="sticky top-0 z-20">
            <header className="h-16 border-b bg-background/80 backdrop-blur-md px-6 flex items-center justify-between">

                {/* Left: Mobile Menu & Breadcrumbs */}
                {/* Left: Mobile Menu & Breadcrumbs */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Sidebar Toggle (Mobile) */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={onMenuClick}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Search Toggle (Tablet/Mobile) */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileSearchOpen((v) => !v)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <div key={crumb.href} className="flex items-center gap-2 min-w-0">
                                    {isLast ? (
                                        <span className="text-foreground font-medium truncate">
                                            {crumb.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={crumb.href}
                                            className="truncate hover:text-foreground transition-colors"
                                        >
                                            {crumb.label}
                                        </Link>
                                    )}
                                    {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground/60" />}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Desktop Search (Large screens only) */}
                    <div className="hidden lg:flex flex-1 justify-center px-4 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder={t('searchPlaceholder')} className="pl-9 bg-background/60" />
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-0 border rounded-full pl-1 pr-3 py-1 bg-background shadow-sm">
                        <ThemeToggle />
                        <div className="h-4 w-px bg-border mx-1" />
                        <LanguageSwitcher />
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/settings')}>
                        <span className="h-9 w-9 rounded-lg flex items-center justify-center bg-muted/40 hover:bg-muted/60 dark:bg-muted/30 dark:hover:bg-muted/40 dark:ring-1 dark:ring-border/40 transition-colors">
                            <Image
                                src="/icons/setting.png"
                                alt="Settings"
                                width={20}
                                height={20}
                                className="h-5 w-5 opacity-80 dark:invert dark:opacity-90"
                            />
                        </span>
                    </Button>

                    <Button variant="ghost" size="icon" className="relative" onClick={() => router.push('/dashboard/notifications')}>
                        <span className="h-9 w-9 rounded-lg flex items-center justify-center bg-muted/40 hover:bg-muted/60 dark:bg-muted/30 dark:hover:bg-muted/40 dark:ring-1 dark:ring-border/40 transition-colors">
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
                                {t('profile')}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                                {t('settings')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                {t('logout')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Mobile/Tablet Search Bar */}
            {mobileSearchOpen && (
                <div className="lg:hidden border-b bg-background/80 backdrop-blur-md px-6 py-3 animate-in slide-in-from-top-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input autoFocus placeholder={t('searchPlaceholder')} className="pl-9" />
                    </div>
                </div>
            )}
        </div>
    );
}
