import React, { Children, ReactNode, Suspense, use } from 'react'
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import CourseContentMenu from '@/components/CourseContentMenu/CourseContentMenu';

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
        courseId: string,
        lessonId: string,
    };
}) {
    
    const data = await getData(params.courseId);

    return (
        <>
            <div className="grid md:flex gap-4 lg:gap-6 grid-cols-1 rounded-lg mt-6">
                <div className="hidden md:grid grid-cols-1 w-1/3 gap-4 lg:top-24 h-fit lg:sticky">
                    <Card>
                        <Link href={`/courses/${params.courseId}`}>
                            <CardHeader className="flex justify-center items-center gap-4 rounded outline outline-1 outline-primary hover:shadow-secondary hover:scale-[1.01]">
                                <Suspense fallback={
                                    <Skeleton className="w-full h-6" />
                                }>
                                    <h1 className="font-medium text-center">{data['title']}</h1>
                                </Suspense>
                                <Suspense fallback={
                                    <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                        <Skeleton className="h-5 w-14"/>
                                        <Skeleton className="h-5 w-24"/>
                                        <Skeleton className="h-5 w-20"/>
                                        <Skeleton className="h-5 w-16"/>
                                    </div>
                                }>
                                    <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                        {data.language && data.language.name && <Badge variant={data.language.name.toLowerCase()}>{data.language.name}</Badge>}
                                        {data.difficulty && <Badge variant={data.difficulty.toLowerCase()}>{data.difficulty}</Badge>}
                                        <Badge>{data.points_gain} points</Badge>
                                        <Badge>+{data.exp_gain} xp</Badge>
                                    </div>
                                </Suspense>
                            </CardHeader>
                        </Link>
                    </Card>
                    <CourseContentMenu courseContent={data} />
                </div>
                <div className="md:w-2/3 grid gap-4 lg:gap-6">
                    {children}
                </div>
            </div>
        </>
    )

}
