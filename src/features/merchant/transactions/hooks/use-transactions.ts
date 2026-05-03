import { useState, useEffect, useCallback } from "react";
import { transactionsService } from "@/features/merchant/transactions/services/transactions.service";
import { TransactionFilters, TransactionPage } from "@/features/merchant/transactions/types";

interface UseTransactionsResult {
    data: TransactionPage | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useTransactions(filters: TransactionFilters): UseTransactionsResult {
    const [data,    setData]    = useState<TransactionPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);

    const load = useCallback(() => {
        setLoading(true);
        setError(null);
        transactionsService
            .list(filters)
            .then(setData)
            .catch((err) => setError(err?.message ?? "Erreur de chargement"))
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.page, filters.size, filters.status, filters.type]);

    useEffect(() => { load(); }, [load]);

    return { data, loading, error, refetch: load };
}
