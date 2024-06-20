import React, { Children, ReactNode, use } from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb/GlobalBreadcrumb';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

async function getData(id: string) {

    const response = await fetch(`http://localhost:8000/courses/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json();
}

export default async function CourseShowLayout ({ 
    children,
    params,
} : {
    children: React.ReactNode,
    params: {
        id: string,
    };
}) {

    const data = await getData(params.id);

    return (
        <>
            <div className="grid md:flex gap-4 lg:gap-6 grid-cols-1 rounded-lg mt-6">
                <div className="hidden md:grid grid-cols-1 w-1/3 gap-4 h-fit">
                    <Card>
                        <Link href={`/courses/1`}>
                            <CardHeader className="flex justify-center items-center gap-4 rounded outline outline-1 outline-primary hover:shadow-secondary hover:scale-[1.01]">
                                <h1 className="font-medium text-center">{data['title']}</h1>
                                <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                    {data.language && data.language.name && <Badge variant={data.language.name.toLowerCase()}>{data.language.name}</Badge>}
                                    {data.difficulty && <Badge variant={data.difficulty.toLowerCase()}>{data.difficulty}</Badge>}
                                    <Badge>{data.points_gain} points</Badge>
                                    <Badge>+{data.exp_gain} xp</Badge>
                                </div>
                            </CardHeader>
                        </Link>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-4">
                                {data.lessons && data.lessons.map((lesson, index) => (
                                    <Link key={index} href={`/lessons/${lesson.id}`}>
                                        <Card className={`${lesson.isFinished && "bg-secondary"} hover:shadow-secondary hover:scale-[1.01] hover:border-primary outline outline-1 outline-secondary`}>
                                            <CardHeader>
                                                <h2>{index + 1} .  {lesson.title}</h2>
                                            </CardHeader>
                                            <CardFooter>
                                                <div className="flex flex-wrap gap-1 justify-start items-center">
                                                    {/* {lesson.badges.map((badge, index) => (
                                                    <Badge key={index}>{badge}</Badge>
                                                ))} */}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:w-2/3 grid gap-4 lg:gap-6">
                    {children}
                </div>
            </div>
        </>
    )

}
