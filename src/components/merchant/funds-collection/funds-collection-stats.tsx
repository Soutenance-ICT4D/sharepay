"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, CreditCard, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

export function FundsCollectionStats() {
    const t = useTranslations("Dashboard.FundsCollection.Stats");
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {t("activeLinks")}
                    </CardTitle>
                    <Link className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                        {t("newThisMonth")}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {t("totalCollected")}
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,250,500 FCFA</div>
                    <p className="text-xs text-muted-foreground">
                        {t("comparedToLastMonth")}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {t("topPerformance")}
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Consultation</div>
                    <p className="text-xs text-muted-foreground">
                        {t("topTransactions")}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
