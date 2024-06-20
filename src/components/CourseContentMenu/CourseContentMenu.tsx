"use client";

import React, { FC, Suspense, use } from 'react';
import styles from './CourseContentMenu.module.css';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface CourseContentMenuProps {
    courseContent: any,
}

const CourseContentMenu: FC<CourseContentMenuProps> = ({ 
    courseContent,
}: {
    courseContent: any,
}) => {

    const params = useParams();

    return (
        <>
            <nav className="p-6">
                <Separator />
                <ul className="grid gap-4 mt-6">
                    {courseContent.lessons && courseContent.lessons.map((lesson, index) => {
                        return <li key={index}>
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
                    })}
                </ul>
            </nav>
        </>
    )
};

export default CourseContentMenu;
