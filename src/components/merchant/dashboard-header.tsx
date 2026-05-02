"use client";

import Image from "next/image";

import { Link, usePathname } from "@/i18n/routing";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, Settings, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/features/auth";
import { tokenStorage } from "@/lib/token-storage";
import { useRouter } from "@/i18n/routing";

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

function toTitleCase(value: string) {
    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildBreadcrumbs(pathname: string, t: any) {
    const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
    const crumbs: { href: string; label: string }[] = [];

    parts.forEach((part, index) => {
        if (index === 0) return;
        const href = "/" + parts.slice(0, index + 1).join("/");
        let label = "";

        if (index > 0 && parts[index - 1] === "funds-collection" && part !== "new") {
            label = t.has("Breadcrumbs.edit") ? t("Breadcrumbs.edit") : "Modifier";
        } else {
            const translationKey = `Breadcrumbs.${part}`;
            label = t.has(translationKey) ? t(translationKey) : toTitleCase(part);
        }

        crumbs.push({ href, label });
    });

    return crumbs;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const t = useTranslations("Dashboard.Header");
    const tb = useTranslations("Dashboard");
    const pathname = usePathname();
    const router = useRouter();
    const breadcrumbs = buildBreadcrumbs(pathname, tb);

    const [notificationCount] = useState(100);

    const [user] = useState(() => {
        const info = tokenStorage.getUser();
        return {
            name: info?.fullName ?? "U",
            email: info?.email ?? "",
            status: info?.status ?? "",
            kycLevel: info?.kycLevel ?? "NONE",
        };
    });

    const isVerified = user.status === "ACTIVE" && user.kycLevel !== "NONE";

    const getInitials = (name: string) =>
        name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase() || "U";

    const handleLogout = async () => {
        await authService.logout();
        router.push("/merchant/login");
    };

    return (
        <div className="sticky top-0 z-20">
            <header className="h-16 border-b bg-background/80 backdrop-blur-md px-6 flex items-center justify-between">

                {/* Left: Mobile Menu + Breadcrumbs */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={onMenuClick}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>

                    <nav className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <div key={crumb.href} className="flex items-center gap-2 min-w-0">
                                    {isLast ? (
                                        <span className="text-foreground font-medium truncate">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="truncate hover:text-foreground transition-colors">
                                            {crumb.label}
                                        </Link>
                                    )}
                                    {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground/60" />}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:flex items-center gap-0 border rounded-full pl-1 pr-3 py-1 bg-background shadow-sm">
                        <ThemeToggle />
                        <div className="h-4 w-px bg-border mx-1" />
                        <LanguageSwitcher />
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/merchant/notifications")}>
                        <span className="h-9 w-9 rounded-lg flex items-center justify-center bg-muted/40 hover:bg-muted/60 dark:bg-muted/30 dark:hover:bg-muted/40 dark:ring-1 dark:ring-border/40 transition-colors">
                            <Image
                                src="/icons/notification.png"
                                alt="Notifications"
                                width={20}
                                height={20}
                                className="h-5 w-5 opacity-80 dark:invert dark:opacity-90"
                            />
                        </span>
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-destructive text-destructive-foreground text-[10px] font-bold tabular-nums rounded-full inline-flex items-center justify-center border-2 border-background leading-none">
                                {notificationCount > 99 ? "99+" : notificationCount}
                            </span>
                        )}
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full" suppressHydrationWarning>
                                <Avatar className={`h-8 w-8 transition-colors ${isVerified ? "outline outline-2 outline-green-500 outline-offset-2" : "border border-primary/20 hover:border-primary/40"}`}>
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel
                                className="font-semibold cursor-pointer hover:bg-muted/60 rounded-sm transition-colors"
                                onClick={() => router.push("/merchant/profile")}
                            >
                                <p>{user.name}</p>
                                <p className="text-xs text-muted-foreground font-normal truncate">{user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push("/merchant/settings")}>
                                <Settings className="h-4 w-4 mr-2" />
                                {t("settings")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                {t("logout")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    );
}
