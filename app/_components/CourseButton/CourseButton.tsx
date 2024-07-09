"use client";

import React, { FC, useContext } from 'react';
import styles from './CourseButton.module.css';
import { UserContext } from '../../_contexts/UserProvider';
import { CourseContext } from '../../_contexts/CourseProvider';
import { Button } from '../ui/button';
import Link from 'next/link';
import { addCourseToUser } from '../../_lib/courses';
import { useRouter } from 'next/navigation';

interface CourseButtonProps { }

function StartButton(): React.JSX.Element {

    const user: User = useContext(UserContext);
    const course: Course = useContext(CourseContext);
    const router = useRouter();

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
const CourseButton: FC<CourseButtonProps> = (): React.JSX.Element => {

    const user: User = useContext(UserContext);
    const course: Course = useContext(CourseContext);
    const userCourse: UserCourse | undefined = user.courses.find((courseItem: UserCourse): boolean => courseItem.course.id === course.id);

    return (
        <>
            { userCourse && userCourse.completion_status === "in-progress" ?
                <Link href={ `/courses/${course.id}/${course.lessons[userCourse.progress].id}` } className="w-full flex justify-end">
                    <Button className="w-full">Continue</Button>
                </Link>
                :
                !userCourse ?
                    <StartButton />
                    :
                    <Button className="w-1/2" disabled>
                        Completed
                    </Button>
            }
        </>
    );
};

export default CourseButton;
