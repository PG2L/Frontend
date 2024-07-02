import React, { FC } from 'react';
import { Badge } from '@/app/_components/ui/badge';
import { Card, CardFooter, CardHeader } from '@/app/_components/ui/card';
import * as icons from 'lucide-react';
import Link from 'next/link';
import { Progress } from '../ui/progress';

interface CourseCardProps {
    course: Course;
    className?: string;
}

const CourseCard: FC<CourseCardProps> = ({
    course,
    className = '',
}) => (
    <Link href={ `/courses/${course.id}` } >
        <Card className={ `p-2 sm:p-4 border grid gap-2 sm:gap-4 rounded-lg hover:border-primary hover:scale-[1.01] min-h-[310px] ${className}` }>
            <CardHeader className="grid p-1">
                <div className={ `h-32 rounded flex justify-center items-center bg-secondary` }>
                </div>
                <div className="flex justify-between gap-1">
                    <Progress value={ parseInt(Math.random() * 100) } />
                </div>
                <h3 className=" text-nowrap overflow-hidden text-ellipsis">{ course.title }</h3>
            </CardHeader>
            <CardFooter className="flex justify-between items-start p-1">
                <div className="flex justify-start items-start gap-1 flex-wrap">
                    { course.lessons_count && <Badge>{ course.lessons_count } lessons</Badge> }
                    { course.difficulty && <Badge variant={ course.difficulty.toLowerCase() }>{ course.difficulty }</Badge> }
                    { course.language && <Badge variant={ course.language.name.toLowerCase() }>{ course.language.name }</Badge> }
                </div>
                <div className={ `grid text-nowrap gap-1 text-primary` }>
                    <div className="flex items-center justify-end gap-2">
                        <p className={ `text-foreground` }>{ course.points_gain }</p>
                        <icons.MedalIcon strokeWidth={ 1 } />
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <p className={ `text-foreground` }>{ course.exp_gain }</p>
                        <icons.StarIcon strokeWidth={ 1 } />
                    </div>
                </div>
            </CardFooter>
        </Card>
    </Link>
);

export default CourseCard;