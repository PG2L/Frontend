import React from 'react';
import { Skeleton } from '../../../../_components/ui/skeleton';

/**
 * Renders a loading component with skeleton placeholders.
 *
 * @returns The JSX element representing the loading component.
 */
export default function Loading(): React.JSX.Element {

    return (

        <div className="grid gap-10 md:gap-16 mt-12 w-full">
            <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div><div className="grid gap-10 sm:flex sm:gap-6 w-full">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <Skeleton className="w-full h-10" />
            <div className="grid gap-10 sm:flex sm:gap-6 w-full">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <Skeleton className="w-24 h-10 justify-self-center" />
        </div>

    );
}