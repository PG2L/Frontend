import React, { ReactNode } from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb/GlobalBreadcrumb';

async function getData() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function CoursesLayout ({ 
    children,
} : {
    children: React.ReactNode,
}) {
    
    const data = await getData();
    
    return (
        <>
            <div className="flex w-full justify-between items-center">
                <GlobalBreadcrumb courses={data}/>
            </div>
            {children}
        </>
    )
};
