"use client";

import React, { FC, useContext } from 'react';
import { CourseContext } from '../../_contexts/CourseProvider';
import { LessonContext } from '../../_contexts/LessonProvider';
import { UserContext } from '../../_contexts/UserProvider';
import styles from './LessonContent.module.css';
import { Button } from '../ui/button';
import { updateCourseProgress, updateCourseCompletion } from '../../_lib/courses';
import { updateUserExp } from '../../_lib/levels';
import { updateUserPoints } from '../../_lib/points';
import { useRouter } from 'next/navigation';
import { getData } from '../../_lib/data';

interface LessonContentProps { }

const LessonContent: FC<LessonContentProps> = ({ }): React.JSX.Element => {

    const user: User = useContext(UserContext);
    const lesson: Lesson = useContext(LessonContext);
    const course: Course = useContext(CourseContext);
    const userCourse: UserCourse | undefined = user.courses.find((c: UserCourse): boolean => c.course.id === course.id);
    const isUnlock: boolean = userCourse?.progress + 1 >= lesson.lesson_number;
    const isLastLesson: boolean = lesson.lesson_number === course.lessons.length;
    const router = useRouter();

    return (
        <div className="grid gap-6 relative rounded">
            <div>
                { lesson.description }
            </div>
            <div className="text-muted-foreground">
                { lesson.content }
            </div>
            { !isUnlock ?
                <div className="absolute h-full w-[102%] top-0 left-[-1%] backdrop-blur-sm select-none z-50 rounded"></div>
                :
                !isLastLesson ?
                    <Button className="w-1/3 align-self-center justify-self-center" onClick={ async (): Promise<void> => {
                        router.prefetch(`/courses/${course.id}/${lesson.id + 1}`);
                        await updateCourseProgress(userCourse);
                        await updateUserPoints(user.id, user.total_points + lesson.points_gain);
                        await updateUserExp(user.id, user.total_exp + lesson.exp_gain);
                        router.push(`/courses/${course.id}/${lesson.id + 1}`);
                    } }>Next lesson</Button>
                    :
                    <Button className="w-1/3 align-self-center justify-self-center" onClick={ async (): Promise<void> => {
                        router.prefetch(`/courses/${course.id}`);
                        await updateCourseCompletion(userCourse, "completed");
                        await updateUserPoints(user.id, user.total_points + course.points_gain);
                        await updateUserExp(user.id, user.total_exp + course.exp_gain);
                        router.push(`/courses/${course.id}`);
                    } }>End course</Button>
            }
        </div>
    );
};

export default LessonContent;
