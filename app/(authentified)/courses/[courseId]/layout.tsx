import React, { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardHeader } from '../../../_components/ui/card';
import { Badge } from '../../../_components/ui/badge';
import { Skeleton } from '../../../_components/ui/skeleton';
import CourseContentMenu from '../../../_components/CourseContentMenu/CourseContentMenu';
import { Separator } from '../../../_components/ui/separator';
import { getData } from '../../../_lib/data';

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

    const data = await getData("course", params.courseId) as Course;

    return (
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
                                { Array.from({ length: 6 }).map((_: unknown, index: number): React.JSX.Element => (
                                    <Skeleton key={ index } className="h-12 w-full" />
                                )) }
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
                        <Card className="h-fit">
                            <Link href={ `/courses/${params.courseId}` }>
                                <CardHeader className="flex justify-center items-center gap-4 rounded outline outline-1 outline-primary hover:shadow-secondary hover:scale-[1.01] h-fit">
                                    <Suspense fallback={
                                        <Skeleton className="w-full h-6" />
                                    }>
                                        <h1 className="font-medium text-center">{ data['title'] }</h1>
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
                                            { data.language && data.language.name && <Badge variant={ data.language.name.toLowerCase() }>{ data.language.name }</Badge> }
                                            { data.difficulty && <Badge variant={ data.difficulty.toLowerCase() }>{ data.difficulty }</Badge> }
                                            <Badge>{ data.points_gain } points</Badge>
                                            <Badge>+{ data.exp_gain } xp</Badge>
                                        </div>
                                    </Suspense>
                                </CardHeader>
                            </Link>
                        </Card>
                        <CourseContentMenu courseContent={ data } />
                    </div>
                </div>
            </Suspense>
            <div className="md:w-3/4 grid gap-4 lg:gap-6">
                { children }
            </div>
        </div>
    );
}
