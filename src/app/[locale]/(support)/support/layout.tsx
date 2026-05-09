"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { SupportSidebar } from "@/components/support/support-sidebar";
import { SupportHeader } from "@/components/support/support-header";
import { LoaderPage } from "@/components/shared/loader-page";
import { tokenStorage } from "@/lib/token-storage";

export default function SupportLayout({
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
            router.replace("/support/login");
            return;
        }
        const user = tokenStorage.getUser();
        if (user?.role === "MERCHANT") {
            router.replace("/merchant/dashboard");
            return;
        }
        if (user?.role === "ADMIN") {
            router.replace("/admin/dashboard");
            return;
        }
        if (user?.role !== "SUPPORT") {
            tokenStorage.clear();
            router.replace("/support/login");
            return;
        }
        setReady(true);
    }, [router]);

    if (!ready) return <LoaderPage />;

    return (
        <div className="min-h-screen bg-muted/20">
            <SupportSidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={() => setIsSidebarOpen(false)}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            <main className={`${isCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen flex flex-col transition-all duration-300 ease-in-out`}>
                <SupportHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="p-4 md:p-6 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
