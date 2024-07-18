import React, { Suspense } from 'react';
import AdminHeader from '@/_components/AdminHeader/AdminHeader';
import { getData } from '@/_lib/data';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Renders the layout for editing an admin lesson.
 * 
 * @param children - The content to be rendered within the layout.
 * @param params - The parameters for the lesson, including the lessonId.
 * @returns A Promise that resolves to the JSX element representing the layout.
 */
export default async function AdminLessonEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        lessonId: string,
    },
}): Promise<React.JSX.Element> {

    /**
     * Fetches the lessons data from the server.
     * 
     * @returns {Promise<Lesson[]>} A promise that resolves to an array of Lesson objects.
     */
    const lessons: Lesson[] = await getData("lessons") as Lesson[];


    /**
     * Retrieves the lesson data from the server.
     * 
     * @param {string} resource - The resource to fetch data from.
     * @param {string} lessonId - The ID of the lesson to retrieve.
     * @returns {Promise<Lesson>} - A promise that resolves to the lesson data.
     */
    const lesson: Lesson = await getData("lessons", Number(params.lessonId)) as Lesson;

    return (

        <div className="w-full">
            <Suspense fallback={
                <div className="md:flex grid items-center gap-6">
                    <Skeleton className="md:w-1/2 w-2/3 h-10" />
                    <Skeleton className="md:w-1/2 h-10" />
                </div>
            }>
                <AdminHeader item={ lesson } content={ lessons } />
            </Suspense>
            { children }
        </div>

    );
}