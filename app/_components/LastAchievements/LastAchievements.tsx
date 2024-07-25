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

interface LastAchievementsProps { }

/**
 * Renders a achievements table with sorting, filtering, and pagination functionality.
 *
 * @param { LastAchievementsProps } props - The component props.
 * @returns { React.JSX.Element } The rendered achievements table.
 */
export default function LastAchievements({ }: LastAchievementsProps): React.JSX.Element {

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = React.useContext(UserContext) as User;

    const completedAchievements: UserAchievement[] = user.achievements.filter((userAchievement: UserAchievement): boolean => userAchievement.completion_status === "completed").slice(0, 3);

    completedAchievements.sort((a: UserAchievement, b: UserAchievement): number => {
        if (a.completion_status === "completed" && b.completion_status === "completed") {
            return a.completion_date > b.completion_date ? -1 : 1;
        } else if (a.completion_status === "completed") {
            return -1;
        } else {
            return 1;
        }
    });

    /**
     * Represents the column definition for the achievements table.
     */
    const columns: ColumnDef<UserAchievement>[] = [
        {
            accessorKey: "name",
            cell: ({ row }: CellContext<UserAchievement, unknown>): React.JSX.Element => <div className="font-medium">{ row.original.achievement.name }</div>,
        },
        {
            accessorKey: "description",
            cell: ({ row }: CellContext<UserAchievement, unknown>): React.JSX.Element => <div>{ row.original.achievement.description }</div>,
        },
        {
            accessorKey: "progress",
            cell: ({ row }: CellContext<UserAchievement, unknown>): React.JSX.Element => {

                return (
                    <>
                        <p className="w-full text-muted-foreground text-center">{ `${row.getValue('progress')}/${row.original.achievement.criteria.amount}` }</p>
                        <Progress value={ 100 } className="mt-2 justify-self-center" />
                    </>
                );
            },
        },
        {
            accessorKey: "points_gain",
            cell: ({ row }: CellContext<UserAchievement, unknown>): React.JSX.Element => {

                return (
                    <>
                        <p className="flex text-right text-foreground justify-end items-center">
                            { row.original.achievement.points_gain }
                            <icons.Star className="ml-2 size-6 text-primary" strokeWidth={ 1 } />
                        </p>
                        <p className="text-right text-muted-foreground">Completed on <span className="text-nowrap">{ row.original.completion_date.slice(0, 10) }</span>
                        </p>
                    </>
                );
            },
        },
    ];

    const table = useReactTable({
        data: completedAchievements,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <Table>
            <TableBody>
                { table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: Row<UserAchievement>): React.JSX.Element => {
                        return (
                            <TableRow key={ row.id }>
                                { row.getVisibleCells().map((cell: Cell<UserAchievement, unknown>): React.JSX.Element => (
                                    <TableCell key={ cell.id } className={ cell.column.id === "points_gain" ? "w-[20%]" : "w-[25%]" }>
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
                        <TableCell colSpan={ columns.length } className="h-24 text-center">
                            You haven't completed any achievement.
                        </TableCell>
                    </TableRow>
                ) }
            </TableBody>
        </Table>

    );
}
