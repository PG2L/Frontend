import React from 'react';
import { Skeleton } from '@/app/_components/ui/skeleton';

export default function Loading() {
    return (
        <>
            <div className="grid gap-10 sm:gap-12 mt-12">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-24" />
                <Skeleton className="w-full h-24" />
                <div className="grid gap-10 sm:flex sm:gap-6">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-24 h-10 justify-self-center" />
            </div>
        </>
    );
}