"use client";

import { useTranslations } from "next-intl";
import { Plus, Smartphone, MoreHorizontal, Trash2, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WithdrawAccount } from "@/features/merchant/withdrawals/types";

interface WithdrawalsMethodsProps {
    accounts: WithdrawAccount[];
    onAddClick: () => void;
    onDelete: (id: string) => void;
    onSetDefault: (id: string) => void;
}

export function WithdrawalsMethods({ accounts, onAddClick, onDelete, onSetDefault }: WithdrawalsMethodsProps) {
    const t = useTranslations("Dashboard.Withdrawals.Methods");

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
                <Button size="sm" variant="outline" className="rounded-full" onClick={onAddClick}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t("addMethod")}
                </Button>
            </CardHeader>
            <CardContent className="flex-1">
                {accounts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[140px] gap-3 text-center py-8">
                        <div className="p-3 rounded-full bg-muted">
                            <Smartphone className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">{t("noAccounts")}</p>
                        <Button size="sm" variant="outline" onClick={onAddClick}>
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            {t("addFirst")}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3 mt-2">
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border shadow-sm shrink-0">
                                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-sm truncate">
                                                {account.providerName}
                                            </span>
                                            {account.isDefault && (
                                                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                                    {t("default")}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                                            {account.accountNumber}
                                        </p>
                                        <p className="text-xs text-muted-foreground/70 truncate">
                                            {account.accountName}
                                        </p>
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-44">
                                        {!account.isDefault && (
                                            <DropdownMenuItem onClick={() => onSetDefault(account.id)}>
                                                <Star className="w-4 h-4 mr-2" />
                                                {t("setDefault")}
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive"
                                            onClick={() => onDelete(account.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            {t("delete")}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
