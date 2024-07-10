import React, { FC } from 'react';
import {
    Card,
    CardFooter,
    CardHeader
} from '../ui/card';
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
            <Card className={ `p-2 sm:p-4 border grid gap-2 sm:gap-4 rounded-lg hover:border-primary hover:scale-[1.01] min-h-[310px] ${className}` }>
                <CardHeader className="grid p-1">
                    <div
                        className="h-32 rounded flex justify-center items-center bg-secondary" // Placeholder image
                    >
                    </div>
                    <Link
                        href={ `/courses/${userCourse.course.id}` } // Link to the course
                        className="text-sm text-muted-foreground text-nowrap hover:underline"
                    >
                        {/* Display lesson number and total lessons in the course */ }
                        ({ currentLesson.lesson_number }/{ userCourse.course.lessons.length }) { userCourse.course.title }
                    </Link>
                    <h3 className=" text-nowrap overflow-hidden text-ellipsis">{ currentLesson.title }</h3>
                </CardHeader>
                <CardFooter className="flex justify-end gap-4 items-start p-1">
                    <div className="flex items-center justify-end gap-2">
                        <p className="text-foreground">{ currentLesson.points_gain }</p>
                        <icons.MedalIcon strokeWidth={ 1 } className="text-primary" />
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <p className="text-foreground">{ currentLesson.exp_gain }</p>
                        <icons.StarIcon strokeWidth={ 1 } className="text-primary" />
                    </div>
                </CardFooter>
            </Card>
        </Link>

    );
};

export default LessonCard;
