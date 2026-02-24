"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-muted/20">
            <DashboardSidebar
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
