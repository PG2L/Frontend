import React from 'react';
import {
    ScrollArea,
    ScrollBar
} from '@/_components/ui/scroll-area';
import CourseCard from '@/_components/CourseCard/CourseCard';
import { Calendar } from '@/_components/ui/calendar';
import { getData } from '@/_lib/data';
import ResumeLesson from '@/_components/ResumeLesson/ResumeLesson';
import LastAchievements from '@/_components/LastAchievements/LastAchievements';
import { Card, CardContent, CardHeader } from '@/_components/ui/card';
import { ActivityChart } from '@/_components/ActivityChart/ActivityChart';
import { LevelDisplayer } from '@/_components/LevelDisplayer/LevelDisplayer';

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

        <div className="space-y-6">
            <div className="grid gap-4 [&_p>span]:font-medium">
                <p className="text-xl">Welcome back, <span className="text-3xl"> Nakkarst!</span></p>
                <p>You already have completed <span className="text-primary"> 50% of your daily goals !</span></p>
            </div>
            <ResumeLesson />
            <div className="flex flex-wrap w-full gap-6">
                <Card className="grow min-w-[450px]">
                    <CardHeader>
                        <h2 className="text-2xl mb-2">Activity</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6 items-center">
                            <Calendar mode="single" />
                            <ActivityChart />
                        </div>
                    </CardContent>
                </Card>
                <Card className="grow min-w-[250px]">
                    <CardHeader>
                        <h2 className="text-2xl mb-2">Progression</h2>
                    </CardHeader>
                    <LevelDisplayer />
                </Card>
                <Card className="min-w-[800px] grow">
                    <CardHeader>
                        <h2 className="text-2xl mb-2">Last earned achievements</h2>
                    </CardHeader>
                    <CardContent>
                        <LastAchievements />
                    </CardContent>
                </Card>
            </div >
            <div className="grid">
                <h1 className="text-2xl">Suggestions</h1>
                <ScrollArea>
                    <div className="w-full flex gap-6 items-center justify-start p-6">
                        { courses.map((_: Course, index: number): React.JSX.Element => (
                            <CourseCard key={ index } course={ courses[courses.length - index - 1] } className="w-[300px]" />
                        )) }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>

    );
}