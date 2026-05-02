import { ReactNode } from "react";
import { SiteHeader } from "@/components/public/landing/site-header";
import { SiteFooter } from "@/components/public/landing/site-footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col animate-in fade-in duration-500">
            <SiteHeader />
            <main className="flex-1">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
