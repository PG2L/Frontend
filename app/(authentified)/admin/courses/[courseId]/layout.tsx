import React, { Suspense } from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { Skeleton } from '../../../../_components/ui/skeleton';
import { getData } from '../../../../_lib/data';

/**
 * Renders the layout for editing an admin course.
 * 
 * @param children - The child components to render within the layout.
 * @param params - The parameters for the course, including the courseId.
 * @returns A Promise that resolves to the JSX element representing the layout.
 */
export default async function AdminCourseEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        courseId: string,
    },
}): Promise<React.JSX.Element> {

    /**
     * Fetches the course data from the server.
     * 
     * @returns {Promise<Course[]>} A promise that resolves to an array of Course objects.
     */
    const courses: Course[] = await getData("courses") as Course[];

    /**
     * Retrieves the course data from the server.
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Promise<Course>} - A promise that resolves to the course data.
     */
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