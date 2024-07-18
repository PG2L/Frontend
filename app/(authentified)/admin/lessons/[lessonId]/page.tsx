import React, { Suspense } from 'react';
import LessonForm from '@/_components/forms/LessonForm/LessonForm';
import { getData } from '@/_lib/data';
import { Skeleton } from '@/_components/ui/skeleton';
import AdminHeader from '@/_components/AdminHeader/AdminHeader';

/**
 * Renders the page component for a specific lesson.
 * @param params - The parameters for the page component.
 * @param params.lessonId - The ID of the lesson.
 * @returns A Promise that resolves to a JSX element representing the page component.
 */
export default async function Page({
    params,
}: {
    params: {
        lessonId: string,
    },
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the lesson data from the server.
     *
     * @param {string} endpoint - The endpoint to fetch data from.
     * @param {string} lessonId - The ID of the lesson to retrieve.
     * @returns {Promise<Lesson>} - A promise that resolves to the lesson data.
     */
    const lesson: Lesson = await getData("lessons", Number(params.lessonId)) as Lesson;


    /**
     * Retrieves the list of courses from the server.
     * 
     * @returns {Promise<Course[]>} A promise that resolves to an array of Course objects.
     */
    const courses = await getData("courses") as Course[];

    /**
     * Retrieves the list of lessons from the server.
     * 
     * @returns {Promise<Lesson[]>} A promise that resolves to an array of Lesson objects.
     */
    const lessons = await getData("lessons") as Lesson[];

    return (

        <div className="w-full">
            <AdminHeader item={ lesson } content={ lessons } />
            <LessonForm lesson={ lesson } courses={ courses } />
        </div>

    );
}