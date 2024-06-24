import React from 'react';
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CourseCard from '@/components/CourseCard/CourseCard';
import { Calendar } from '@/components/ui/calendar';


async function getCourses() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch courses')
    }

    return response.json()
}

export default async function Page() {
    const courses = await getCourses();

    return (
        <>
            <div className="flex justify-between gap-6 w-3/5">
                <div className="grid gap-6">
                    <div className="grid">
                        <h1 className="text-lg">Resume course...</h1>
                        <ScrollArea>
                            <div className="w-full mt-2 p-4 flex gap-6 items-center justify-start">
                                {courses.map((course: any, index: number) => (
                                    <CourseCard key={index} course={course} className="min-w-72" />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                    <Calendar mode="single" />
                    <div className="grid">
                        <h1 className="text-lg">Suggestions</h1>
                        <ScrollArea>
                            <div className="w-full mt-2 flex gap-6 items-center justify-start p-4">
                                {courses.map((course: any, index: number) => (
                                    <CourseCard key={index} course={courses[courses.length - index - 1]} className="min-w-72" />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <ProfileSidebar />
        </>
    );
}