"use client";

import { useState, useEffect, useCallback } from "react";
import { WithdrawalConfig } from "@/features/merchant/withdrawals/types";
import { withdrawalsService } from "@/features/merchant/withdrawals/services/withdrawals.service";

const DEFAULT_CONFIG: WithdrawalConfig = {
    mode: "MANUAL",
    account: null,
    thresholdAmount: null,
    period: null,
    currency: "XAF",
    lastTriggeredAt: null,
    updatedAt: null,
};

export function useWithdrawalConfig() {
    const [config,  setConfig]  = useState<WithdrawalConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setConfig(await withdrawalsService.getConfig());
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Erreur lors du chargement de la configuration.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    return { config, loading, error, refetch: fetch };
}
