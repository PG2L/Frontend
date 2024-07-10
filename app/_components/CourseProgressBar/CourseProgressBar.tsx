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
                {
                    course.lessons.map((_: Lesson, index: number): React.JSX.Element => ( // Mapping over course.lessons to create a div for each lesson
                        <div
                            key={ index }
                            className={
                                `h-3 w-1/3 rounded ` +
                                `${userCourse && index < userCourse?.progress ? "bg-primary " : "bg-primary/[0.1] "}` + // Background color based on progress
                                `${userCourse && index < userCourse?.progress + 1 && "outline outline-1 outline-primary"}` // Outline for the next lesson to complete
                            }>
                        </div>
                    ))
                }
            </div>
            <p className="text-muted-foreground text-end">
                {
                    userCourse ?
                        Math.round((userCourse.progress / course.lessons_count) * 100) // If userCourse exists, calculate progress percentage
                        : '0' // Default to '0%' if userCourse does not exist
                }%
            </p>
        </div>

    );
};

export default CourseProgressBar;
