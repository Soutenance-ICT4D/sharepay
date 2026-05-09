import { useState, useEffect, useCallback } from "react";
import { withdrawalsService } from "@/features/merchant/withdrawals/services/withdrawals.service";
import { WithdrawalBalance } from "@/features/merchant/withdrawals/types";

interface UseWithdrawalBalanceResult {
    balances: WithdrawalBalance[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useWithdrawalBalance(): UseWithdrawalBalanceResult {
    const [balances, setBalances] = useState<WithdrawalBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(() => {
        setLoading(true);
        setError(null);
        withdrawalsService
            .getBalance()
            .then(setBalances)
            .catch((err) => setError(err?.message ?? "Erreur de chargement"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { balances, loading, error, refetch: fetch };
}
