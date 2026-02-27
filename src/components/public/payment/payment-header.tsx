"use client";

import { Link } from "@/core/i18n/routing";
import Image from "next/image";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

export function PaymentHeader() {
    return (
        <header className="relative py-4 flex justify-center px-4">
            <div className="w-full max-w-6xl bg-background/60 backdrop-blur-md border border-border/40 rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:bg-background/80">
                <div className="px-6 h-16 flex items-center justify-between">

                    {/* --- LOGO --- */}
                    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <div className="relative h-8 w-8">
                            <Image
                                src="/images/logo_sharepay_bg_remove_svg.svg"
                                alt="SharePay Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="font-bold text-xl text-primary font-outfit">SharePay</span>
                    </Link>

                    {/* --- ACTIONS (Theme & Language) --- */}
                    <div className="flex items-center gap-0 border rounded-full pl-1 pr-3 py-1 bg-background/50 shadow-sm hover:border-primary/50 transition-colors">
                        <ThemeToggle />
                        <div className="h-4 w-px bg-border mx-1" />
                        <LanguageSwitcher />
                    </div>

                </div>
            </div>
        </header>
    );
}
