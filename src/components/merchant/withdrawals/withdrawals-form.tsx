"use client";

import { useState, useEffect } from "react";
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
    currency: string;
    disabled?: boolean;
    onSuccess?: () => void;
}

export function WithdrawalsForm({ accounts, currency, disabled, onSuccess }: WithdrawalsFormProps) {
    const t = useTranslations("Dashboard.Withdrawals.Form");

    const [accountId,   setAccountId]   = useState("");
    const [amount,      setAmount]      = useState("");
    const [description, setDescription] = useState("");
    const [loading,     setLoading]     = useState(false);

    const defaultId = accounts.find((a) => a.isDefault)?.id ?? accounts[0]?.id ?? "";

    // Pré-sélectionner le compte par défaut au chargement
    useEffect(() => {
        if (defaultId && !accountId) setAccountId(defaultId);
    }, [defaultId]);

    const fmt = (n: number) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

    const selectedAccount = accounts.find((a) => a.id === accountId);

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

        setLoading(true);
        try {
            const result = await withdrawalsService.withdraw({
                amount: parsedAmount,
                currency,
                paymentMethod: selectedAccount!.providerCode,
                beneficiaryAccount: selectedAccount!.accountNumber,
                beneficiaryName: selectedAccount!.accountName,
                description: description || undefined,
            });
            toast.success(t("successTitle"), {
                description: `${t("successRef")} ${result.reference}`,
            });
            setAccountId(defaultId);
            setAmount("");
            setDescription("");
            onSuccess?.();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : t("errorGeneric");
            toast.error(t("errorTitle"), { description: msg });
        } finally {
            setLoading(false);
        }
    };

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

                    {/* Compte de destination */}
                    <div className="space-y-2">
                        <Label htmlFor="account">{t("destinationLabel")}</Label>
                        {accounts.length === 0 ? (
                            <div className="h-11 flex items-center px-3 rounded-md border border-dashed text-sm text-muted-foreground">
                                {t("noAccountsHint")}
                            </div>
                        ) : (
                            <Select value={accountId} onValueChange={setAccountId}>
                                <SelectTrigger id="account" className="h-11">
                                    <SelectValue placeholder={t("destinationPlaceholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map((acc) => (
                                        <SelectItem key={acc.id} value={acc.id}>
                                            <span className="font-medium">{acc.accountName}</span>
                                            <span className="text-muted-foreground ml-2 font-mono text-xs">
                                                {acc.accountNumber} · {acc.providerName}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Montant */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">{t("amountLabel")}</Label>
                        <div className="relative">
                            <Input
                                id="amount"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder={t("amountPlaceholder")}
                                className="pr-14"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                                {currency}
                            </span>
                        </div>
                    </div>

                    {/* Description (optionnel) */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            {t("descriptionLabel")} <span className="text-muted-foreground font-normal text-xs">({t("optional")})</span>
                        </Label>
                        <Input
                            id="description"
                            placeholder={t("descriptionPlaceholder")}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Récapitulatif */}
                    {selectedAccount && amount && parseInt(amount) > 0 && (
                        <div className="rounded-xl bg-muted/60 border p-4 space-y-1 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>{t("summaryTo")}</span>
                                <span className="font-medium text-foreground">
                                    {selectedAccount.accountName} · {selectedAccount.accountNumber}
                                </span>
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
                        className="w-full rounded-xl font-semibold shadow-md group"
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
