"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/core/i18n/routing";

export function PaymentFooter() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="w-full border-t bg-background/50 backdrop-blur-sm py-8 mt-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* --- COPYRIGHT --- */}
                    <div className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left">
                        © {currentYear} SharePay. Tous droits réservés.
                    </div>

                    {/* --- LINKS --- */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-1 md:order-2">
                        <Link
                            href="/legal/terms"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('terms')}
                        </Link>
                        <Link
                            href="/legal/privacy"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('privacy')}
                        </Link>
                        <Link
                            href="/legal/security"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('security')}
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('contact')}
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
