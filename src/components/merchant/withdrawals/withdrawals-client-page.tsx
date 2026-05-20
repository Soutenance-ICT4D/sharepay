"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Settings } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { WithdrawalsBalance } from "@/components/merchant/withdrawals/withdrawals-balance";
import { WithdrawalsForm } from "@/components/merchant/withdrawals/withdrawals-form";
import { WithdrawalsMethods } from "@/components/merchant/withdrawals/withdrawals-methods";
import { WithdrawalAddAccountModal } from "@/components/merchant/withdrawals/withdrawal-add-account-modal";
import { WithdrawalsConfigModal } from "@/components/merchant/withdrawals/withdrawals-config-modal";
import { useWithdrawalBalance } from "@/features/merchant/withdrawals/hooks/use-withdrawal-balance";
import { useWithdrawalProviders } from "@/features/merchant/withdrawals/hooks/use-withdrawal-providers";
import { useWithdrawalAccounts } from "@/features/merchant/withdrawals/hooks/use-withdrawal-accounts";
import { useWithdrawalConfig } from "@/features/merchant/withdrawals/hooks/use-withdrawal-config";
import { withdrawalsService } from "@/features/merchant/withdrawals/services/withdrawals.service";

export function WithdrawalsClientPage() {
    const t = useTranslations("Dashboard.Withdrawals");

    const { balances, loading: balanceLoading, refetch: refetchBalance }   = useWithdrawalBalance();
    const { providers }                                                     = useWithdrawalProviders();
    const { accounts, loading: accountsLoading, refetch: refetchAccounts } = useWithdrawalAccounts();
    const { config, refetch: refetchConfig }                               = useWithdrawalConfig();

    const [addModalOpen,    setAddModalOpen]    = useState(false);
    const [configModalOpen, setConfigModalOpen] = useState(false);

    const handleDeleteAccount = useCallback(async (id: string) => {
        try {
            await withdrawalsService.deleteAccount(id);
            await refetchAccounts();
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Erreur lors de la suppression.");
        }
    }, [refetchAccounts]);

    const handleSetDefault = useCallback(async (id: string) => {
        try {
            await withdrawalsService.setDefaultAccount(id);
            await refetchAccounts();
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Erreur lors de la mise à jour.");
        }
    }, [refetchAccounts]);

    const isManual = !config || config.mode === "MANUAL";
    const currency = balances[0]?.currency ?? "XAF";

    return (
        <div className="space-y-8">
            {/* Page Heading */}
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">
                        {t("title")}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="shrink-0 flex gap-2">
                    {/* Mobile: icon only */}
                    <Button
                        variant="outline"
                        className="sm:hidden h-9 w-9 p-0"
                        onClick={() => setConfigModalOpen(true)}
                        aria-label={t("configureWithdrawals")}
                    >
                        <Settings className="h-4 w-4" />
                    </Button>

                    {/* Desktop: icon + text */}
                    <Button
                        variant="outline"
                        className="hidden sm:inline-flex gap-2 font-bold"
                        onClick={() => setConfigModalOpen(true)}
                    >
                        <Settings className="h-4 w-4" />
                        {t("configureWithdrawals")}
                    </Button>
                </div>
            </div>

            {/* Balance Stats */}
            <WithdrawalsBalance balances={balances} loading={balanceLoading} />

            {/* Form + Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WithdrawalsForm
                    accounts={accounts}
                    currency={currency}
                    disabled={!isManual}
                    onSuccess={refetchBalance}
                />
                <WithdrawalsMethods
                    accounts={accounts}
                    loading={accountsLoading}
                    onAddClick={() => setAddModalOpen(true)}
                    onDelete={handleDeleteAccount}
                    onSetDefault={handleSetDefault}
                />
            </div>

            {/* Config Modal */}
            <WithdrawalsConfigModal
                open={configModalOpen}
                onClose={() => setConfigModalOpen(false)}
                onSaved={refetchConfig}
            />

            {/* Add Account Modal */}
            <WithdrawalAddAccountModal
                open={addModalOpen}
                providers={providers}
                hasAccounts={accounts.length > 0}
                onClose={() => setAddModalOpen(false)}
                onSuccess={() => {
                    refetchAccounts();
                    toast.success(t("AddAccount.successAdd"));
                }}
            />
        </div>
    );
}
