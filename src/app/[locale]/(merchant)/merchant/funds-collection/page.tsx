"use client";

import { useTranslations } from "next-intl";
import { FundsCollectionStats } from "@/components/merchant/funds-collection/funds-collection-stats";
import { FundsCollectionTable, FundsCollectionLink } from "@/components/merchant/funds-collection/funds-collection-table";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock Data
const data: FundsCollectionLink[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `lnk_${i + 1}`,
    name: `Produit Test ${i + 1}`,
    amount: i % 5 === 0 ? "Libre" : (i + 1) * 1500,
    currency: "FCFA",
    status: i % 7 === 0 ? "archived" : i % 4 === 0 ? "inactive" : "active",
    createdAt: new Date(2024, 0, i + 1).toISOString().split('T')[0],
}));

export default function FundsCollectionPage() {
    const t = useTranslations('Dashboard.FundsCollection');

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/merchant/funds-collection/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            {t('newLink')}
                        </Button>
                    </Link>
                </div>
            </div>

            <FundsCollectionStats />

            <FundsCollectionTable data={data} />
        </div>
    );
}
