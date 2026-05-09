import { useState, useEffect, useCallback } from "react";
import { adminMerchantsService } from "@/features/admin/merchants/services/merchants.service";
import { MerchantSummaryResponse, PaginationResponse, AccountStatus } from "@/features/admin/merchants/types";

export function useMerchants(initialPage = 0, pageSize = 20, statusFilter?: AccountStatus) {
    const [data, setData] = useState<PaginationResponse<MerchantSummaryResponse> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const fetch = useCallback(async (page: number, status?: AccountStatus) => {
        setLoading(true);
        setError(null);
        try {
            const result = await adminMerchantsService.list(page, pageSize, status);
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [pageSize]);

    useEffect(() => { fetch(initialPage, statusFilter); }, [fetch, initialPage, statusFilter]);

    return { data, loading, error, refetch: fetch };
}
