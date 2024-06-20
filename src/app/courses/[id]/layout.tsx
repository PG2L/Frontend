import React, { ReactNode, use } from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb/GlobalBreadcrumb';

export default function CourseShowLayout ({ 
    children
} : {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="grid md:flex gap-4 lg:gap-6 grid-cols-1 rounded-lg mt-6">
                <div className="hidden md:grid grid-cols-1 w-1/3 gap-4 h-fit">
                    {children}
                </div>
            </div>
        </>
    )

}
