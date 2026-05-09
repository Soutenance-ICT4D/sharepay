"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Settings } from "lucide-react";
import { toast } from "sonner";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { WithdrawalsBalance } from "@/components/merchant/withdrawals/withdrawals-balance";
import { WithdrawalsForm } from "@/components/merchant/withdrawals/withdrawals-form";
import { WithdrawalsMethods } from "@/components/merchant/withdrawals/withdrawals-methods";
import { WithdrawalAddAccountModal } from "@/components/merchant/withdrawals/withdrawal-add-account-modal";
import { useWithdrawalBalance } from "@/features/merchant/withdrawals/hooks/use-withdrawal-balance";
import { useWithdrawalProviders } from "@/features/merchant/withdrawals/hooks/use-withdrawal-providers";
import { WithdrawAccount } from "@/features/merchant/withdrawals/types";

export function WithdrawalsClientPage() {
    const t = useTranslations("Dashboard.Withdrawals");

    const { balances, loading: balanceLoading, refetch: refetchBalance } = useWithdrawalBalance();
    const { providers } = useWithdrawalProviders();

    const [accounts, setAccounts] = useState<WithdrawAccount[]>([]);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleAddAccount = useCallback((account: WithdrawAccount) => {
        setAccounts((prev) => {
            if (account.isDefault) {
                return [...prev.map((a) => ({ ...a, isDefault: false })), account];
            }
            return [...prev, account];
        });
        setAddModalOpen(false);
        toast.success(t("AddAccount.successAdd"));
    }, [t]);

    const handleDeleteAccount = useCallback((id: string) => {
        setAccounts((prev) => {
            const remaining = prev.filter((a) => a.id !== id);
            if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
                remaining[0] = { ...remaining[0], isDefault: true };
            }
            return remaining;
        });
    }, []);

    const handleSetDefault = useCallback((id: string) => {
        setAccounts((prev) =>
            prev.map((a) => ({ ...a, isDefault: a.id === id }))
        );
    }, []);

    return (
        <div className="space-y-8">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 min-w-0">
                <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">
                        {t("title")}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">
                        {t("subtitle")}
                    </p>
                </div>
                <Link href="/merchant/withdrawals/config" className="shrink-0">
                    <Button variant="outline" className="rounded-xl w-full sm:w-auto">
                        <Settings className="w-4 h-4 mr-2" />
                        {t("configureWithdrawals")}
                    </Button>
                </Link>
            </div>

            {/* Balance Stats */}
            <WithdrawalsBalance balances={balances} loading={balanceLoading} />

            {/* Form + Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <WithdrawalsForm
                    accounts={accounts}
                    onSuccess={refetchBalance}
                />
                <WithdrawalsMethods
                    accounts={accounts}
                    onAddClick={() => setAddModalOpen(true)}
                    onDelete={handleDeleteAccount}
                    onSetDefault={handleSetDefault}
                />
            </div>

            {/* Add Account Modal */}
            <WithdrawalAddAccountModal
                open={addModalOpen}
                providers={providers}
                hasAccounts={accounts.length > 0}
                onClose={() => setAddModalOpen(false)}
                onSave={handleAddAccount}
            />
        </div>
    );
}
