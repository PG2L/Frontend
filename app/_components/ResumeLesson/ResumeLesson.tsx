"use client";

import React, { FC, useContext } from 'react';
import styles from './ResumeLesson.module.css';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { UserContext } from '../../_contexts/UserProvider';
import LessonCard from '../LessonCard/LessonCard';

interface ResumeLessonProps { }

const ResumeLesson: FC<ResumeLessonProps> = (): React.JSX.Element => {

    const user: User = useContext(UserContext);
    const userCourses: UserCourse[] = user.courses.sort((a: UserCourse, b: UserCourse): number => b.progress - a.progress);

    return (
        <div className="grid">
            <h1 className="text-2xl">Resume</h1>
            <ScrollArea>
                <div className="w-full p-6 flex gap-6 items-center justify-start">
                    { userCourses.map((userCourse: any, index: number): React.JSX.Element => (
                        <LessonCard key={ index } className="min-w-72" userCourse={ userCourse } />
                    )) }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
};

export default ResumeLesson;
