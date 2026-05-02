import { useState, useEffect, useCallback } from "react";
import { appsService } from "@/features/merchant/apps/services/apps.service";
import { AppResponse } from "@/features/merchant/apps/types";

export function useApps() {
    const [data, setData]       = useState<AppResponse[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<unknown>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await appsService.list();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
