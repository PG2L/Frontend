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
    className = '',
}: LessonCardProps): React.JSX.Element => {

    /**
     * Retrieves the current lesson based on the user's progress in the course.
     * @param userCourse - The user's course object.
     * @returns The current lesson object.
     */
    const currentLesson: Lesson = userCourse.course.lessons[userCourse.progress];

    return (

        <Link
            href={ `/courses/${userCourse.course.id}/${currentLesson.id}` } // Link to the current lesson
        >
            <Card className={ `hover:border-primary hover:scale-[1.01] min-h-[310px] w-[300px] ${className}` }>
                <CardHeader>
                    <div
                        className="h-32 rounded bg-secondary" // Placeholder image
                    >
                    </div>
                    <Link
                        href={ `/courses/${userCourse.course.id}` } // Link to the course
                        className="text-muted-foreground text-nowrap overflow-hidden hover:underline text-ellipsis"
                    >
                        { currentLesson.lesson_number }/{ userCourse.course.lessons.length } { userCourse.course.title }
                    </Link>
                </CardHeader>
                <CardContent>
                    <h3 className=" text-nowrap overflow-hidden text-ellipsis text-lg font-medium">{ currentLesson.title }</h3>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-end w-full flex-col">
                        <p className="flex items-center justify-end gap-2">
                            <span className="text-foreground">{ currentLesson.points_gain }</span>
                            <icons.MedalIcon strokeWidth={ 1 } className="text-primary h-7 w-7" />
                        </p>
                        <p className="flex items-center gap-2 justify-end">
                            <span className="text-foreground">{ currentLesson.exp_gain }</span>
                            <icons.StarIcon strokeWidth={ 1 } className="text-primary h-7 w-7" />
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </Link>

    );
};

export default LessonCard;
