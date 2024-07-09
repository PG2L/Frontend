"use client";

import React, { FC, useContext } from 'react';
import styles from './CourseProgressBar.module.css';
import { UserContext } from '../../_contexts/UserProvider';
import { CourseContext } from '../../_contexts/CourseProvider';

interface CourseProgressBarProps {
    lessons: Lesson[];
}

const CourseProgressBar: FC<CourseProgressBarProps> = ({
    lessons,
}): React.JSX.Element => {

    const user: User = useContext(UserContext);
    const course: Course = useContext(CourseContext);
    const userCourse: UserCourse | undefined = user.courses.find((courseItem: UserCourse): boolean => courseItem.course.id === course.id);

    return (
        <div className="grid grid-cols-1">
            <div className="flex gap-2">
                { lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                    <div key={ index } className={ `h-3 w-1/3 rounded ${userCourse && index < userCourse?.progress ? "bg-primary" : "bg-primary/[0.1]"} ${userCourse && index < userCourse?.progress + 1 && "outline outline-1 outline-primary"}` }></div>
                )) }
            </div>
            <p className="text-muted-foreground text-end">{ userCourse ? Math.round((userCourse.progress / course.lessons_count) * 100) : '0' }%</p>
        </div>
    );
};

export default CourseProgressBar;
