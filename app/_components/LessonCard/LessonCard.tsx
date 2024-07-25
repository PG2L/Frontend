import React, { FC } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/_components/ui/card';
import * as icons from 'lucide-react';
import Link from 'next/link';

interface LessonCardProps {
    userCourse: UserCourse;
    className?: string;
}

/**
 * Renders a lesson card component.
 *
 * @component
 * @param {LessonCardProps} props - The component props.
 * @param {UserCourse} props.userCourse - The user's course data.
 * @param {string} [props.className] - Additional CSS class for the component.
 * @returns {React.JSX.Element} The rendered lesson card.
 */
const LessonCard: FC<LessonCardProps> = ({
    userCourse,
    className,
}: LessonCardProps): React.JSX.Element => {

    /**
     * Retrieves the current lesson based on the user's progress in the course.
     * @param userCourse - The user's course object.
     * @returns The current lesson object.
     */
    const lesson: Lesson = userCourse.course.lessons[userCourse.progress];

    return (

        <Link href={ `/courses/${userCourse.course.id}/${lesson.id}` }>
            <Card className={ `hover:border-primary hover:scale-[1.01] min-h-[310px] w-[300px] ${className}` }>
                <CardHeader>
                    <div className="h-32 rounded bg-secondary" />
                    <p className="text-muted-foreground text-nowrap overflow-hidden text-ellipsis">
                        { lesson.lesson_number }/{ userCourse.course.lessons.length } { userCourse.course.title }
                    </p>
                </CardHeader>
                <CardContent>
                    <h3 className="text-nowrap overflow-hidden text-ellipsis text-lg font-medium">{ lesson.title }</h3>
                </CardContent>
                <CardFooter className="flex w-full justify-end items-end text-nowrap space-y-1 text-primary gap-2 [&_p]:flex [&_p]:items-center [&_p]:justify-end [&_p]:gap-2 [&_p>span]:text-foreground">
                    <p>
                        <span>{ lesson.points_gain }</span>
                        <icons.MedalIcon strokeWidth={ 1 } />
                    </p>
                    <p>
                        <span>{ lesson.exp_gain }</span>
                        <icons.StarIcon strokeWidth={ 1 } />
                    </p>
                </CardFooter>
            </Card>
        </Link>

    );
};

export default LessonCard;
