"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/20">
            <DashboardSidebar />

            {/* Main Content */}
            <main className="sm:ml-64 min-h-screen flex flex-col">
                <DashboardHeader />

                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
