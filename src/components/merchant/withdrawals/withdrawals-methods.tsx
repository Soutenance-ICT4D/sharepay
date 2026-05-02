"use client";

import { useTranslations } from "next-intl";
import { Plus, CreditCard, Smartphone, MoreHorizontal, Edit, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PaymentMethod = {
    id: string;
    type: "momo" | "card";
    provider: string;
    details: string;
    default: boolean;
};

interface WithdrawalsMethodsProps {
    methods: PaymentMethod[];
}

export function WithdrawalsMethods({ methods }: WithdrawalsMethodsProps) {
    const t = useTranslations('Dashboard.Withdrawals.Methods');

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
                <Button size="sm" variant="outline" className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {t("addMethod")}
                </Button>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4 mt-2">
                    {methods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border shadow-sm shrink-0">
                                    {method.type === 'card' ? (
                                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="font-semibold text-sm flex items-center gap-2">
                                        {method.provider}
                                        {method.default && (
                                            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Défaut
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground tracking-widest">{method.details}</div>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-36">
                                    <DropdownMenuItem>
                                        <Edit className="w-4 h-4 mr-2" />
                                        {t("edit")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        {t("delete")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
