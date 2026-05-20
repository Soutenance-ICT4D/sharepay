"use client";

import { useState, useEffect, useCallback } from "react";
import { WithdrawAccount } from "@/features/merchant/withdrawals/types";
import { withdrawalsService } from "@/features/merchant/withdrawals/services/withdrawals.service";

export function useWithdrawalAccounts() {
    const [accounts, setAccounts] = useState<WithdrawAccount[]>([]);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setAccounts(await withdrawalsService.getAccounts());
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Erreur lors du chargement des comptes.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    return { accounts, loading, error, refetch: fetch };
}
