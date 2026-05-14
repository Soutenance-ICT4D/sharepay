import { useState, useEffect, useCallback } from "react";
import { webhookService } from "@/features/merchant/apps/services/webhook.service";
import { AppWebhookResponse } from "@/features/merchant/apps/types";

export function useWebhook(appId: string) {
    const [config, setConfig]   = useState<AppWebhookResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<unknown>(null);

    const refetch = useCallback(async () => {
        if (!appId) return;
        setLoading(true);
        setError(null);
        try {
            setConfig(await webhookService.getConfig(appId));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [appId]);

    useEffect(() => { refetch(); }, [refetch]);

    return { config, setConfig, loading, error, refetch };
}
