import React, { FC } from 'react';
import { Badge } from '@/_components/ui/badge';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/_components/ui/card';
import * as icons from 'lucide-react';
import Link from 'next/link';
import CourseProgressBar from '@/_components/CourseProgressBar/CourseProgressBar';

interface CourseCardProps {
    course: Course;
    className?: string;
}

/**
 * Renders a course card component.
 *
 * @component
 * @param {CourseCardProps} props - The props for the CourseCard component.
 * @param {Course} props.course - The course object to display.
 * @param {string} [props.className] - Additional CSS class for the component.
 * @returns {React.JSX.Element} The rendered course card component.
 */
const CourseCard: FC<CourseCardProps> = ({
    course,
    className,
}: CourseCardProps): React.JSX.Element => {

    /**
     * Represents the name of a programming language.
     * Enables the use of the language name as a variant for the Badge component.
     */
    const languageName: "Javascript" | "C#" | "C++" | "Java" | "Php" | "Ruby" | "Python" | "HTML/CSS" | "Go" | "Mysql" = course.language?.name as any;

    return (

        <Link href={ `/courses/${course.id}` }>
            <Card className={ `hover:border-primary hover:scale-[1.01] min-h-[310px] ${className}` }>
                <CardHeader>
                    <div className="h-32 rounded bg-secondary" />
                    <CourseProgressBar course={ course } />
                </CardHeader>
                <CardContent>
                    <h3 className="text-nowrap overflow-hidden text-ellipsis text-lg font-medium">{ course.title }</h3>
                </CardContent>
                <CardFooter className="flex justify-between items-start">
                    <div className="flex justify-start items-start gap-1 flex-wrap">
                        { course.lessons_count && <Badge>{ course.lessons_count } lessons</Badge> }
                        { course.difficulty && <Badge variant={ course.difficulty }>{ course.difficulty }</Badge> }
                        { course.language && <Badge variant={ languageName }>{ languageName }</Badge> }
                    </div>
                    <div className="text-nowrap space-y-1 text-primary gap-2 [&_p]:flex [&_p]:items-center [&_p]:justify-end [&_p]:gap-2 [&_p>span]:text-foreground">
                        <p>
                            <span>{ course.points_gain }</span>
                            <icons.MedalIcon strokeWidth={ 1 } />
                        </p>
                        <p>
                            <span>{ course.exp_gain }</span>
                            <icons.StarIcon strokeWidth={ 1 } />
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </Link>

    );
};

export default CourseCard;
