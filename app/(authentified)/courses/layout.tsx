import React, { ReactNode } from 'react';
import GlobalBreadcrumb from '../../_components/GlobalBreadcrumb/GlobalBreadcrumb';

async function getData() {
    const response = await fetch('http://localhost:8000/courses');

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
}

export default async function CoursesLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    const data = await getData();

    return (
        <div className="grid">
            <GlobalBreadcrumb courses={ data } />
            { children }
        </div>
    );
};
