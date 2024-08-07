import React, { Suspense } from 'react';
import AssessmentForm from '@/_components/forms/AssessmentForm/AssessmentForm';
import { getData } from '@/_lib/data';
import { Skeleton } from '@/_components/ui/skeleton';
import AdminHeader from '@/_components/AdminHeader/AdminHeader';

/**
 * Renders the page component for a specific assessment.
 * 
 * @param params - The parameters for the page component.
 * @param params.assessmentId - The ID of the assessment.
 * @returns A Promise that resolves to the JSX element representing the page component.
 */
export default async function Page({
    params,
}: {
    params: {
        assessmentId: string,
    };
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the assessment data from the server.
     *
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} assessmentId - The ID of the assessment to retrieve.
     * @returns {Promise<Assessment>} - A promise that resolves to the assessment data.
     */
    const assessment: Assessment = await getData("assessments", Number(params.assessmentId)) as Assessment;

    /**
     * Fetches the list of lessons from the server.
     * 
     * @returns {Promise<Lesson>} A promise that resolves to the list of lessons.
     */
    const lessons: Lesson[] = await getData("lessons") as Lesson[];

    /**
     * Fetches the list of assessments from the server.
     * 
     * @returns {Promise<Assessment>} A promise that resolves to the list of assessments.
     */
    const assessments: Assessment[] = await getData("assessments") as Assessment[];

    return (

        <div className="w-full">
            <AdminHeader item={ assessment } content={ assessments } />
            <AssessmentForm assessment={ assessment } lessons={ lessons } />
        </div>

    );
};