import React, { Suspense } from 'react';
import Link from 'next/link';
import {
    Card,
    CardHeader
} from '../../../_components/ui/card';
import { Badge } from '../../../_components/ui/badge';
import { Skeleton } from '../../../_components/ui/skeleton';
import CourseContentMenu from '../../../_components/CourseContentMenu/CourseContentMenu';
import { Separator } from '../../../_components/ui/separator';
import { getData } from '../../../_lib/data';
import CourseProvider from '../../../_contexts/CourseProvider';

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

    return (

        <CourseProvider course={ course }>
            <div className="grid md:flex gap-4 lg:gap-6 grid-cols-1 rounded-lg mt-6">
                <Suspense fallback={
                    <div className="hidden md:flex flex-col w-1/4">
                        <div className="sticky top-6 h-fit">
                            <Card className="h-fit">
                                <CardHeader className="flex justify-center items-center rounded gap-4 outline outline-1 outline-primary hover:shadow-secondary hover:scale-[1.01] h-fit">
                                    <Skeleton className="w-1/2 h-8" />
                                    <Skeleton className="w-2/3 h-8" />
                                </CardHeader>
                            </Card>
                            <div className="p-4">
                                <Separator />
                                <ul className="grid gap-2 p-6">
                                    {
                                        Array.from({ length: 6 }).map((_: unknown, index: number): React.JSX.Element => ( // Create an array of 6 elements and map over it to render a skeleton element for each.
                                            <Skeleton key={ index } className="h-12 w-full" />
                                        ))
                                    }
                                </ul>
                                <Separator />
                            </div>
                            <div className="w-full">
                                <Skeleton className="h-10 w-48 mx-auto" />
                            </div>
                        </div>
                    </div>
                }>
                    <div className="hidden md:flex flex-col w-1/4 min-w-[250px]">
                        <div className="sticky top-6 h-fit">
                            <Card className="h-fit border-primary border hover:scale-[1.01]">
                                <Link
                                    href={ `/courses/${params.courseId}` } // Link to the course page
                                >
                                    <CardHeader className="flex justify-center items-center gap-4 rounded h-fit">
                                        <Suspense fallback={
                                            <Skeleton className="w-full h-6" />
                                        }>
                                            <h1 className="font-medium text-center">{ course['title'] }</h1>
                                        </Suspense>
                                        <Suspense fallback={
                                            <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                                <Skeleton className="h-5 w-14" />
                                                <Skeleton className="h-5 w-24" />
                                                <Skeleton className="h-5 w-20" />
                                                <Skeleton className="h-5 w-16" />
                                            </div>
                                        }>
                                            <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                                {
                                                    course.language.name && // Renders a badge for the language if it exists
                                                    <Badge variant={ course.language.name as "Javascript" | "C#" | "C++" | "HTML/CSS" | "Ruby" | "Go" | "Php" | "Java" | "Mysql" | "Python" }>
                                                        { course.language.name }
                                                    </Badge>
                                                }
                                                {
                                                    course.difficulty && // Renders a badge for the difficulty level if it exists
                                                    <Badge variant={ course.difficulty }>
                                                        { course.difficulty }
                                                    </Badge>
                                                }
                                                <Badge>{ course.points_gain } points</Badge>
                                                <Badge>+{ course.exp_gain } xp</Badge>
                                            </div>
                                        </Suspense>
                                    </CardHeader>
                                </Link>
                            </Card>
                            <CourseContentMenu course={ course } />
                        </div>
                    </div>
                </Suspense>
                <div className="md:w-3/4 grid gap-4 lg:gap-6">
                    { children }
                </div>
            </div>
        </CourseProvider>

    );
}
