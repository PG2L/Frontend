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

    async function handleClick(event: any): Promise<void> {
        event.preventDefault();
        addCourseToUser(course.id, user.id);
        router.push(`/courses/${course.id}/${course.lessons[0].id}`);
    }

    return (
        <Button aria-disabled={ pending } type="submit" onClick={ handleClick }>
            Login
        </Button>
    );
}

const CourseButton: FC<CourseButtonProps> = (): React.JSX.Element => {

    const user: User = useContext(UserContext);
    const course: Course = useContext(CourseContext);
    const isCourseStarted: boolean = user.courses.find(courseItem => courseItem.id === course.id) ? true : false;

    return (
        <>
            { isCourseStarted ?
                <Link href={ `/courses/${course.id}/${course.lessons[0].id}` }>
                    <Button className={ `btn btn-primary ${styles.courseButton}` }>Continue</Button>
                </Link>
                :
                <StartButton />
            }
        </>
    );
};

export default CourseButton;
