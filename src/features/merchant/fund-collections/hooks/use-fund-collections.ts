import { useState, useEffect, useCallback } from "react";
import { fundCollectionsService } from "@/features/merchant/fund-collections/services/fund-collections.service";
import { FundCollectionResponse, FundCollectionStatus } from "@/features/merchant/fund-collections/types";

interface UseFundCollectionsOptions {
    applicationId?: string;
    status?: FundCollectionStatus;
}

export function useFundCollections(options?: UseFundCollectionsOptions) {
    const [data, setData]       = useState<FundCollectionResponse[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<unknown>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fundCollectionsService.list(options);
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options?.applicationId, options?.status]);

    useEffect(() => { fetch(); }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
