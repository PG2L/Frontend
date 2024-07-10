import React from 'react';

/**
 * Renders the layout for creating a new course.
 * 
 * @param children - The content to be rendered inside the layout.
 * @returns A Promise that resolves to the JSX element representing the layout.
 */
export default async function NewCourseLayout({
    children,
}: {
    children: React.ReactNode,
}): Promise<React.JSX.Element> {

    return (

        <div className="grid grid-cols-1 w-full">
            <h1 className="text-lg">Create a new course</h1>
            { children }
        </div>

    );
}