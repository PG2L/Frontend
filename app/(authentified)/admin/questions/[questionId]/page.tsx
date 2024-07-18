import React, { Suspense } from 'react';
import QuestionForm from '@/_components/forms/QuestionForm/QuestionForm';
import { getData } from '@/_lib/data';
import { Skeleton } from '@/_components/ui/skeleton';
import AdminHeader from '@/_components/AdminHeader/AdminHeader';

/**
 * Renders the page component for a specific question.
 * 
 * @param params - The parameters for the page component.
 * @param params.questionId - The ID of the question.
 * @returns A Promise that resolves to the JSX element representing the page component.
 */
export default async function Page({
    params,
}: {
    params: {
        questionId: string,
    };
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the question data from the server.
     *
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} questionId - The ID of the question to retrieve.
     * @returns {Promise<Question>} - A promise that resolves to the question data.
     */
    const question: Question = await getData("questions", Number(params.questionId)) as Question;

    /**
     * Fetches the list of assessments from the server.
     * 
     * @returns {Promise<Assessment>} A promise that resolves to the list of assessments.
     */
    const assessments: Assessment[] = await getData("assessments") as Assessment[];

    /**
     * Fetches the list of questions from the server.
     * 
     * @returns {Promise<Question>} A promise that resolves to the list of questions.
     */
    const questions: Question[] = await getData("questions") as Question[];

    return (

        <div className="w-full">
            <AdminHeader item={ question } content={ questions } />
            <QuestionForm question={ question } assessments={ assessments } />
        </div>

    );
}