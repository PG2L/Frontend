"use client";

import React, { FC, useContext } from 'react';
import styles from './CourseButton.module.css';
import { UserContext } from '@/_contexts/UserProvider';
import { CourseContext } from '@/_contexts/CourseProvider';
import { Button } from '@/_components/ui/button';
import Link from 'next/link';
import { addCourseToUser } from '@/_lib/courses';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface CourseButtonProps {
    className?: string;
}

/**
 * Renders a button component for a course, based on the user's progress and completion status.
 *
 * @component CourseButton
 * @param {CourseButtonProps} props - The props for the CourseButton component.
 * @returns {React.JSX.Element} The rendered CourseButton component.
 */
const CourseButton: FC<CourseButtonProps> = ({
    className,
}: CourseButtonProps): React.JSX.Element | false => {

    /**
     * Represents the current user.
     */
    const user: User = useContext(UserContext) as User;

    /**
     * Represents the current course.
     */
    const course: Course = useContext(CourseContext) as Course;

    /**
     * Represents the router instance used in the component.
     */
    const router: AppRouterInstance = useRouter();

    /**
     * Navigates to the first lesson of a course.
     * @returns A Promise that resolves when the navigation is complete.
     */
    const navigateToFirstLesson: () => Promise<void> = async (): Promise<void> => {
        router.push(`/courses/${course.id}/${course.lessons[0].id}`);
        router.refresh();
    };

    /**
     * Finds the user's course based on the course ID.
     * @param user - The user object containing the courses.
     * @param course - The course object to search for.
     * @returns The user's course if found, otherwise undefined.
     */
    const userCourse: UserCourse | undefined = user.courses.find((courseItem: UserCourse): boolean => courseItem.course.id === course.id);

    return (

        userCourse && userCourse.completion_status === "in-progress" ?
            <Link href={ `/courses/${course.id}/${course.lessons[userCourse.progress].id}` } className={ `flex justify-end ${className}` }>
                <Button className="w-full">Continue</Button>
            </Link>
            :
            !userCourse &&
            <Button className={ `w-full ${className}` } onClick={ async (): Promise<void> => {
                await addCourseToUser(course.id, user.id);
                navigateToFirstLesson();
            } }>
                Start course
            </Button>

    );
};

export default CourseButton;;
