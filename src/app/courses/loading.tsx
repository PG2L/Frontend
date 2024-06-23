import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between py-6 gap-4 lg:gap-6 w-full bg-background">
            {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="w-full rounded-lg h-72" />
            ))}
        </div>
    )
}