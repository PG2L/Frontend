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
import { Input } from "@/_components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/_components/ui/table";
import { Progress } from "@/_components/ui/progress";
import { Label } from "@/_components/ui/label";

/**
 * Represents the column definition for the achievementsTable table.
 */
export const columns: ColumnDef<Achievement>[] = [
    {
        /**
         * Represents the name column.
         */
        accessorKey: "name",
        header: ({ column }): React.JSX.Element => {
            return (
                <Button
                    variant="ghost"
                    onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Name
                    <icons.ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): React.JSX.Element => <div className="font-medium">{ row.getValue("name") }</div>,
    },
    {
        /**
         * Represents the description column.
         */
        accessorKey: "description",
        header: ({ column }): React.JSX.Element => {
            return (
                <Button
                    variant="ghost"
                    onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Description
                    <icons.ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): React.JSX.Element => <div>{ row.getValue("description") }</div>,
    },
    {
        /**
         * Represents the progress column.
         */
        accessorKey: "progress",
        header: ({ column }): React.JSX.Element => {
            return (
                <Button
                    variant="ghost"
                    onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Progress
                    <icons.ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }): React.JSX.Element => {
            const value: number = (0 / row.original.criteria.amount) * 100; // TODO: Calculate progress value
            return (
                <div className="grid">
                    <Label className="justify-self-center text-muted-foreground">{ `0/${row.original.criteria.amount}` }</Label>
                    <Progress value={ value } className="mt-2" />
                </div>
            );
        },
    },
    {
        /**
         * Represents the points_gain column.
         */
        accessorKey: "points_gain",
        header: (): React.JSX.Element => <div className="text-right">Points</div>,
        cell: ({ row }): React.JSX.Element => {
            const points_gain: number = parseFloat(row.getValue("points_gain"));

            return <div className="text-right">{ points_gain }</div>;
        },
    },
];

interface AchievementsTableProps {
    achievements: Achievement[];
}

/**
 * Renders a achievementsTable table with sorting, filtering, and pagination functionality.
 *
 * @param { AchievementsTableProps } props - The component props.
            * @returns { React.JSX.Element } The rendered achievements table.
            */
export default function DataTableDemo({
    achievements
}: AchievementsTableProps): React.JSX.Element {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data: achievements,
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
            {/* Search input for filtering by name */ }
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search..."
                    value={ (table.getColumn("name")?.getFilterValue() as string) ?? "" }
                    onChange={ (event): void | undefined =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
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
