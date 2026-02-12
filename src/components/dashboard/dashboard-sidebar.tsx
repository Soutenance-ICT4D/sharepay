"use client";

import { Link, usePathname } from "@/core/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const t = useTranslations('Dashboard.Sidebar');
    const pathname = usePathname();
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    // Mock user data (In a real app, this would come from a hook or props)
    const user = {
        name: "User Name",
        status: "Pro Plan",
        avatarUrl: null // or "/images/avatar.jpeg" if available
    };
    const initials = "UN";
    const isValidAvatar = Boolean(user.avatarUrl);

    const navItems = [
        { href: '/dashboard', label: t('overview'), iconSrc: '/icons/dashboard.png' },
        { href: '/dashboard/payment-links', label: t('paymentLinks'), iconSrc: '/icons/income.png' },
        { href: '/dashboard/transactions', label: t('transactions'), iconSrc: '/icons/transaction.png' },
        { href: '/dashboard/customers', label: t('customers'), iconSrc: '/icons/customer.png' },
        { href: '/dashboard/developers', label: t('developers'), iconSrc: '/icons/code.png' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-40 h-full w-64 border-r bg-background flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}>
                <div className="h-16 flex items-center px-6 border-b">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 font-bold text-lg text-primary"
                    >
                        <div className="relative h-8 w-8">
                            <Image
                                src="/images/logo_sharepay_bg_remove_svg.svg"
                                alt="SharePay Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        SharePay
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onClose()}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <span
                                    className={[
                                        "h-9 w-9 rounded-lg flex items-center justify-center",
                                        isActive
                                            ? "bg-primary/10"
                                            : "bg-muted/40 group-hover:bg-muted/60 dark:bg-muted/30 dark:group-hover:bg-muted/40 dark:ring-1 dark:ring-border/40",
                                        "transition-colors",
                                    ].join(" ")}
                                >
                                    <Image
                                        src={item.iconSrc}
                                        alt={item.label}
                                        width={20}
                                        height={20}
                                        className={[
                                            "h-5 w-5",
                                            isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
                                            "transition-opacity dark:invert dark:opacity-90"
                                        ].join(" ")}
                                    />
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-9 w-9 border border-primary/20 overflow-hidden">
                            {isValidAvatar ? (
                                <AvatarImage
                                    src={user.avatarUrl!}
                                    alt={user.name}
                                    className={[
                                        "h-full w-full object-cover",
                                        avatarLoaded ? "opacity-100" : "opacity-0",
                                        "transition-opacity duration-200",
                                    ].join(" ")}
                                    onLoadingStatusChange={(status) => setAvatarLoaded(status === 'loaded')}
                                />
                            ) : null}

                            <AvatarFallback
                                className={[
                                    "bg-primary/10 text-primary font-bold",
                                    isValidAvatar && avatarLoaded ? "opacity-0" : "opacity-100",
                                    "transition-opacity duration-200",
                                ].join(" ")}
                            >
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.status}</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
