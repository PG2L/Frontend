import React from 'react';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Renders a loading component with skeleton placeholders.
 *
 * @returns The JSX element representing the loading component.
 */
export default function Loading(): React.JSX.Element {

    return (

        <div className="space-y-10 sm:space-y-12 mt-12 [&_*]:w-full">
            <Skeleton className="h-10" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <div className="grid gap-10 sm:flex sm:gap-6 [&_*]:w-full [&_*]:h-10">
                <Skeleton />
                <Skeleton />
            </div>
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="w-24 h-10 justify-self-center" />
        </div>

    );
}