import React from 'react';
import GlobalBreadcrumb from '../../_components/GlobalBreadcrumb/GlobalBreadcrumb';
import { getData } from '../../_lib/data';
import CourseProvider from '../../_contexts/CourseProvider';

/**
 * Renders the layout for the courses page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {Promise<React.JSX.Element>} The rendered layout component.
 */
export default async function CoursesLayout({
    children,
}: {
    children: React.ReactNode,
}): Promise<React.JSX.Element> {

    const courses: Course[] = await getData("courses") as Course[];

    return (
        <div className="grid">
            <GlobalBreadcrumb courses={ courses } />
            { children }
        </div>
    );
};
