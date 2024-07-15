import React, { Suspense } from 'react';
import AdminHeader from '@/_components/AdminHeader/AdminHeader';
import { Skeleton } from '@/_components/ui/skeleton';
import { getData } from '@/_lib/data';

/**
 * Renders the layout for editing an admin question.
 * 
 * @param children - The child components to render within the layout.
 * @param params - The parameters for the question, including the questionId.
 * @returns A Promise that resolves to the JSX element representing the layout.
 */
export default async function AdminQuestionEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        questionId: string,
    },
}): Promise<React.JSX.Element> {

    /**
     * Fetches the question data from the server.
     * 
     * @returns {Promise<Question[]>} A promise that resolves to an array of Question objects.
     */
    const questions: Question[] = await getData("questions") as Question[];

    /**
     * Retrieves the question data from the server.
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} questionId - The ID of the question to retrieve.
     * @returns {Promise<Question>} - A promise that resolves to the question data.
     */
    const question: Question = await getData("questions", Number(params.questionId)) as Question;

    return (

        <div className="grid w-full grid-cols-1">
            <Suspense fallback={
                <div className="md:flex grid items-center gap-6">
                    <Skeleton className="md:w-1/2 w-2/3 h-10" />
                    <Skeleton className="md:w-1/2 h-10" />
                </div>
            }>
                <AdminHeader item={ question } content={ questions } />
            </Suspense>
            { children }
        </div>

    );
}