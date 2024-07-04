import React, { Suspense } from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { Skeleton } from '../../../../_components/ui/skeleton';
import { getData } from '../../../../_lib/data';

export default async function AdminCourseEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        courseId: string,
    },
}): Promise<React.JSX.Element> {

    const courses: Course[] = await getData("courses") as Course[];
    const course: Course = await getData("courses", params.courseId) as Course;

    return (
        <div className="grid w-full grid-cols-1">
            <Suspense fallback={
                <div className="md:flex grid items-center gap-6">
                    <Skeleton className="md:w-1/2 w-2/3 h-10" />
                    <Skeleton className="md:w-1/2 h-10" />
                </div>
            }>
                <AdminHeader course={ course } courses={ courses } />
            </Suspense>
            { children }
        </div>
    );
}