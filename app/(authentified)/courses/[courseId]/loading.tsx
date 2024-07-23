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
                    <Skeleton className="rounded h-4 !mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between [&_div]:grid [&_div]:gap-2 [&_div>*]:h-6">
                        <div className="w-full">
                            <Skeleton className="w-3/5" />
                            <Skeleton className="w-2/5" />
                        </div>
                        <div className="w-[15%] [&_*]:w-full">
                            <Skeleton />
                            <Skeleton />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="grid grid-cols-1 w-full sm:flex sm:justify-between gap-6 sm:items-end [&_*]:w-full">
                        <Skeleton className="sm:w-1/3 h-6" />
                        <Skeleton className="sm:w-1/2 h-12" />
                    </div>
                </CardFooter>
            </Card>
            { Array.from({ length: 25 }).map((_: unknown, index: number): React.JSX.Element => (
                index % 8 === 0 ?
                    <br key={ index } />
                    :
                    <Skeleton key={ index } className={ `h-6 mt-2 ${(index % 2 === 0) ? 'w-full' : 'w-[95%]'}` } />
            )) }
        </>

    );
};