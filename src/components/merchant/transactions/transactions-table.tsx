"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Copy, Search } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MockTransaction, TxStatus } from "./mock-data";

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        className?: string;
    }
}

// ── Status & provider styles ──────────────────────────────────────────────────

const STATUS_STYLE: Record<TxStatus, string> = {
    SUCCESS:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0",
    PENDING:   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0",
    FAILED:    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0",
    CANCELLED: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0",
    REFUNDED:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0",
};

const PROVIDER_COLOR: Record<string, string> = {
    MTN:    "#fbbf24",
    ORANGE: "#f97316",
};

const PROVIDER_LABEL: Record<string, string> = {
    MTN:    "MTN MoMo",
    ORANGE: "Orange Money",
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface TransactionsTableProps {
    data: MockTransaction[];
    onRowClick: (tx: MockTransaction) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TransactionsTable({ data, onRowClick }: TransactionsTableProps) {
    const t = useTranslations("Dashboard.Transactions.Table");

    const [sorting,          setSorting]          = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
    const [columnFilters,    setColumnFilters]    = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [globalFilter,     setGlobalFilter]     = React.useState("");
    const [pagination,       setPagination]       = React.useState({ pageIndex: 0, pageSize: 10 });

    const statusFilterValue = (columnFilters.find((f) => f.id === "status")?.value as string) ?? "all";

    const fmt = (n: number) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(n);

    const statusLabel = (s: TxStatus): string => {
        const map: Record<TxStatus, string> = {
            SUCCESS: t("statusSuccess"), PENDING: t("statusPending"),
            FAILED: t("statusFailed"), CANCELLED: t("statusCancelled"), REFUNDED: t("statusRefunded"),
        };
        return map[s];
    };

    const columns: ColumnDef<MockTransaction>[] = [
        {
            accessorKey: "reference",
            header: t("reference"),
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 min-w-[120px]">
                    <span className="font-mono text-xs font-semibold text-foreground">
                        {row.getValue<string>("reference")}
                    </span>
                    <button
                        type="button"
                        className="hidden sm:inline-flex text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(row.getValue<string>("reference"));
                            toast.success(t("successCopy"), { description: t("descRefCopy") });
                        }}
                    >
                        <Copy className="h-3 w-3" />
                    </button>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: t("type"),
            meta: { className: "hidden sm:table-cell" },
            cell: ({ row }) => {
                const type = row.getValue<string>("type");
                return (
                    <Badge variant={type === "PAYMENT" ? "default" : "outline"} className="text-xs whitespace-nowrap">
                        {type === "PAYMENT" ? t("typePayment") : t("typePayout")}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "clientName",
            header: t("client"),
            cell: ({ row }) => (
                <div className="min-w-[110px]">
                    <p className="text-sm font-medium text-foreground leading-tight">{row.original.clientName}</p>
                    <p className="hidden sm:block text-xs text-muted-foreground font-mono leading-tight mt-0.5">
                        {row.original.clientPhone}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: "provider",
            header: t("provider"),
            meta: { className: "hidden md:table-cell" },
            cell: ({ row }) => {
                const p = row.getValue<string>("provider");
                return (
                    <div className="flex items-center gap-2">
                        <span
                            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: PROVIDER_COLOR[p] }}
                        />
                        <span className="text-sm font-medium whitespace-nowrap">{PROVIDER_LABEL[p] ?? p}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "amount",
            header: t("amount"),
            cell: ({ row }) => {
                const tx = row.original;
                return (
                    <div className="min-w-[90px]">
                        <p className="text-sm font-semibold text-foreground whitespace-nowrap">{fmt(tx.amount)}</p>
                        {tx.net > 0 && (
                            <p className="hidden sm:block text-xs text-emerald-600 dark:text-emerald-400 whitespace-nowrap mt-0.5">
                                net {fmt(tx.net)}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: t("status"),
            filterFn: (row, _id, filterValue) => {
                if (!filterValue || filterValue === "all") return true;
                return row.original.status === filterValue;
            },
            cell: ({ row }) => {
                const s = row.getValue<TxStatus>("status");
                return (
                    <Badge className={`text-xs font-semibold whitespace-nowrap ${STATUS_STYLE[s]}`}>
                        {statusLabel(s)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            id: "createdAt",
            meta: { className: "hidden md:table-cell" },
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="px-0 whitespace-nowrap"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("date")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(row.getValue<string>("createdAt")), "dd MMM yyyy, HH:mm", { locale: fr })}
                </span>
            ),
            sortingFn: "datetime",
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state:     { sorting, columnFilters, columnVisibility, pagination, globalFilter },
        onSortingChange:          setSorting,
        onColumnFiltersChange:    setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange:       setPagination,
        onGlobalFilterChange:     setGlobalFilter,
        globalFilterFn:           "includesString",
        getCoreRowModel:          getCoreRowModel(),
        getFilteredRowModel:      getFilteredRowModel(),
        getSortedRowModel:        getSortedRowModel(),
        getPaginationRowModel:    getPaginationRowModel(),
    });

    return (
        <div className="w-full space-y-4">
            {/* Filters — always visible, not inside the scrollable table */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        placeholder={t("filterPlaceholder")}
                        value={globalFilter}
                        onChange={(e) => { setGlobalFilter(e.target.value); table.setPageIndex(0); }}
                        className="pl-9"
                    />
                </div>
                <Select
                    value={statusFilterValue}
                    onValueChange={(v) => {
                        table.getColumn("status")?.setFilterValue(v === "all" ? "" : v);
                        table.setPageIndex(0);
                    }}
                >
                    <SelectTrigger className="flex-1 sm:flex-none sm:w-[160px]">
                        <SelectValue placeholder={t("statusAll")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t("statusAll")}</SelectItem>
                        <SelectItem value="SUCCESS">{t("statusSuccess")}</SelectItem>
                        <SelectItem value="PENDING">{t("statusPending")}</SelectItem>
                        <SelectItem value="FAILED">{t("statusFailed")}</SelectItem>
                        <SelectItem value="CANCELLED">{t("statusCancelled")}</SelectItem>
                        <SelectItem value="REFUNDED">{t("statusRefunded")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table with internal scroll */}
            <div className="rounded-xl border min-h-[520px]">
                <Table wrapperClassName="max-h-[520px]">
                    <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id} className="hover:bg-transparent">
                                {hg.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            "font-semibold text-xs uppercase tracking-wide",
                                            header.column.columnDef.meta?.className,
                                        )}
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => onRowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(cell.column.columnDef.meta?.className)}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    {t("noResults")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination — always visible below the scrollable table */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {t("showing")} {table.getFilteredRowModel().rows.length} {t("elements")}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium whitespace-nowrap">{t("rowsPerPage")}</span>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(v) => table.setPageSize(Number(v))}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 25, 50].map((s) => (
                                    <SelectItem key={s} value={`${s}`}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium whitespace-nowrap">
                        {t("page")} {table.getState().pagination.pageIndex + 1} {t("of")} {table.getPageCount() || 1}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        {t("previous")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {t("next")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
