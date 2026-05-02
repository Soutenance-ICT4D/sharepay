"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useTranslations('Navigation');

    return (
        <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-4">

            {/* Background Decorations (Optional) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="relative w-12 h-12">
                        <Image src="/images/logo_sharepay_bg_remove_svg.svg" alt="SharePay" fill className="object-contain" />
                    </Link>
                </div>

                {/* Content Card */}
                <div className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">
                    {children}
                </div>

                {/* Footer Links (Optional) */}
                {/* <div className="mt-6 text-center text-sm text-muted-foreground space-x-4">
                    <Link href="/legal/terms" className="hover:text-primary transition-colors">{t('terms')}</Link>
                    <span>&middot;</span>
                    <Link href="/legal/privacy" className="hover:text-primary transition-colors">{t('privacy')}</Link>
                </div> */}
            </div>
        </div>
    );
}
