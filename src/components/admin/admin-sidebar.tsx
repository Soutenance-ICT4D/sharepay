"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, Headphones, Shield, Plug, Settings } from "lucide-react";

interface AdminSidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
}

export function AdminSidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: AdminSidebarProps) {
    const t = useTranslations('Admin.Sidebar');
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/dashboard', label: t('overview'), icon: <LayoutDashboard className="h-5 w-5" /> },
        { href: '/admin/merchants', label: t('merchants'), icon: <Users className="h-5 w-5" /> },
        { href: '/admin/support', label: t('support'), icon: <Headphones className="h-5 w-5" /> },
        { href: '/admin/admins', label: t('admins'), icon: <Shield className="h-5 w-5" /> },
        { href: '/admin/providers', label: t('providers'), icon: <Plug className="h-5 w-5" /> },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-40 h-full border-r bg-background flex flex-col transition-all duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                ${isCollapsed ? "md:w-20" : "md:w-64"}
            `}>
                <div className="h-16 flex items-center px-6 border-b">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 font-bold text-lg text-primary overflow-hidden"
                    >
                        <div className="relative h-8 w-8 min-w-[32px]">
                            <Image
                                src="/images/logo_sharepay_bg_remove_svg.svg"
                                alt="SharePay Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        {!isCollapsed && <span className="whitespace-nowrap transition-opacity duration-300">Admin</span>}
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
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    } ${isCollapsed ? "justify-center px-2" : ""}`}
                                title={isCollapsed ? item.label : ""}
                            >
                                <span className={`h-10 w-10 min-w-[40px] rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-primary/10" : "bg-muted/40 group-hover:bg-muted/60"}`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && <span className="truncate whitespace-nowrap transition-opacity duration-300">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t space-y-1">
                    <Link
                        href="/admin/settings"
                        onClick={() => onClose()}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${pathname === '/admin/settings' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${isCollapsed ? "justify-center px-2" : ""}`}
                        title={isCollapsed ? t('settings') : ""}
                    >
                        <span className="h-10 w-10 min-w-[40px] rounded-lg flex items-center justify-center bg-muted/40 group-hover:bg-muted/60 transition-colors shrink-0">
                            <Settings className="h-5 w-5" />
                        </span>
                        {!isCollapsed && <span className="truncate whitespace-nowrap transition-opacity duration-300">{t('settings')}</span>}
                    </Link>

                    <button
                        onClick={onToggleCollapse}
                        className={`hidden md:flex w-full mt-4 items-center gap-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 overflow-hidden ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                    >
                        <span className="h-10 w-10 min-w-[40px] rounded-lg flex items-center justify-center bg-muted/40 group-hover:bg-muted/60 transition-colors shrink-0">
                            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                        </span>
                        {!isCollapsed && <span className="truncate whitespace-nowrap transition-opacity duration-300">Réduire</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
