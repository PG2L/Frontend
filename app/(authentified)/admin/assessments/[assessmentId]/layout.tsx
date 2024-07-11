import React, { Suspense } from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { Skeleton } from '../../../../_components/ui/skeleton';
import { getData } from '../../../../_lib/data';

/**
 * Renders the layout for editing an admin assessment.
 * 
 * @param children - The child components to render within the layout.
 * @param params - The parameters for the assessment, including the assessmentId.
 * @returns A Promise that resolves to the JSX element representing the layout.
 */
export default async function AdminAssessmentEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        assessmentId: string,
    },
}): Promise<React.JSX.Element> {

    /**
     * Fetches the assessment data from the server.
     * 
     * @returns {Promise<Assessment[]>} A promise that resolves to an array of Assessment objects.
     */
    const assessments: Assessment[] = await getData("assessments") as Assessment[];

    /**
     * Retrieves the assessment data from the server.
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} assessmentId - The ID of the assessment to retrieve.
     * @returns {Promise<Assessment>} - A promise that resolves to the assessment data.
     */
    const assessment: Assessment = await getData("assessments", Number(params.assessmentId)) as Assessment;

    return (

        <div className="grid w-full grid-cols-1">
            <Suspense fallback={
                <div className="md:flex grid items-center gap-6">
                    <Skeleton className="md:w-1/2 w-2/3 h-10" />
                    <Skeleton className="md:w-1/2 h-10" />
                </div>
            }>
                <AdminHeader item={ assessment } content={ assessments } />
            </Suspense>
            { children }
        </div>

    );
}