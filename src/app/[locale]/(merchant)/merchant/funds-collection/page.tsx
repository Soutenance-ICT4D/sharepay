"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FundsCollectionTable } from "@/components/merchant/funds-collection/funds-collection-table";
import { useFundCollections } from "@/features/merchant/fund-collections";

export default function FundsCollectionPage() {
    const t = useTranslations('Dashboard.FundsCollection');
    const { data, loading, refetch } = useFundCollections();

    const collections = data ?? [];
    const activeCount = collections.filter((d) => d.status === "ACTIVE").length;

    return (
        <div className="space-y-8">
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">
                        {t('title')}{' '}
                        <span className="text-muted-foreground font-medium">({t('activeLabel', { count: activeCount })})</span>
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{t('subtitle')}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Button className="sm:hidden h-9 w-9 p-0 shadow-lg shadow-primary/20" asChild>
                        <Link href="/merchant/funds-collection/new" aria-label={t('newLink')}>
                            <Plus className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button className="hidden sm:inline-flex gap-2 font-bold shadow-lg shadow-primary/20" asChild>
                        <Link href="/merchant/funds-collection/new">
                            <Plus className="h-4 w-4" />
                            {t('newLink')}
                        </Link>
                    </Button>
                </div>
            </div>

            <FundsCollectionTable
                data={collections}
                onRefresh={refetch}
                isLoading={loading}
            />
        </div>
    );
}
