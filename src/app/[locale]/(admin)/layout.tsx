"use client";

import { useState } from "react";
import { usePathname } from "@/i18n/routing";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardHeader } from "@/components/merchant/dashboard-header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Masquer la navigation sur la page de connexion admin uniquement
    const isLoginPage = pathname.endsWith("admin-2026");

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-muted/20">
            <AdminSidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={() => setIsSidebarOpen(false)}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            {/* Main Content */}
            <main className={`${isCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen flex flex-col transition-all duration-300 ease-in-out`}>
                <DashboardHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="p-4 md:p-6 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
