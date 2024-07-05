"use client";

import React, { FC, Suspense, use } from 'react';
import styles from './CourseContentMenu.module.css';
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
}): React.JSX.Element => {

    const params = useParams();
    const isFirstLesson: boolean = parseInt(params.lessonId) === courseContent.lessons[0].id;
    const isLastLesson: boolean = parseInt(params.lessonId) === courseContent.lessons[courseContent.lessons.length - 1].id;

    return (
        <div className="grid h-full gap-6">
            <nav className="px-6 mt-6 top-6 h-fit grid gap-6">
                <Separator />
                <ul className="grid gap-2">
                    { courseContent.lessons && courseContent.lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                        <Suspense key={ index } fallback={
                            <Skeleton className="w-full h-6"></Skeleton>
                        }>
                            <li>
                                <Link href={ `/courses/${params.courseId}/${lesson.id}` }>
                                    <Button variant="ghost" className={ `text-muted-foreground w-full text-start font-normal text-wrap ${(lesson.id == params.lessonId) && "active"}` }>
                                        <h2 className="w-full">{ index + 1 } .  { lesson.title }</h2>
                                    </Button>
                                </Link>
                            </li>
                        </Suspense>
                    )) }
                </ul>
                <Separator />
                { params.hasOwnProperty('lessonId') ?
                    <div className={ `flex gap-6 justify-between ${isFirstLesson && "!justify-end"}` }>
                        { !isFirstLesson &&
                            <Link href={ `/courses/${params.courseId}/${params.lessonId - 1}` } className="justify-self-start">
                                <Button variant="ghost">
                                    <icons.ChevronsLeft strokeWidth={ 1 } />
                                </Button>
                            </Link>
                        }
                        { !isLastLesson &&
                            <Link href={ `/courses/${params.courseId}/${parseInt(params.lessonId) + 1}` } className="justify-self-end">
                                <Button variant="ghost">
                                    <icons.ChevronsRight strokeWidth={ 1 } />
                                </Button>
                            </Link>
                        }
                    </div>
                    :
                    <Link href={ `/courses/${params.courseId}/${courseContent.lessons[0].id}` } className="justify-self-center w-1/2">
                        <Button className="w-full">
                            Start Course
                        </Button>
                    </Link>
                }
            </nav>
        </div>
    );
};

export default CourseContentMenu;