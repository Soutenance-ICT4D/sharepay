"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, SendHorizonal } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { WithdrawAccount } from "@/features/merchant/withdrawals/types";
import { withdrawalsService } from "@/features/merchant/withdrawals/services/withdrawals.service";

interface WithdrawalsFormProps {
    accounts: WithdrawAccount[];
    disabled?: boolean;
    onSuccess?: () => void;
}

export function WithdrawalsForm({ accounts, disabled, onSuccess }: WithdrawalsFormProps) {
    const t = useTranslations("Dashboard.Withdrawals.Form");

    const [amount,      setAmount]      = useState("");
    const [accountId,   setAccountId]   = useState("");
    const [description, setDescription] = useState("");
    const [loading,     setLoading]     = useState(false);

    const fmt = (n: number) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(n);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedAmount = parseInt(amount, 10);
        if (!parsedAmount || parsedAmount <= 0) {
            toast.error(t("errorAmount"));
            return;
        }
        if (!accountId) {
            toast.error(t("errorDestination"));
            return;
        }

        const selected = accounts.find((a) => a.id === accountId);
        if (!selected) return;

        setLoading(true);
        try {
            const result = await withdrawalsService.withdraw({
                amount: parsedAmount,
                currency: "XAF",
                paymentMethod: selected.providerCode,
                beneficiaryAccount: selected.accountNumber,
                beneficiaryName: selected.accountName,
                description: description || undefined,
            });
            toast.success(t("successTitle"), {
                description: `${t("successRef")} ${result.reference}`,
            });
            setAmount("");
            setAccountId("");
            setDescription("");
            onSuccess?.();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : t("errorGeneric");
            toast.error(t("errorTitle"), { description: msg });
        } finally {
            setLoading(false);
        }
    };

    const selectedAccount = accounts.find((a) => a.id === accountId);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent className={disabled ? "opacity-50 pointer-events-none" : ""}>
                {disabled && (
                    <div className="mb-4 p-3 bg-muted text-muted-foreground text-sm font-medium rounded-lg text-center">
                        {t("disabledNotice")}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-medium">{t("amountLabel")}</Label>
                        <div className="relative">
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                placeholder={t("amountPlaceholder")}
                                className="h-12 pl-4 pr-16 bg-muted/50 rounded-xl"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                                FCFA
                            </div>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                        <Label htmlFor="destination" className="text-sm font-medium">{t("destinationLabel")}</Label>
                        {accounts.length === 0 ? (
                            <div className="h-12 flex items-center px-4 rounded-xl bg-muted/50 border border-dashed text-sm text-muted-foreground">
                                {t("noAccountsHint")}
                            </div>
                        ) : (
                            <Select value={accountId} onValueChange={setAccountId}>
                                <SelectTrigger id="destination" className="h-12 bg-muted/50 rounded-xl">
                                    <SelectValue placeholder={t("destinationPlaceholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map((acc) => (
                                        <SelectItem key={acc.id} value={acc.id}>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{acc.providerName}</span>
                                                <span className="text-xs text-muted-foreground font-mono">{acc.accountNumber} — {acc.accountName}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Description (optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            {t("descriptionLabel")} <span className="text-muted-foreground font-normal text-xs">({t("optional")})</span>
                        </Label>
                        <Input
                            id="description"
                            placeholder={t("descriptionPlaceholder")}
                            className="h-12 bg-muted/50 rounded-xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Summary */}
                    {selectedAccount && amount && parseInt(amount) > 0 && (
                        <div className="rounded-xl bg-muted/60 border p-4 space-y-1 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>{t("summaryTo")}</span>
                                <span className="font-medium text-foreground">{selectedAccount.accountName} · {selectedAccount.accountNumber}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>{t("summaryVia")}</span>
                                <span className="font-medium text-foreground">{selectedAccount.providerName}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-foreground border-t pt-2 mt-2">
                                <span>{t("summaryAmount")}</span>
                                <span>{fmt(parseInt(amount))}</span>
                            </div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 rounded-xl text-base font-semibold shadow-md group"
                        disabled={disabled || loading || accounts.length === 0}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <SendHorizonal className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        )}
                        {t("submit")}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
