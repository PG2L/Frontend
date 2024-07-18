import React from 'react';
import QuestionForm from '@/_components/forms/QuestionForm/QuestionForm';
import { getData } from '@/_lib/data';

/**
 * Renders the page for creating a new question.
 * 
 * @returns A Promise that resolves to a JSX.Element representing the page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    /**
     * Fetches the assessments data from the server.
     * 
     * @returns {Promise<Assessment[]>} A promise that resolves to an array of Assessment objects.
     */
    const assessments: Assessment[] = await getData("assessments") as Assessment[];

    return <QuestionForm assessments={ assessments } />;

}