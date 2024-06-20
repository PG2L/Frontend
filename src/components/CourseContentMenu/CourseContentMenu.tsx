"use client";

import React, { FC, Suspense, use } from 'react';
import styles from './CourseContentMenu.module.css';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';

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
        <div className="p-6 border-2">
            <div className="grid gap-6">
                {courseContent.lessons && courseContent.lessons.map((lesson, index) => {
                    return <Link key={index} href={`/courses/${params.courseId}/${lesson.id}`}>
                        <Button variant="outline" className={`${(lesson.id == params.lessonId) && "scale-[1.01] hover:!scale-[1.02] border-primary"} w-full !text-left text-wrap border-0 hover:shadow-secondary hover:scale-[1.01] hover:border-primary py-6`} size="lg">
                                <Suspense fallback={
                                    <Skeleton className="w-full h-6"></Skeleton>
                                }>
                                    <h2 className="w-full">{index + 1} .  {lesson.title}</h2>
                                </Suspense>
                        </Button>
                    </Link>
                })}
            </div>
        </div>
    )
};

export default CourseContentMenu;
