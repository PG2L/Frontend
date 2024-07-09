"use client";

import React, { FC, Suspense, useContext } from 'react';
import styles from './CourseContentMenu.module.css';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { icons } from 'lucide-react';
import { UserContext } from '../../_contexts/UserProvider';
import CourseButton from '../CourseButton/CourseButton';

interface CourseContentMenuProps {
    course: Course,
}

/**
 * Renders the course content menu component.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Course} props.course - The course object.
 * @returns {JSX.Element} - The rendered component.
 */
const CourseContentMenu: FC<CourseContentMenuProps> = ({
    course,
}: CourseContentMenuProps): React.JSX.Element => {

    /**
     * Retrieves the parameters from the current route.
     * @returns The parameters from the current route.
     */
    const params = useParams();

    /**
     * Checks if the current lesson is the first lesson in the course.
     * @param {string} params.lessonId - The ID of the current lesson.
     * @param {Course} course - The course object containing the lessons.
     * @returns {boolean} - True if the current lesson is the first lesson, false otherwise.
     */
    const isFirstLesson: boolean = parseInt(params.lessonId.toString()) === course.lessons[0].id;

    /**
     * Checks if the current lesson is the last lesson in the course.
     * @param {string} params.lessonId - The ID of the current lesson.
     * @param {Course} course - The course object containing the lessons.
     * @returns {boolean} - True if the current lesson is the last lesson, false otherwise.
     */
    const isLastLesson: boolean = parseInt(params.lessonId.toString()) === course.lessons[course.lessons.length - 1].id;

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = useContext(UserContext);

    /**
     * Finds the user course that matches the given course ID.
     *
     * @param user - The user object containing the courses.
     * @param course - The course object to find.
     * @returns The user course that matches the given course ID, or undefined if not found.
     */
    const userCourse: UserCourse | undefined = user.courses.find((userCourse: UserCourse): boolean => userCourse.course.id === course.id);

    return (

        <div className="grid h-full gap-6">
            <nav className="px-6 mt-6 top-6 h-fit grid gap-6">
                <Separator />
                <ul className="grid gap-2">
                    { course.lessons && course.lessons.map((lesson: Lesson, index: number): React.JSX.Element => ( // Mapping over the lessons in the course
                        <Suspense key={ index } fallback={
                            <Skeleton className="w-full h-6" /> // Fallback loading skeleton for each lesson item
                        }>
                            <li>
                                <Link
                                    href={ `/courses/${params.courseId}/${lesson.id}` } // Link to the lesson
                                >
                                    <Button
                                        variant={ `${userCourse && userCourse.progress === index ? 'outline' : 'ghost'}` } // Conditional variant based on the user's progress
                                        className={ `text-muted-foreground w-full text-start font-normal text-wrap ${(lesson.id == Number(params.lessonId)) && "active"} ${userCourse && userCourse.progress <= index && "!text-foreground"}` } // Styles the button, highlighting if active
                                    >
                                        <h2 className="w-full">{ index + 1 } .  { lesson.title }</h2>
                                    </Button>
                                </Link>
                            </li>
                        </Suspense>
                    )) }
                </ul>
                <Separator />
                { params.hasOwnProperty('lessonId') ? // Check if the lessonId is present in the params
                    <div className={ `flex gap-6 justify-between ${isFirstLesson && "!justify-end"}` }>
                        { !isFirstLesson && // Check if the current lesson is the first lesson in the course
                            <Link
                                href={ `/courses/${params.courseId}/${Number(params.lessonId) - 1}` } // Link to the previous lesson
                                className="justify-self-start"
                            >
                                <Button variant="ghost">
                                    <icons.ChevronsLeft strokeWidth={ 1 } />
                                </Button>
                            </Link>
                        }
                        { !isLastLesson && // Check if the current lesson is the last lesson in the course 
                            <Link
                                href={ `/courses/${params.courseId}/${Number(params.lessonId) + 1}` } // Link to the next lesson
                                className="justify-self-end"
                            >
                                <Button variant="ghost">
                                    <icons.ChevronsRight strokeWidth={ 1 } />
                                </Button>
                            </Link>
                        }
                    </div>
                    :
                    <div className="w-full text-center px-6">

                        {/* Button for course-related action, displayed if no lessonId is present in params */ }
                        <CourseButton />
                    </div>
                }
            </nav>
        </div>

    );
};

export default CourseContentMenu;
