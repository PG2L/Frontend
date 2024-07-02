import React, { Suspense } from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { Skeleton } from '../../../../_components/ui/skeleton';

async function getCourses() {

    const res = await fetch(`http://localhost:8000/courses`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function getCourse(id: string) {

    const res = await fetch(`http://localhost:8000/courses/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function AdminCourseEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        courseId: string,
    },
}) {

    const courses = await getCourses();

    const course = await getCourse(params.courseId);

    return (
        <>
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
        </>
    );
}