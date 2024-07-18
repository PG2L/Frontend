import {
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from '@/_components/ui/card';
import React from 'react';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Renders a loading component with skeleton placeholders.
 *
 * @returns The JSX element representing the loading component.
 */
export default function Loading(): React.JSX.Element {

    return (

        <>
            <Card>
                <CardHeader>
                    <Skeleton className="hidden sm:block py-36" />
                    <Skeleton className="rounded h-4 w-1/2 !mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="flex w-full justify-between">
                        <div className="grid w-full gap-2">
                            <Skeleton className="w-3/5 h-6" />
                            <Skeleton className="w-2/5 h-6" />
                        </div>
                        <div className="grid w-[15%] gap-2">
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="grid w-full grid-cols-1 sm:flex sm:justify-between gap-6 sm:items-end">
                        <Skeleton className="w-full sm:w-1/3 h-6" />
                        <Skeleton className="w-full sm:w-1/2 h-12" />
                    </div>
                </CardFooter>
            </Card>
            { Array.from({ length: 25 }).map((_: unknown, index: number): React.JSX.Element => { // Create an array of 25 elements and map over it to render a skeleton element for each.
                if (index % 8 === 0) {
                    return <br key={ index } />;
                } else {
                    return <Skeleton key={ index } className={
                        `h-6 mt-2` +
                        `${(index % 2 === 0) ? 'w-full' : 'w-[95%]'}` // Conditional width based on index
                    } />;
                }
            }) }
        </>

    );
};