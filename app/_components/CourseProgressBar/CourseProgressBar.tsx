"use client";

import React, { FC, useContext } from 'react';
import styles from './CourseProgressBar.module.css';
import { UserContext } from '../../_contexts/UserProvider';

interface CourseProgressBarProps {
    course: Course;
}

/**
 * Renders a progress bar for a course, indicating the user's progress.
 *
 * @component
 * @param {CourseProgressBarProps} props - The component props.
 * @param {Course} props.course - The course object.
 * @returns {JSX.Element} - The rendered component.
 */
const CourseProgressBar: FC<CourseProgressBarProps> = ({
    course,
}: CourseProgressBarProps): React.JSX.Element => {

    /**
     * Represents the user.
     */
    const user: User = useContext(UserContext);

    /**
     * Finds the user's course based on the course ID.
     *
     * @param {UserCourse[]} courses - The array of user courses.
     * @param {Course} course - The course to search for.
     * @returns {UserCourse | undefined} - The user's course if found, otherwise undefined.
     */
    const userCourse: UserCourse | undefined = user.courses.find((courseItem: UserCourse): boolean => courseItem.course.id === course.id);

    return (
        <div className="grid grid-cols-1">
            <div className="flex gap-2">
                { course.lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                    <div key={ index } className={ `h-3 w-1/3 rounded ${userCourse && index < userCourse?.progress ? "bg-primary" : "bg-primary/[0.1]"} ${userCourse && index < userCourse?.progress + 1 && "outline outline-1 outline-primary"}` }></div>
                )) }
            </div>
            <p className="text-muted-foreground text-end">{ userCourse ? Math.round((userCourse.progress / course.lessons_count) * 100) : '0' }%</p>
        </div>
    );
};

export default CourseProgressBar;
