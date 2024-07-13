"use client";

import React, {
    FC,
    Suspense,
    useContext
} from 'react';
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
    const isFirstLesson: boolean = parseInt(params.lessonId?.toString()) === course.lessons[0].id;

    /**
     * Checks if the current lesson is the last lesson in the course.
     * @param {string} params.lessonId - The ID of the current lesson.
     * @param {Course} course - The course object containing the lessons.
     * @returns {boolean} - True if the current lesson is the last lesson, false otherwise.
     */
    const isLastLesson: boolean = parseInt(params.lessonId?.toString()) === course.lessons[course.lessons.length - 1].id;

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
                <div className="flex relative">
                    <ul className="grid gap-2 pe-6">
                        { course.lessons && course.lessons.map((lesson: Lesson, index: number): React.JSX.Element => ( // Mapping over the course lessons to create a list of skeleton buttons
                            <Suspense key={ index } fallback={
                                <Skeleton className="w-full h-6" />
                            }>
                                <li>
                                    <Link
                                        href={ `/courses/${params.courseId}/${lesson.id}` } // Link to the lesson
                                    >
                                        <Button
                                            variant={
                                                `${userCourse && userCourse.progress === index ? 'outline' : 'ghost'}` // Conditional variant based on the user's progress
                                            }
                                            className={
                                                `text-muted-foreground w-full text-start font-normal text-wrap ` +
                                                `${(lesson.id == Number(params.lessonId)) && "active"} ` + // Highlight the button if it's the current lesson
                                                `${userCourse && userCourse.progress <= index && "!text-foreground"}` // Make text color more prominent if the lesson isn't completed
                                            }
                                        >
                                            <h2 className="w-full">{ index + 1 } .  { lesson.title }</h2>
                                        </Button>
                                    </Link>
                                </li>
                            </Suspense>
                        )) }
                    </ul>
                    {
                        params.hasOwnProperty('lessonId') && // Check if the lessonId is present in the params
                        <div className={ `flex flex-col gap-6 justify-between absolute h-full right-[-36px] top-0 ${isFirstLesson && "!justify-end"}` }>
                            {
                                !isFirstLesson && // Check if the current lesson is the first lesson in the course
                                <Link
                                    href={ `/courses/${params.courseId}/${Number(params.lessonId) - 1}` } // Link to the previous lesson
                                    className="justify-self-start !h-fit"
                                >
                                    <Button variant="ghost">
                                        <icons.ChevronsUp strokeWidth={ 1 } />
                                    </Button>
                                </Link>
                            }
                            {
                                !isLastLesson && // Check if the current lesson is the last lesson in the course 
                                <Link
                                    href={ `/courses/${params.courseId}/${Number(params.lessonId) + 1}` } // Link to the next lesson
                                    className="justify-self-end relative"
                                >
                                    <Button variant="ghost">
                                        <icons.ChevronsDown strokeWidth={ 1 } />
                                    </Button>
                                </Link>
                            }
                        </div>
                    }
                </div>
                <Separator />
                {
                    !params.hasOwnProperty('lessonId') &&
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
