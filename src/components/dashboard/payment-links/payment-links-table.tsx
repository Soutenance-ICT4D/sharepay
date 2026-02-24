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
    ChevronDown,
    MoreHorizontal,
    Copy,
    Edit,
    Archive,
    ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/i18n/routing";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
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
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";

// Mock Data Type
export type PaymentLink = {
    id: string;
    name: string;
    amount: number | "Libre";
    currency: string;
    status: "active" | "inactive" | "archived";
    createdAt: string;
};

interface PaymentLinksTableProps {
    data: PaymentLink[];
}

export function PaymentLinksTable({ data }: PaymentLinksTableProps) {
    const t = useTranslations("Dashboard.PaymentLinks.Table");
    const router = useRouter();
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

    const columns: ColumnDef<PaymentLink>[] = [
        {
            accessorKey: "name",
            header: t("name"),
            cell: ({ row }) => (
                <div className="font-medium text-foreground">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: t("status"),
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant={status === "active" ? "default" : "secondary"}>
                        {status === "active" ? t("statusActive") : status === "inactive" ? t("statusInactive") : t("statusArchived")}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "amount",
            header: t("amount"),
            cell: ({ row }) => {
                const amount = row.getValue("amount");
                const currency = row.original.currency;

                if (amount === "Libre") return <span className="text-muted-foreground">{t("freeAmount")}</span>;

                return (
                    <div className="font-medium">
                        {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "XOF",
                        }).format(amount as number)}
                    </div>
                );
            },
        },
        {
            id: "url",
            header: t("paymentLink"),
            cell: ({ row }) => {
                const url = `https://sharepay.app/p/${row.original.id}`;
                return (
                    <div className="flex items-center gap-2 max-w-[200px] sm:max-w-[300px]">
                        <div className="truncate text-sm text-primary underline underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
                            {url}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => {
                                navigator.clipboard.writeText(url);
                                toast.success(t("successCopy"), {
                                    description: t("descCopy")
                                });
                            }}
                            title={t("copyLink")}
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-0"
                    >
                        {t("createdAt")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.getValue("createdAt")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const paymentLink = row.original;

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
                                    navigator.clipboard.writeText(paymentLink.id);
                                    toast.success(t("successCopy"), {
                                        description: t("descIdCopy")
                                    });
                                }}
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                {t("copyLink")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                {t("viewPage")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/payment-links/${paymentLink.id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Archive className="mr-2 h-4 w-4" />
                                {t("archive")}
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
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
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
                            <SelectValue placeholder={t("status")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("statusAll")}</SelectItem>
                            <SelectItem value="active">{t("statusActive")}</SelectItem>
                            <SelectItem value="inactive">{t("statusInactive")}</SelectItem>
                            <SelectItem value="archived">{t("statusArchived")}</SelectItem>
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
