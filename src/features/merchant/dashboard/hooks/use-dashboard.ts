import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "@/features/merchant/dashboard/services/dashboard.service";
import { MerchantDashboardData } from "@/features/merchant/dashboard/types";

interface UseDashboardResult {
    data: MerchantDashboardData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useDashboard(): UseDashboardResult {
    const [data, setData] = useState<MerchantDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(() => {
        setLoading(true);
        setError(null);
        dashboardService
            .getMerchantDashboard()
            .then(setData)
            .catch((err) => setError(err?.message ?? "Erreur de chargement"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
