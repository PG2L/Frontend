"use client";

import React, { FC, useContext } from 'react';
import styles from './ResumeLesson.module.css';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { UserContext } from '../../_contexts/UserProvider';
import LessonCard from '../LessonCard/LessonCard';

interface ResumeLessonProps { }

/**
 * Renders the ResumeLesson component.
 *
 * @component
 * @returns {JSX.Element} The rendered ResumeLesson component.
 */
const ResumeLesson: FC<ResumeLessonProps> = (): React.JSX.Element => {

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = useContext(UserContext);

    /**
     * Sorts the user's courses based on their progress in descending order.
     *
     * @param {UserCourse[]} userCourses - The array of user courses to be sorted.
     * @returns {UserCourse[]} - The sorted array of user courses.
     */
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
