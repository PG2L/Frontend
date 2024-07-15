"use client";

import * as React from "react";
import * as icons from "lucide-react";
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

import { Button } from "@/_components/ui/button";
import { Checkbox } from "@/_components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Input } from "@/_components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/_components/ui/table";
import { UserHoverCard } from "../UserHoverCard/UserHoverCard";

/**
 * Represents the column definition for the leaderboard table.
 */
export const columns: ColumnDef<User>[] = [
    {
        /**
         * Represents the select column.
         */
        id: "select",
        header: ({ table }): React.JSX.Element => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={ (value): void => table.toggleAllPageRowsSelected(!!value) }
                aria-label="Select all"
            />
        ),
        cell: ({ row }): React.JSX.Element => (
            <Checkbox
                checked={ row.getIsSelected() }
                onCheckedChange={ (value): void => row.toggleSelected(!!value) }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        /**
         * Represents the rank column.
         */
        accessorKey: "rank",
        header: ({ column }): React.JSX.Element => {
            return (
                <Button
                    variant="ghost"
                    onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Rank
                    <icons.ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): React.JSX.Element => (
            <div className="ps-6">{ row.index + 1 }</div>
        ),
    },
    {
        /**
         * Represents the username column.
         */
        accessorKey: "username",
        header: ({ column }): React.JSX.Element => {
            return (
                <Button
                    variant="ghost"
                    onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Username
                    <icons.ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): React.JSX.Element => <UserHoverCard user={ row.original } />,
    },
    {
        /**
         * Represents the email column.
         */
        accessorKey: "email",
        header: ({ column }): React.JSX.Element => {
            return (
                <Button
                    variant="ghost"
                    onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Email
                    <icons.ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): React.JSX.Element => <div className="lowercase">{ row.getValue("email") }</div>,
    },
    {
        /**
         * Represents the total points column.
         */
        accessorKey: "total_points",
        header: () => <div className="text-right">Points</div>,
        cell: ({ row }): React.JSX.Element => {
            const total_points: number = parseFloat(row.getValue("total_points"));

            return <div className="text-right">{ total_points }</div>;
        },
    },
    {
        /**
         * Represents the actions column.
         */
        id: "actions",
        enableHiding: false,
        cell: ({ row }): React.JSX.Element => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            ...
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            View profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add friend</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

interface LeaderboardProps {
    users: User[];
}

/**
 * Renders a leaderboard table with sorting, filtering, and pagination functionality.
 *
 * @param {LeaderboardProps} props - The component props.
 * @returns {React.JSX.Element} The rendered leaderboard table.
 */
export default function DataTableDemo({
    users
}: LeaderboardProps): React.JSX.Element {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data: users,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (

        <div className="w-full">
            {/* Search input for filtering by username */ }
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search..."
                    value={ (table.getColumn("username")?.getFilterValue() as string) ?? "" }
                    onChange={ (event): void | undefined =>
                        table.getColumn("username")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md">
                <Table>
                    {/* Table header rendering */ }
                    <TableHeader>
                        { table.getHeaderGroups().map((headerGroup): React.JSX.Element => (
                            <TableRow key={ headerGroup.id }>
                                { headerGroup.headers.map((header): React.JSX.Element => {
                                    return (
                                        <TableHead key={ header.id }>
                                            { header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                ) }
                                        </TableHead>
                                    );
                                }) }
                            </TableRow>
                        )) }
                    </TableHeader>
                    {/* Table body rendering */ }
                    <TableBody>
                        { table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row): React.JSX.Element => (
                                <TableRow
                                    key={ row.id }
                                    data-state={ row.getIsSelected() && "selected" }
                                >
                                    { row.getVisibleCells().map((cell): React.JSX.Element => (
                                        <TableCell key={ cell.id }>
                                            { flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            ) }
                                        </TableCell>
                                    )) }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={ columns.length }
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </div>
            {/* Pagination and row selection info */ }
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    { table.getFilteredSelectedRowModel().rows.length } of{ " " }
                    { table.getFilteredRowModel().rows.length } row(s) selected.
                </div>
                {/* Pagination buttons */ }
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={ (): void => table.previousPage() }
                        disabled={ !table.getCanPreviousPage() }
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={ (): void => table.nextPage() }
                        disabled={ !table.getCanNextPage() }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>

    );
}
