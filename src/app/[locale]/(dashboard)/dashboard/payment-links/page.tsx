"use client";

import { useTranslations } from "next-intl";
import { PaymentLinkStats } from "@/components/dashboard/payment-links/payment-link-stats";
import { PaymentLinksTable } from "@/components/dashboard/payment-links/payment-links-table";
import { PaymentLinkSheet } from "@/components/dashboard/payment-links/payment-link-sheet";

export default function PaymentLinksPage() {
    const t = useTranslations('Dashboard.Sidebar');

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('paymentLinks')}</h2>
                <div className="flex items-center space-x-2">
                    <PaymentLinkSheet />
                </div>
            </div>

            <PaymentLinkStats />

            <PaymentLinksTable />
        </div>
    );
}
