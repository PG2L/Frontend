import React, { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import * as icons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';


async function getData() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Page() {
    const data = await getData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between py-6 gap-4 lg:gap-6 w-full bg-background">
            <Suspense fallback={Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="w-full rounded-lg h-72" />
            ))}>
                {data.map((course: [], index: number) => (
                    <Link key={index} href={`/courses/${index + 1}`} >
                        <Card className={`p-2 sm:p-4 border w-full grid gap-2 sm:gap-4 rounded-lg hover:border-primary hover:scale-[1.01]`}>
                            <CardHeader className="grid p-1">
                                <div className={`h-32 rounded flex justify-center items-center bg-secondary`}>
                                </div>
                                <div className="flex justify-between gap-1">
                                    {Array.from({ length: course.lessons.length }).map((_, index) => (
                                        <div key={index} className={`w-full h-3 rounded mt-1 bg-secondary`}></div>
                                    ))}
                                </div>
                                <h3 className=" text-nowrap overflow-hidden text-ellipsis">{course.title}</h3>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-start p-1">
                                <div className="flex justify-start items-start gap-1 flex-wrap">
                                    {course.lessons_count && <Badge>{course.lessons_count} lessons</Badge>}
                                    {course.difficulty && <Badge variant={course.difficulty.toLowerCase()}>{course.difficulty}</Badge>}
                                    {course.language && <Badge variant={course.language.name.toLowerCase()}>{course.language.name}</Badge>}
                                    {/* <Badge>{course.points_gain} points</Badge>
                                    <Badge>+{course.exp_gain} XP</Badge> */}
                                </div>
                                <div className={`grid text-nowrap gap-1 text-primary`}>
                                    <div className="flex items-center justify-end gap-2">
                                        <p className={`text-foreground`}>{course.points_gain}</p>
                                        <icons.MedalIcon strokeWidth={1} />
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <p className={`text-foreground`}>{course.exp_gain}</p>
                                        <icons.StarIcon strokeWidth={1} />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </Suspense>
        </div >
    );
}