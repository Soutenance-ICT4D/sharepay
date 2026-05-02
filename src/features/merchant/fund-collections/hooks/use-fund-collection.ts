import { useState, useEffect, useCallback } from "react";
import { fundCollectionsService } from "@/features/merchant/fund-collections/services/fund-collections.service";
import { FundCollectionResponse } from "@/features/merchant/fund-collections/types";

export function useFundCollection(id: string) {
    const [data, setData]       = useState<FundCollectionResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<unknown>(null);

    const fetch = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            setData(await fundCollectionsService.getById(id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { fetch(); }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
