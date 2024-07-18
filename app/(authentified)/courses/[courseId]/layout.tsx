import React from 'react';
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
            <GlobalBreadcrumb courses={ courses } />
            <div className="grid md:flex gap-4 lg:gap-6 grid-cols-1 rounded-lg mt-6">
                <div className="hidden md:flex flex-col w-1/4 min-w-[250px]">
                    <div className="sticky top-6 h-fit">
                        <Card className="h-fit border-primary border hover:scale-[1.01]">
                            <Link href={ `/courses/${params.courseId}` }>
                                <CardHeader className="flex justify-center items-center gap-4 rounded h-fit">
                                    <h1 className="font-medium text-center">{ course['title'] }</h1>
                                    <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                        { course.language.name && // Renders a badge for the language if it exists
                                            <Badge variant={ course.language.name as "Javascript" | "C#" | "C++" | "HTML/CSS" | "Ruby" | "Go" | "Php" | "Java" | "Mysql" | "Python" }>
                                                { course.language.name }
                                            </Badge> }
                                        { course.difficulty && // Renders a badge for the difficulty level if it exists
                                            <Badge variant={ course.difficulty }>
                                                { course.difficulty }
                                            </Badge> }
                                        <Badge>{ course.points_gain } points</Badge>
                                        <Badge>+{ course.exp_gain } xp</Badge>
                                    </div>
                                </CardHeader>
                            </Link>
                        </Card>
                        <CourseContentMenu course={ course } />
                    </div>
                </div>
                <div className="md:w-3/4 space-y-4 lg:space-y-6">
                    { children }
                </div>
            </div>
        </CourseProvider>

    );
}
