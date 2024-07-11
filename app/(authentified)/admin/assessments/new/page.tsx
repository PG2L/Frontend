import React from 'react';
import AssessmentForm from '../../../../_components/forms/AssessmentForm/AssessmentForm';
import { getData } from '../../../../_lib/data';

/**
 * Renders the page for creating a new assessment.
 * 
 * @returns A Promise that resolves to a JSX.Element representing the page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    /**
     * Fetches the lessons data from the server.
     * 
     * @returns {Promise<Lesson[]>} A promise that resolves to an array of Lesson objects.
     */
    const lessons: Lesson[] = await getData("lessons") as Lesson[];

    return (

        <AssessmentForm lessons={ lessons } />

    );
}