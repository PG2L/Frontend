"use client";

import React, {
    FC,
    useContext
} from 'react';
import { CourseContext } from '../../_contexts/CourseProvider';
import { LessonContext } from '../../_contexts/LessonProvider';
import { UserContext } from '../../_contexts/UserProvider';
import styles from './LessonContent.module.css';
import { Button } from '../ui/button';
import {
    updateCourseProgress,
    updateCourseCompletion
} from '../../_lib/courses';
import { updateUserExp } from '../../_lib/levels';
import { updateUserPoints } from '../../_lib/points';
import { useRouter } from 'next/navigation';
import AssessmentModal from '../AssessmentModal/AssessmentModal';
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

        <div className="grid gap-6 relative rounded">
            <div>
                { lesson.description }
            </div>
            <div className="text-muted-foreground">
                { lesson.content }
            </div>
            { !isUnlock ? // Overlay if the lesson is locked
                <div className="absolute h-full w-[102%] top-0 left-[-1%] backdrop-blur-sm select-none z-50 rounded"></div>
                :
                isUnlock && userCourse?.progress === lesson.lesson_number - 1 ? // Button to open assessment modal if the lesson is unlocked and the user hasn't completed it yet
                    <AssessmentModal />
                    :
                    !isLastLesson ? // Button to navigate to the next lesson if it's not the last lesson
                        <Button
                            className="w-1/3 align-self-center justify-self-center"
                            onClick={ async (): Promise<void> => {
                                router.push(`/courses/${course.id}/${lesson.id + 1}`); // Navigate to the next lesson
                            } }
                        >
                            Next lesson
                        </Button>
                        : // Button to end the course if it's the last lesson
                        <Button
                            className="w-1/3 align-self-center justify-self-center"
                            onClick={ async (): Promise<void> => {
                                router.prefetch(`/courses/${course.id}`);
                                if (userCourse) {
                                    await updateCourseCompletion(userCourse);
                                }
                                await updateUserPoints(user.id, user.total_points + course.points_gain);
                                await updateUserExp(user.id, user.total_exp + course.exp_gain);
                                router.push(`/courses/${course.id}`); // Navigate to the course page
                            } }
                        >
                            End course
                        </Button>
            }
        </div>

    );
};

export default LessonContent;
