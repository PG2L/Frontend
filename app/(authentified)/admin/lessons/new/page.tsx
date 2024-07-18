import React from 'react';
import LessonForm from '@/_components/forms/LessonForm/LessonForm';
import { getData } from '@/_lib/data';

/**
 * Renders the page for creating a new lesson.
 * @returns A Promise that resolves to a JSX.Element representing the page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    /**
     * Fetches the list of courses from the server.
     * 
     * @returns {Promise<Course[]>} A promise that resolves to an array of Course objects.
     */
    const courses: Course[] = await getData('courses') as Course[];

    return <LessonForm courses={ courses } />;

}