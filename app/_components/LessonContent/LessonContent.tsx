"use client";

import React, {
    FC,
    useContext
} from 'react';
import { CourseContext } from '@/_contexts/CourseProvider';
import { LessonContext } from '@/_contexts/LessonProvider';
import { UserContext } from '@/_contexts/UserProvider';
import styles from './LessonContent.module.css';
import { Button } from '@/_components/ui/button';
import {
    updateCourseCompletion
} from '@/_lib/courses';
import { updateUserExp } from '@/_lib/levels';
import { updateUserPoints } from '@/_lib/points';
import { useRouter } from 'next/navigation';
import AssessmentModal from '@/_components/AssessmentModal/AssessmentModal';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface LessonContentProps { }

/**
 * Renders the lesson content component.
 * @param {LessonContentProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
const LessonContent: FC<LessonContentProps> = ({ }: LessonContentProps): React.JSX.Element => {

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = useContext(UserContext) as User;

    /**
     * Retrieves the lesson from the LessonContext.
     * @returns The lesson object.
     */
    const lesson: Lesson = useContext(LessonContext) as Lesson;

    /**
     * Retrieves the course from the CourseContext.
     * @returns The course object.
     */
    const course: Course = useContext(CourseContext) as Course;

    /**
     * Finds the user's course based on the course ID.
     *
     * @param user - The user object containing the courses.
     * @param course - The course object to search for.
     * @returns The user's course if found, otherwise undefined.
     */
    const userCourse: UserCourse | undefined = user.courses.find((c: UserCourse): boolean => c.course.id === course.id);

    /**
     * Checks if the lesson is unlocked based on the user's progress and the lesson number.
     * @param userCourse - The user's course progress.
     * @param lesson - The lesson information.
     * @returns A boolean indicating whether the lesson is unlocked.
     */
    const isUnlock: boolean = userCourse ? userCourse?.progress + 1 >= lesson.lesson_number : false;

    /**
     * Checks if the current lesson is the last lesson in the course.
     * @param lesson - The current lesson object.
     * @param course - The course object containing all the lessons.
     * @returns A boolean value indicating whether the current lesson is the last lesson.
     */
    const isLastLesson: boolean = lesson.lesson_number === course.lessons.length;

    /**
     * The router object used for navigation within the application.
     */
    const router: AppRouterInstance = useRouter();

    return (

        <div className="relative mt-6 flex flex-col items-center justify-center">
            <p>
                { lesson.description }
            </p>
            <p className="text-muted-foreground mt-4">
                { lesson.content }
            </p>
            { !isUnlock ?
                <div className="absolute h-[102%] w-[102%] top-[-1%] left-[-1%] backdrop-blur-sm select-none z-50 rounded" />
                :
                isUnlock && userCourse?.progress === lesson.lesson_number - 1 ?
                    <AssessmentModal />
                    :
                    !isLastLesson ?
                        <Button
                            variant="outline"
                            className="w-1/3 align-self-center justify-self-center"
                            onClick={ async (): Promise<void> => {
                                router.push(`/courses/${course.id}/${lesson.id + 1}`);
                            } }
                        >
                            Next lesson
                        </Button>
                        :
                        <Button
                            className="w-1/3 align-self-center justify-self-center"
                            onClick={ async (): Promise<void> => {
                                router.prefetch(`/courses/${course.id}`);
                                if (userCourse) {
                                    await updateCourseCompletion(userCourse);
                                }
                                await updateUserPoints(user, user.total_points + course.points_gain);
                                await updateUserExp(user, user.total_exp + course.exp_gain);
                                router.push(`/courses/${course.id}`);
                            } }
                        >
                            End course
                        </Button>
            }
        </div>

    );
};

export default LessonContent;
