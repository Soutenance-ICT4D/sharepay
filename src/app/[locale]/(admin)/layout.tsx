"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { LoaderPage } from "@/components/shared/loader-page";
import { tokenStorage } from "@/lib/token-storage";

export default function AdminLayout({
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
            router.replace("/admin/login");
            return;
        }
        const user = tokenStorage.getUser();
        if (user?.role === "MERCHANT") {
            router.replace("/merchant/dashboard");
            return;
        }
        if (user?.role === "SUPPORT") {
            router.replace("/support/dashboard");
            return;
        }
        if (user?.role !== "ADMIN") {
            tokenStorage.clear();
            router.replace("/admin/login");
            return;
        }
        setReady(true);
    }, [router]);

    if (!ready) return <LoaderPage />;

    return (
        <div className="min-h-screen bg-muted/20">
            <AdminSidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={() => setIsSidebarOpen(false)}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            <main className={`${isCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen flex flex-col transition-all duration-300 ease-in-out`}>
                <AdminHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="p-4 md:p-6 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
