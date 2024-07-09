import React, { FC } from 'react';
import { Badge } from '../ui/badge';
import { Card, CardFooter, CardHeader } from '../ui/card';
import * as icons from 'lucide-react';
import Link from 'next/link';
import { Progress } from '../ui/progress';

interface LessonCardProps {
    userCourse: UserCourse;
    className?: string;
}

const LessonCard: FC<LessonCardProps> = ({
    userCourse,
    className = '',
}): React.JSX.Element => {

    const currentLesson: Lesson = userCourse.course.lessons[userCourse.progress];

    return (
        <Link href={ `/courses/${userCourse.course.id}/${currentLesson.id}` } >
            <Card className={ `p-2 sm:p-4 border grid gap-2 sm:gap-4 rounded-lg hover:border-primary hover:scale-[1.01] min-h-[310px] ${className}` }>
                <CardHeader className="grid p-1">
                    <div className={ `h-32 rounded flex justify-center items-center bg-secondary` }>
                    </div>
                    <Link href={ `/courses/${userCourse.course.id}` } className="text-sm text-muted-foreground text-nowrap hover:underline">
                        ({ currentLesson.lesson_number }/{ userCourse.course.lessons.length }) { userCourse.course.title }
                    </Link>
                    <h3 className=" text-nowrap overflow-hidden text-ellipsis">{ currentLesson.title }</h3>
                </CardHeader>
                <CardFooter className="flex justify-end gap-4 items-start p-1">
                    <div className="flex items-center justify-end gap-2">
                        <p className={ `text-foreground` }>{ currentLesson.points_gain }</p>
                        <icons.MedalIcon strokeWidth={ 1 } className="text-primary" />
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <p className={ `text-foreground` }>{ currentLesson.exp_gain }</p>
                        <icons.StarIcon strokeWidth={ 1 } className="text-primary" />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default LessonCard;
