import { useState, useEffect, useCallback } from "react";
import { appsService } from "@/features/merchant/apps/services/apps.service";
import { AppResponse } from "@/features/merchant/apps/types";

export function useApp(id: string) {
    const [app, setApp]         = useState<AppResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<unknown>(null);

    const fetch = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            setApp(await appsService.getById(id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { fetch(); }, [fetch]);

    return { app, loading, error, refetch: fetch };
}
