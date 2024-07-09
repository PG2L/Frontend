import React from 'react';
import { Skeleton } from '../../../../_components/ui/skeleton';

/**
 * Renders a loading component.
 * @returns The loading component.
 */
export default function Loading(): React.JSX.Element {

    return (
        <div className="grid gap-10 md:gap-12 mt-12">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-24" />
            <div className="grid gap-10 sm:flex sm:gap-6">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div className="grid gap-10 sm:flex sm:gap-6">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div className="grid gap-10 sm:flex sm:gap-6">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div className="grid gap-10 sm:flex sm:gap-6">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <Skeleton className="w-24 h-10 justify-self-center" />
        </div>
    );
}