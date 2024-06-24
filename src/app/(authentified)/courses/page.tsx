import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import CourseCard from '@/components/CourseCard/CourseCard';


async function getData() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Page() {
    const data = await getData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between py-6 gap-4 lg:gap-6 bg-background w-full">
            <Suspense fallback={Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="w-full rounded-lg h-72" />
            ))}>
                {data.map((course: [], index: number) => (
                    <CourseCard key={index} course={course} />
                ))}
            </Suspense>
        </div >
    );
}