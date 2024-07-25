"use client";

import React, {
    FC,
    Suspense,
    useContext
} from 'react';
import styles from './CourseContentMenu.module.css';
import { Skeleton } from '@/_components/ui/skeleton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/_components/ui/button';
import { Separator } from '@/_components/ui/separator';
import { icons } from 'lucide-react';
import { UserContext } from '@/_contexts/UserProvider';
import {
    Card,
    CardHeader
} from '@/_components/ui/card';
import CourseButton from '@/_components/CourseButton/CourseButton';
import { Badge } from '@/_components/ui/badge';

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
    const user: User = useContext(UserContext) as User;

    /**
     * Finds the user course that matches the given course ID.
     *
     * @param user - The user object containing the courses.
     * @param course - The course object to find.
     * @returns The user course that matches the given course ID, or undefined if not found.
     */
    const userCourse: UserCourse | undefined = user.courses.find((userCourse: UserCourse): boolean => userCourse.course.id === course.id);

    return (

        <>
            <Card className="h-fit border-primary border hover:scale-[1.01]">
                <Link href={ `/courses/${course.id}` }>
                    <CardHeader className="flex justify-center items-center gap-4 rounded h-fit">
                        <h1 className="font-medium text-center">{ course.title }</h1>
                        <div className="flex flex-wrap gap-1 justify-center w-3/4">
                            { course.language.name && // Renders a badge for the language if it exists
                                <Badge variant={ course.language.name as "Javascript" | "C#" | "C++" | "HTML/CSS" | "Ruby" | "Go" | "Php" | "Java" | "Mysql" | "Python" }>
                                    { course.language.name }
                                </Badge> }
                            { course.difficulty && // Renders a badge for the difficulty level if it exists
                                <Badge variant={ course.difficulty }>
                                    { course.difficulty }
                                </Badge> }
                            <Badge>{ course.points_gain } points</Badge>
                            <Badge>+{ course.exp_gain } xp</Badge>
                        </div>
                    </CardHeader>
                </Link>
            </Card>
            <nav className="px-6 mt-6 top-6 space-y-6">
                <Separator />
                <div className="flex relative">
                    <ul className="space-y-2 pe-6">
                        { course.lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                            <li key={ index }>
                                <Button
                                    variant="ghost"
                                    className={
                                        `text-muted-foreground w-full text-start font-normal text-wrap ` +
                                        `${(lesson.id == Number(params.lessonId)) && "active"} ` + // Highlight the button if it's the current lesson
                                        `${userCourse && userCourse.progress <= index && "!text-foreground"}` // Make text color more prominent if the lesson isn't completed
                                    }
                                    asChild
                                >
                                    <Link href={ `/courses/${params.courseId}/${lesson.id}` }>
                                        <span className="w-full">{ index + 1 } .  { lesson.title }</span>
                                    </Link>
                                </Button>
                            </li>
                        )) }
                    </ul>
                    { params.hasOwnProperty('lessonId') &&
                        <div className={ `flex flex-col justify-between absolute h-full right-[-36px] top-0 ${isFirstLesson && "!justify-end"}` }>
                            { !isFirstLesson &&
                                <Button variant="ghost" asChild>
                                    <Link href={ `/courses/${params.courseId}/${Number(params.lessonId) - 1}` } className="justify-self-start !h-fit">
                                        <icons.ChevronsUp strokeWidth={ 1 } />
                                    </Link>
                                </Button>
                            }
                            { !isLastLesson &&
                                <Button variant="ghost" asChild>
                                    <Link href={ `/courses/${params.courseId}/${Number(params.lessonId) + 1}` } className="justify-self-end">
                                        <icons.ChevronsDown strokeWidth={ 1 } />
                                    </Link>
                                </Button>
                            }
                        </div>
                    }
                </div>
                <Separator />
                { !params.hasOwnProperty('lessonId') &&
                    <div className="w-full text-center px-6">
                        <CourseButton />
                    </div>
                }
            </nav >
        </>

    );
};

export default CourseContentMenu;
