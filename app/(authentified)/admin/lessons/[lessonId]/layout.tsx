import React from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { getData } from '../../../../_lib/data';

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
    const lesson: Lesson = await getData("lessons", params.lessonId) as Lesson;

    return (
        <div className="grid w-full grid-cols-1">
            <AdminHeader item={ lesson } content={ lessons } />
            { children }
        </div>
    );
}