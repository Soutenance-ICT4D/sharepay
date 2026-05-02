import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "@/features/merchant/dashboard/services/dashboard.service";
import { ChartGroupBy, ChartInterval, TransactionChartData } from "@/features/merchant/dashboard/types";

interface UseTransactionChartResult {
    data: TransactionChartData | null;
    loading: boolean;
    error: string | null;
}

export function useTransactionChart(interval: ChartInterval, groupBy: ChartGroupBy): UseTransactionChartResult {
    const [data, setData] = useState<TransactionChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(() => {
        setLoading(true);
        setError(null);
        dashboardService
            .getTransactionChart(interval, groupBy)
            .then(setData)
            .catch((err) => setError(err?.message ?? "Erreur de chargement"))
            .finally(() => setLoading(false));
    }, [interval, groupBy]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { data, loading, error };
}
