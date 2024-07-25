import React from 'react';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Renders a loading component with skeleton placeholders.
 *
 * @returns The JSX element representing the loading component.
 */
export default function Loading(): React.JSX.Element {

    return (

        <div className="space-y-10 md:space-y-16 mt-12 w-full [&_div]:grid [&_div]:gap-10 [&_div]:w-full sm:[&_div]:flex sm:[&_div]:gap-6 [&_div>*]:w-full [&_div>*]:h-10">
            <div>
                <Skeleton />
                <Skeleton />
            </div>
            <div>
                <Skeleton />
                <Skeleton />
            </div>
            <div>
                <Skeleton />
                <Skeleton />
            </div>
            <div>
                <Skeleton />
                <Skeleton />
            </div>
            <Skeleton className="w-full h-10" />
            <div>
                <Skeleton />
                <Skeleton />
            </div>
            <Skeleton className="w-24 h-10 justify-self-center" />
        </div>

    );
}