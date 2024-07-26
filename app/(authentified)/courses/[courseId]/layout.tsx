import React, { Suspense } from 'react';
import Link from 'next/link';
import {
    Card,
    CardHeader
} from '@/_components/ui/card';
import { Badge } from '@/_components/ui/badge';
import CourseContentMenu from '@/_components/CourseContentMenu/CourseContentMenu';
import { getData } from '@/_lib/data';
import CourseProvider from '@/_contexts/CourseProvider';
import GlobalBreadcrumb from '@/_components/GlobalBreadcrumb/GlobalBreadcrumb';
import { Separator } from '@/_components/ui/separator';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Renders the layout for the course show page.
 *
 * @param children - The child components to render.
 * @param params - The parameters for the course and lesson.
 * @returns A Promise that resolves to the JSX element representing the course show layout.
 */
export default async function CourseShowLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        courseId: string,
        lessonId: string,
    };
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the course data from the server.
     * 
     * @param {string} endpoint - The API endpoint to fetch the data from.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Promise<Course>} - A promise that resolves to the course data.
     */
    const course: Course = await getData("courses", Number(params.courseId)) as Course;

    /**
     * Retrieves the course data from the server.
     * 
     * @param {string} endpoint - The API endpoint to fetch the data from.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Promise<Course>} - A promise that resolves to the course data.
     */
    const courses: Course[] = await getData("courses") as Course[];

    return (

        <CourseProvider course={ course }>
            <div className="pt-24 md:pt-6">
                <GlobalBreadcrumb courses={ courses } />
                <div className="grid md:flex gap-4 lg:gap-6 grid-cols-1 rounded-lg mt-6">
                    <div className="hidden md:flex flex-col w-1/4 min-w-[250px]">
                        <div className="sticky top-6 h-fit">
                            <Suspense fallback={
                                <>
                                    <Card className="h-fit border-primary border">
                                        <CardHeader className="flex justify-center items-center rounded h-fit">
                                            <Skeleton className="h-24 w-full" />
                                        </CardHeader>
                                    </Card>
                                    <div className="px-6 mt-6 top-6 space-y-6 w-full">
                                        <Separator />
                                        <ul className="space-y-2 px-4">
                                            { Array.from({ length: 7 }).map((_: unknown, index: number): React.JSX.Element => (
                                                <li key={ index }>
                                                    <Skeleton className="h-10 w-full" />
                                                </li>
                                            )) }
                                        </ul>
                                    </div>
                                </>
                            }>
                                <CourseContentMenu course={ course } />
                            </Suspense>
                        </div>
                    </div>
                    <div className="md:w-3/4">
                        { children }
                    </div>
                </div>
            </div>
        </CourseProvider>

    );
}
