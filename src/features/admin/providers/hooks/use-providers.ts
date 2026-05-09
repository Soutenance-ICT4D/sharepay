import { useState, useEffect, useCallback } from "react";
import { adminProvidersService } from "@/features/admin/providers/services/providers.service";
import { AdminProviderResponse } from "@/features/admin/providers/types";

export function useProviders() {
    const [data, setData] = useState<AdminProviderResponse[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setData(await adminProvidersService.list());
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
