"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    MoreHorizontal,
    Copy,
    Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export type Transaction = {
    id: string;
    phone: string;
    amount: number;
    status: "success" | "pending" | "failed";
    date: string;
    source: string; // the name of the application or the payment link
};

interface TransactionsTableProps {
    data: Transaction[];
}

export function TransactionsTable({ data }: TransactionsTableProps) {
    const t = useTranslations("Dashboard.Transactions.Table");
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: "id",
            header: t("id"),
            cell: ({ row }) => (
                <div className="font-medium text-muted-foreground text-xs truncate max-w-[100px]" title={row.getValue("id")}>
                    {row.getValue("id")}
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: t("phone"),
            cell: ({ row }) => (
                <div className="font-medium text-foreground">
                    {row.getValue("phone")}
                </div>
            ),
        },
        {
            accessorKey: "amount",
            header: t("amount"),
            cell: ({ row }) => {
                const amount = row.getValue("amount") as number;

                return (
                    <div className="font-semibold text-foreground">
                        {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "XOF",
                        }).format(amount)}
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: t("status"),
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                let label = t("statusPending");

                if (status === "success") {
                    variant = "default";
                    label = t("statusSuccess");
                } else if (status === "failed") {
                    variant = "destructive";
                    label = t("statusFailed");
                } else {
                    variant = "secondary";
                    label = t("statusPending");
                }

                return <Badge variant={variant}>{label}</Badge>;
            },
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-0"
                    >
                        {t("date")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const dateStr = row.getValue("date") as string;
                const d = new Date(dateStr);
                return (
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(d, "dd MMM yyyy, HH:mm")}
                    </div>
                );
            },
        },
        {
            accessorKey: "source",
            header: t("source"),
            cell: ({ row }) => (
                <div className="text-sm text-foreground">
                    {row.getValue("source")}
                </div>
            ),
        },
        {
            id: "actions",
            header: t("actions"),
            enableHiding: false,
            cell: ({ row }) => {
                const transaction = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(transaction.id);
                                    toast.success(t("successCopy"), {
                                        description: t("descIdCopy")
                                    });
                                }}
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                {t("copyLink")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                {t("viewDetails")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder={t("filterPlaceholder")}
                        value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("phone")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Select
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                        onValueChange={(value) =>
                            table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t("statusAll")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("statusAll")}</SelectItem>
                            <SelectItem value="success">{t("statusSuccess")}</SelectItem>
                            <SelectItem value="pending">{t("statusPending")}</SelectItem>
                            <SelectItem value="failed">{t("statusFailed")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-md border">
                <Table wrapperClassName="max-h-[calc(100vh-350px)]">
                    <TableHeader className="sticky top-0 bg-background z-10 shadow-sm hover:bg-background">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {t("noResults")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto">
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {t("showing")} {table.getFilteredRowModel().rows.length} {t("elements")}
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium whitespace-nowrap">{t("rowsPerPage")}</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 25, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        {t("page")} {table.getState().pagination.pageIndex + 1} {t("of")}{" "}
                        {table.getPageCount() || 1}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t("previous")}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t("next")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
