"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { authService } from "@/core/services/auth.service";
import { useRouter } from "@/core/i18n/routing";
import { LogOut } from "lucide-react";

export function DashboardSidebar() {
    const t = useTranslations('Dashboard');
    const router = useRouter();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 bg-background border-r sm:block">
            <div className="flex h-16 items-center px-6 font-bold text-lg border-b">
                SharePay
            </div>
            <div className="flex flex-col h-[calc(100%-4rem)] justify-between p-4">
                <div>
                    {/* Nav items will go here */}
                    <div className="text-sm text-muted-foreground">Navigation...</div>
                </div>

                <div className="pt-4 border-t mt-auto">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                        onClick={async () => {
                            await authService.logout();
                            router.push('/login');
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('nav.logout')}
                    </Button>
                </div>
            </div>
        </aside>
    );
}
