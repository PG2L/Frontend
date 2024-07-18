import React from 'react';

/**
 * Renders the layout for creating a new assessment.
 * 
 * @param children - The content to be rendered inside the layout.
 * @returns A Promise that resolves to the JSX element representing the layout.
 */
export default async function NewAssessmentLayout({
    children,
}: {
    children: React.ReactNode,
}): Promise<React.JSX.Element> {

    return (

        <div className="w-full">
            <h1 className="text-lg">Create a new assessment</h1>
            { children }
        </div>

    );
}