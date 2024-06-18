import React, { ReactNode } from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb/GlobalBreadcrumb';

interface LayoutProps {
    children: ReactNode;
}

const CourseLayout = ({ children }) => (
    <>
        <div className="flex w-full justify-between items-center">
            <GlobalBreadcrumb />
            <Link href="/courses/new">
                <Button variant="secondary">
                    Create a course
                </Button>
            </Link>
        </div>
        {children}
    </>
);

export default CourseLayout;