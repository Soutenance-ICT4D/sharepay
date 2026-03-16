"use client";

import { useTranslations } from "next-intl";

export default function PricingPage() {
    const t = useTranslations('Navigation');

    return (
        <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4">{t('pricing')}</h1>
            <p className="text-xl text-muted-foreground">
                Cette page est en cours de construction. Bientôt, vous y découvrirez nos tarifs transparents.
            </p>
        </div>
    );
}
