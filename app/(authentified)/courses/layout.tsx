import React from 'react';
import GlobalBreadcrumb from '../../_components/GlobalBreadcrumb/GlobalBreadcrumb';
import { getData } from '../../_lib/data';

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
