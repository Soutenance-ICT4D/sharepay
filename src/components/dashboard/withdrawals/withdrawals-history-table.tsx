"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type Withdrawal = {
    id: string;
    date: Date;
    amount: number;
    destination: string;
    status: "pending" | "completed" | "failed";
};

interface WithdrawalsHistoryTableProps {
    history: Withdrawal[];
}

export function WithdrawalsHistoryTable({ history }: WithdrawalsHistoryTableProps) {
    const t = useTranslations("Dashboard.Withdrawals.History");

    const columns: ColumnDef<Withdrawal>[] = [
        {
            accessorKey: "date",
            header: t("date"),
            cell: ({ row }) => {
                const date = row.getValue("date") as Date;
                const formatted = new Intl.DateTimeFormat("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(date);

                return <div className="text-muted-foreground whitespace-nowrap">{formatted}</div>;
            },
        },
        {
            accessorKey: "amount",
            header: t("amount"),
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"));
                const formatted = new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                }).format(amount);

                return <div className="font-semibold">{formatted}</div>;
            },
        },
        {
            accessorKey: "destination",
            header: t("destination"),
            cell: ({ row }) => {
                return <div className="text-foreground">{row.getValue("destination")}</div>;
            },
        },
        {
            accessorKey: "status",
            header: t("status"),
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
                let label = status;

                switch (status) {
                    case "completed":
                        badgeVariant = "default";
                        label = t("statusCompleted");
                        break;
                    case "pending":
                        badgeVariant = "secondary";
                        label = t("statusPending");
                        break;
                    case "failed":
                        badgeVariant = "destructive";
                        label = t("statusFailed");
                        break;
                }

                return (
                    <Badge variant={badgeVariant} className={status === "completed" ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-500/20" : status === "pending" ? "bg-amber-500/15 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20" : ""}>
                        {label}
                    </Badge>
                );
            },
        },
    ];

    const table = useReactTable({
        data: history,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 5 },
            sorting: [{ id: "date", desc: true }]
        }
    });

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("title")}</h3>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="whitespace-nowrap">
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
                                    Aucun résultat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="rounded-full"
                >
                    Précédent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="rounded-full"
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
}
