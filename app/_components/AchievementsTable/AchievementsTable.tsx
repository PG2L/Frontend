"use client";

import * as React from "react";
import * as icons from "lucide-react";
import {
    Cell,
    CellContext,
    ColumnDef,
    ColumnFiltersState,
    Header,
    HeaderContext,
    HeaderGroup,
    Row,
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
import { UserContext } from "@/_contexts/UserProvider";

interface AchievementsTableProps {
    achievements: Achievement[];
}

/**
 * Renders a achievements table with sorting, filtering, and pagination functionality.
 *
 * @param { AchievementsTableProps } props - The component props.
 * @returns { React.JSX.Element } The rendered achievements table.
 */
export default function AchievementsTable({
    achievements,
}: AchievementsTableProps): React.JSX.Element {

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = React.useContext(UserContext) as User;

    /**
     * Represents the column definition for the achievements table.
     */
    const columns: ColumnDef<Achievement>[] = [
        {
            /**
             * Represents the name column.
             */
            accessorKey: "name",
            header: ({ column }: HeaderContext<Achievement, unknown>): React.JSX.Element => {
                return (
                    <Button
                        variant="ghost"
                        onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                    >
                        Name
                        <icons.ChevronsUpDown className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }: CellContext<Achievement, unknown>): React.JSX.Element => <p className="font-medium">{ row.getValue("name") }</p>,
        },
        {
            /**
             * Represents the description column.
             */
            accessorKey: "description",
            header: ({ column }: HeaderContext<Achievement, unknown>): React.JSX.Element => {
                return (
                    <Button
                        variant="ghost"
                        onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                    >
                        Description
                        <icons.ChevronsUpDown className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }: CellContext<Achievement, unknown>): React.JSX.Element => <p>{ row.getValue("description") }</p>,
        },
        {
            /**
             * Represents the progress column.
             */
            accessorKey: "progress",
            header: ({ column }: HeaderContext<Achievement, unknown>): React.JSX.Element => {
                return (
                    <Button
                        variant="ghost"
                        onClick={ (): void => column.toggleSorting(column.getIsSorted() === "asc") }
                    >
                        Progress
                        <icons.ChevronsUpDown className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }: CellContext<Achievement, unknown>): React.JSX.Element => {
                const progress: number = user.achievements.find(
                    (achievement: UserAchievement): boolean => achievement.achievement.id === row.original.id
                )?.progress ?? 0;
                const progressPercent: number = (progress / row.original.criteria.amount) * 100;

                return (
                    <div className="grid w-80">
                        <p className="justify-self-center text-muted-foreground">{ `${progress}/${row.original.criteria.amount}` }</p>
                        <Progress value={ progressPercent } className="mt-2 justify-self-center" />
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
            cell: ({ row }: CellContext<Achievement, unknown>): React.JSX.Element => {
                const points_gain: number = parseFloat(row.getValue("points_gain"));
                const userAchievement: UserAchievement | undefined = user.achievements.find(
                    (achievement: UserAchievement): boolean => achievement.achievement.id === row.original.id
                );

                return (
                    userAchievement?.completion_status === "completed" ?
                        <>
                            <p className="flex text-right text-muted-foreground justify-end items-center">
                                { points_gain }
                                <icons.Star className="ml-2 size-6" strokeWidth={ 1 } />
                            </p>
                            <p className="text-right text-muted-foreground">Completed on <span className="text-nowrap">{ userAchievement.completion_date.slice(0, 10) }</span></p>
                        </>
                        :
                        <p className="flex text-right justify-end items-center">
                            { points_gain }
                            <icons.Star className="ml-2 size-6 text-primary" strokeWidth={ 1 } />
                        </p>
                );
            },
        },
    ];

    // Sort the achievements by completion status
    achievements.sort((a: Achievement, b: Achievement): number => {
        const aCompleted: boolean = user.achievements.find(
            (achievement: UserAchievement): boolean => achievement.achievement.id === a.id
        )?.completion_status === "completed";
        const bCompleted: boolean = user.achievements.find(
            (achievement: UserAchievement): boolean => achievement.achievement.id === b.id
        )?.completion_status === "completed";

        return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
    });

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [pagination, setPagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
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

        <div className="w-full">
            {/* Search input for filtering by name */ }
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search..."
                    value={ (table.getColumn("name")?.getFilterValue() as string) ?? "" }
                    onChange={ (event: React.ChangeEvent<HTMLInputElement>): void | undefined =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md">
                <Table>
                    {/* Table header rendering */ }
                    <TableHeader>
                        { table.getHeaderGroups().map((headerGroup: HeaderGroup<Achievement>): React.JSX.Element => (
                            <TableRow key={ headerGroup.id }>
                                { headerGroup.headers.map((header: Header<Achievement, unknown>): React.JSX.Element => {
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
                            table.getRowModel().rows.map((row: Row<Achievement>): React.JSX.Element => {
                                const isCompleted: boolean = user.achievements.find(
                                    (achievement: UserAchievement): boolean => achievement.achievement.id === row.original.id
                                )?.completion_status === "completed";
                                return (
                                    <TableRow
                                        key={ row.id }
                                        data-state={ row.getIsSelected() && "selected" }
                                        className={ isCompleted ? "bg-secondary" : "" }
                                    >
                                        { row.getVisibleCells().map((cell: Cell<Achievement, unknown>): React.JSX.Element => (
                                            <TableCell key={ cell.id } className={ cell.column.id === "points_gain" ? "w-[15%]" : "w-[28%]" }>
                                                { flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                ) }
                                            </TableCell>
                                        )) }
                                    </TableRow>
                                );
                            })
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
            {/* Pagination buttons */ }
            <div className="flex items-center justify-between space-x-2 py-4">
                <p className="text-muted-foreground">Page { pagination.pageIndex + 1 } of { table.getPageCount() }</p>
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
