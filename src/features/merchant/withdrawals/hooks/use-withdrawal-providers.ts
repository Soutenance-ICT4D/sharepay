import { useState, useEffect } from "react";
import { withdrawalsService } from "@/features/merchant/withdrawals/services/withdrawals.service";
import { WithdrawProvider } from "@/features/merchant/withdrawals/types";

interface UseWithdrawalProvidersResult {
    providers: WithdrawProvider[];
    loading: boolean;
}

export function useWithdrawalProviders(): UseWithdrawalProvidersResult {
    const [providers, setProviders] = useState<WithdrawProvider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        withdrawalsService
            .getProviders()
            .then(setProviders)
            .catch(() => setProviders([]))
            .finally(() => setLoading(false));
    }, []);

    return { providers, loading };
}
