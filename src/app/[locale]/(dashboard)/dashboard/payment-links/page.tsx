"use client";

import { useTranslations } from "next-intl";
import { PaymentLinkStats } from "@/components/dashboard/payment-links/payment-link-stats";
import { PaymentLinksTable, PaymentLink } from "@/components/dashboard/payment-links/payment-links-table";
import { Link } from "@/core/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock Data
const data: PaymentLink[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `lnk_${i + 1}`,
    name: `Produit Test ${i + 1}`,
    amount: i % 5 === 0 ? "Libre" : (i + 1) * 1500,
    currency: "FCFA",
    status: i % 7 === 0 ? "archived" : i % 4 === 0 ? "inactive" : "active",
    createdAt: new Date(2024, 0, i + 1).toISOString().split('T')[0],
}));

export default function PaymentLinksPage() {
    const t = useTranslations('Dashboard.PaymentLinks');

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/dashboard/payment-links/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            {t('newLink')}
                        </Button>
                    </Link>
                </div>
            </div>

            <PaymentLinkStats />

            <PaymentLinksTable data={data} />
        </div>
    );
}
