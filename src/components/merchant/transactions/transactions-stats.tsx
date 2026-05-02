"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowDownUp, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface TransactionsStatsProps {
    balance: number;
    todayTransactions: number;
    todayWithdrawals: number;
}

export function TransactionsStats({ balance, todayTransactions, todayWithdrawals }: TransactionsStatsProps) {
    const t = useTranslations("Dashboard.Transactions.Stats");

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {t("balance")}
                    </CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "XOF",
                        }).format(balance)}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {t("todayTransactions")}
                    </CardTitle>
                    <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{todayTransactions}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {t("todayWithdrawals")}
                    </CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{todayWithdrawals}</div>
                </CardContent>
            </Card>
        </div>
    );
}
