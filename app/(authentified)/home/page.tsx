import React from 'react';
import {
    ScrollArea,
    ScrollBar
} from '@/_components/ui/scroll-area';
import CourseCard from '@/_components/CourseCard/CourseCard';
import { Calendar } from '@/_components/ui/calendar';
import { getData } from '@/_lib/data';
import ResumeLesson from '@/_components/ResumeLesson/ResumeLesson';

/**
 * Renders the home page.
 * 
 * @returns A Promise that resolves to a JSX element representing the home page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    /**
     * Fetches the course data from the server.
     * 
     * @param endpoint - The endpoint to fetch the data from.
     * @returns An array of Course objects.
     */
    const courses = await getData("courses") as Course[];

    return (

        <div className="grid gap-6">
            <div className="flex justify-between items-center w-full">
                <div className="grid gap-4">
                    <p className="text-xl">Welcome back,
                        <span className="text-3xl font-medium">Nakkarst!</span>
                    </p>
                    <p>You already have completed
                        <span className="text-primary font-medium">50% of your daily goals !</span>
                    </p>
                </div>
            </div>
            <ResumeLesson />
            <div className="flex justify-between w-full gap-6">
                <div>
                    <h2 className="text-2xl">Activity</h2>
                    <Calendar mode="single" />
                </div>
            </div>
            <div className="grid">
                <h1 className="text-2xl">Suggestions</h1>
                <ScrollArea>
                    <div className="w-full flex gap-6 items-center justify-start p-6">
                        { courses.map((_: any, index: number): React.JSX.Element => ( // Map over the courses array to render a CourseCard component for each course.
                            <CourseCard key={ index } course={ courses[courses.length - index - 1] } className="min-w-72" />
                        )) }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>

    );
}