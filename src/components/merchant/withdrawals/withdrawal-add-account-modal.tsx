"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Smartphone } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { WithdrawAccount, WithdrawProvider } from "@/features/merchant/withdrawals/types";

interface WithdrawalAddAccountModalProps {
    open: boolean;
    providers: WithdrawProvider[];
    hasAccounts: boolean;
    onClose: () => void;
    onSave: (account: WithdrawAccount) => void;
}

export function WithdrawalAddAccountModal({
    open,
    providers,
    hasAccounts,
    onClose,
    onSave,
}: WithdrawalAddAccountModalProps) {
    const t = useTranslations("Dashboard.Withdrawals.AddAccount");

    const [providerCode, setProviderCode] = React.useState("");
    const [accountNumber, setAccountNumber] = React.useState("");
    const [accountName, setAccountName]     = React.useState("");
    const [isDefault, setIsDefault]         = React.useState(!hasAccounts);
    const [errors, setErrors]               = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        if (open) {
            setProviderCode("");
            setAccountNumber("");
            setAccountName("");
            setIsDefault(!hasAccounts);
            setErrors({});
        }
    }, [open, hasAccounts]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!providerCode) next.providerCode = t("errorProvider");
        if (!accountNumber.trim()) next.accountNumber = t("errorPhone");
        else if (!/^\d{8,15}$/.test(accountNumber.trim())) next.accountNumber = t("errorPhoneFormat");
        if (!accountName.trim()) next.accountName = t("errorName");
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        const provider = providers.find((p) => p.code === providerCode);
        onSave({
            id: crypto.randomUUID(),
            providerCode,
            providerName: provider?.name ?? providerCode,
            accountNumber: accountNumber.trim(),
            accountName: accountName.trim(),
            isDefault,
        });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-xl bg-primary/10">
                            <Smartphone className="h-5 w-5 text-primary" />
                        </div>
                        <DialogTitle className="text-lg font-bold">{t("title")}</DialogTitle>
                    </div>
                    <DialogDescription className="text-sm leading-relaxed">
                        {t("subtitle")}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                    {/* Provider */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{t("providerLabel")}</Label>
                        <Select value={providerCode} onValueChange={setProviderCode}>
                            <SelectTrigger className={`h-11 ${errors.providerCode ? "border-destructive" : ""}`}>
                                <SelectValue placeholder={t("providerPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                {providers.length === 0 ? (
                                    <SelectItem value="__none__" disabled>{t("noProviders")}</SelectItem>
                                ) : (
                                    providers.map((p) => (
                                        <SelectItem key={p.code} value={p.code}>
                                            {p.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        {errors.providerCode && (
                            <p className="text-xs text-destructive">{errors.providerCode}</p>
                        )}
                    </div>

                    {/* Phone number */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{t("phoneLabel")}</Label>
                        <Input
                            type="tel"
                            placeholder={t("phonePlaceholder")}
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className={`h-11 font-mono ${errors.accountNumber ? "border-destructive" : ""}`}
                        />
                        {errors.accountNumber ? (
                            <p className="text-xs text-destructive">{errors.accountNumber}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">{t("phoneHint")}</p>
                        )}
                    </div>

                    {/* Account name */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{t("nameLabel")}</Label>
                        <Input
                            placeholder={t("namePlaceholder")}
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className={`h-11 ${errors.accountName ? "border-destructive" : ""}`}
                        />
                        {errors.accountName && (
                            <p className="text-xs text-destructive">{errors.accountName}</p>
                        )}
                    </div>

                    {/* Default checkbox */}
                    <div className="flex items-center gap-3 pt-1">
                        <Checkbox
                            id="set-default"
                            checked={isDefault}
                            onCheckedChange={(v) => setIsDefault(!!v)}
                            disabled={!hasAccounts}
                        />
                        <Label
                            htmlFor="set-default"
                            className="text-sm font-medium cursor-pointer leading-tight"
                        >
                            {t("setDefault")}
                        </Label>
                    </div>
                </div>

                <DialogFooter className="gap-2 mt-2">
                    <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
                        {t("cancel")}
                    </Button>
                    <Button onClick={handleSave} className="flex-1 sm:flex-none font-semibold">
                        {t("submit")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
