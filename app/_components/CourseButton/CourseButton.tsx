"use client";

import React, { FC, useContext } from 'react';
import styles from './CourseButton.module.css';
import { UserContext } from '../../_contexts/UserProvider';
import { CourseContext } from '../../_contexts/CourseProvider';
import { Button } from '../ui/button';
import Link from 'next/link';
import { addCourseToUser } from '../../_lib/courses';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface CourseButtonProps { }

/**
 * Renders a button to start a course.
 *
 * @returns The JSX element representing the start button.
 */
function StartButton(): React.JSX.Element {

    /**
     * Represents the current user.
     */
    const user: User = useContext(UserContext);

    /**
     * Represents the current course.
     */
    const course: Course = useContext(CourseContext);

    /**
     * Represents the router instance used in the component.
     */
    const router: AppRouterInstance = useRouter();

    return (
        <Button className="w-1/2 " onClick={ async (): Promise<void> => {
            await addCourseToUser(course.id, user.id);
            router.push(`/courses/${course.id}/${course.lessons[0].id}`);
        } }>
            Start course
        </Button>
    );
}

/**
 * Renders a button component for a course, based on the user's progress and completion status.
 *
 * @component CourseButton
 * @param {CourseButtonProps} props - The props for the CourseButton component.
 * @returns {React.JSX.Element} The rendered CourseButton component.
 */
const CourseButton: FC<CourseButtonProps> = ({ }: CourseButtonProps): React.JSX.Element => {

    /**
     * Represents the current user.
     */
    const user: User = useContext(UserContext);

    /**
     * Represents the current course.
     */
    const course: Course = useContext(CourseContext);

    /**
     * Finds the user's course based on the course ID.
     * @param user - The user object containing the courses.
     * @param course - The course object to search for.
     * @returns The user's course if found, otherwise undefined.
     */
    const userCourse: UserCourse | undefined = user.courses.find((courseItem: UserCourse): boolean => courseItem.course.id === course.id);

    return (

        <>
            {
                // Conditional rendering based on the user's course progress
                userCourse && userCourse.completion_status === "in-progress" ?
                    // If the course is in progress, display a "Continue" button linking to the next lesson
                    <Link
                        href={ `/courses/${course.id}/${course.lessons[userCourse.progress].id}` } // Link to the next lesson
                        className="w-full flex justify-end"
                    >
                        <Button className="w-full">Continue</Button>
                    </Link>
                    :
                    // If there is no userCourse, display the "StartButton" component
                    !userCourse ?
                        <StartButton />
                        :
                        // If the course is completed, display a disabled "Completed" button
                        <Button className="w-1/2" disabled>
                            Completed
                        </Button>
            }
        </>

    );
};

export default CourseButton;
