"use client";

import { DashboardSidebar } from "@/components/merchant/dashboard-sidebar";
import { DashboardHeader } from "@/components/merchant/dashboard-header";
import { LoaderPage } from "@/components/shared/loader-page";
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { tokenStorage } from "@/lib/token-storage";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [ready, setReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const tokens = tokenStorage.get();
        if (!tokens?.accessToken) {
            router.replace("/merchant/login");
            return;
        }
        const user = tokenStorage.getUser();
        if (user?.status === "PENDING_VERIFICATION") {
            router.replace("/merchant/pending-verification");
        } else {
            setReady(true);
        }
    }, [router]);

    if (!ready) return <LoaderPage />;

    return (
        <div className="min-h-screen bg-muted/20">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={() => setIsSidebarOpen(false)}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            <main className={`${isCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen flex flex-col transition-all duration-300 ease-in-out`}>
                <DashboardHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className="p-6 md:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
