import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CourseCard from '@/components/CourseCard/CourseCard';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import LanguagesPieChart from '@/components/LanguagesPieChart/LanguagesPieChart';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';

async function getCourses() {
    const response = await fetch('http://localhost:8000/courses');

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }

    return response.json();
}

export default async function Page() {
    const courses = await getCourses();

    return (
        <>
            <div className="flex justify-between gap-6 w-full">
                <div className="grid gap-6">
                    <div className="flex justify-between items-center w-full">
                        <div className="grid gap-4">
                            <span className="text-xl">Welcome back, <span className="text-3xl font-medium">Nakkarst!</span></span>
                            <p>You already have completed <span className="text-primary font-medium">50% of your daily goals !</span></p>
                        </div>
                    </div>
                    <div className="grid">
                        <h1 className="text-2xl">Resume</h1>
                        <ScrollArea>
                            <div className="w-full p-6 flex gap-6 items-center justify-start">
                                { courses.map((course: any, index: number) => (
                                    <CourseCard key={ index } course={ course } className="min-w-72" />
                                )) }
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                    <div className="flex justify-between w-full gap-6">
                        <div>
                            <h2 className="text-2xl">Activity</h2>
                            <Calendar mode="single" />
                        </div>
                        <div className="w-full">
                            <h3 className="text-2xl">Level</h3>
                            <Card className="mt-4 w-40">
                                <CardHeader>
                                    <div className="mx-autop-6 border border-primary bg-secondary border-t-border rounded-full flex items-center justify-center">
                                        <Avatar className="text-3xl">68</Avatar>
                                    </div>
                                </CardHeader>
                                <CardFooter>
                                    <div className="flex justify-between items-center w-full gap-2 text-muted-foreground">
                                        68
                                        <Progress value={ 50 } />
                                        69
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                        <LanguagesPieChart />
                    </div>
                    <div className="grid">
                        <h1 className="text-2xl">Suggestions</h1>
                        <ScrollArea>
                            <div className="w-full flex gap-6 items-center justify-start p-6">
                                { courses.map((course: any, index: number) => (
                                    <CourseCard key={ index } course={ courses[courses.length - index - 1] } className="min-w-72" />
                                )) }
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>
    );
}