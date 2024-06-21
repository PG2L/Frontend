"use client";

import React, { FC, Suspense, use } from 'react';
import styles from './CourseContentMenu.module.css';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { icons } from 'lucide-react';

interface CourseContentMenuProps {
    courseContent: any,
}

const CourseContentMenu: FC<CourseContentMenuProps> = ({ 
    courseContent,
}: {
    courseContent: any,
}) => {

    const params = useParams();
    const isFirstLesson = parseInt(params.lessonId) === courseContent.lessons[0].id;
    const isLastLesson = parseInt(params.lessonId) === courseContent.lessons[courseContent.lessons.length - 1].id;

    return (
        <>
            <div className="grid h-full">
                <nav className="p-6 lg:sticky top-20 h-fit grid gap-4">
                    <Separator />
                    <ul className="grid gap-2">
                        {courseContent.lessons && courseContent.lessons.map((lesson, index) => (
                            <li key={index}>
                                <Link key={index} href={`/courses/${params.courseId}/${lesson.id}`}>
                                    <Button variant="ghost" className={`${(lesson.id == params.lessonId) && "border-l border-r border-primary !text-foreground"} text-muted-foreground w-full text-start text-wrap`}>
                                            <Suspense fallback={
                                                <Skeleton className="w-full h-6"></Skeleton>
                                            }>
                                                <h2 className="w-full">{index + 1} .  {lesson.title}</h2>
                                            </Suspense>
                                    </Button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Separator />
                    {params.hasOwnProperty('lessonId') ?
                        <div className={`flex gap-6 justify-between ${isFirstLesson && "!justify-end"}`}>
                            {!isFirstLesson &&
                            <Link href={`/courses/${params.courseId}/${params.lessonId - 1}`} className="justify-self-start">
                                <Button variant="ghost">
                                    <icons.ChevronsLeft strokeWidth={1} />
                                </Button>
                            </Link>
                            }
                            {!isLastLesson &&
                                <Link href={`/courses/${params.courseId}/${parseInt(params.lessonId) + 1}`} className="justify-self-end">
                                    <Button variant="ghost">
                                        <icons.ChevronsRight strokeWidth={1} />
                                    </Button>
                                </Link>
                            }
                        </div>
                    :
                    <Link href={`/courses/${params.courseId}/${courseContent.lessons[0].id}`} className="justify-self-center w-1/2">
                        <Button className="w-full">
                            Start Course
                        </Button>
                    </Link>
                    }
                </nav>
            </div>
        </>
    )
};

export default CourseContentMenu;
