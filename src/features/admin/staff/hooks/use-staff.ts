import { useState, useEffect, useCallback } from "react";
import { adminStaffService } from "@/features/admin/staff/services/staff.service";
import { StaffResponse, PaginationResponse, StaffRole } from "@/features/admin/staff/types";

export function useStaff(roleFilter?: StaffRole, initialPage = 0, pageSize = 20) {
    const [data, setData] = useState<PaginationResponse<StaffResponse> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const fetch = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await adminStaffService.list(page, pageSize);
            const filtered = roleFilter
                ? { ...result, content: result.content.filter((s) => s.role === roleFilter) }
                : result;
            setData(filtered);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [pageSize, roleFilter]);

    useEffect(() => { fetch(initialPage); }, [fetch, initialPage]);

    return { data, loading, error, refetch: fetch };
}
