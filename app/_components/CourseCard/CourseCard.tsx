"use client";

import React, { FC } from 'react';
import { Badge } from '../ui/badge';
import { Card, CardFooter, CardHeader } from '../ui/card';
import * as icons from 'lucide-react';
import Link from 'next/link';
import CourseProgressBar from '../CourseProgressBar/CourseProgressBar';

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
    className = '',
}: CourseCardProps): React.JSX.Element => {

    /**
     * Represents the name of a programming language.
     * Enables the use of the language name as a variant for the Badge component.
     */
    const languageName: "Javascript" | "C#" | "C++" | "Java" | "Php" | "Ruby" | "Python" | "HTML/CSS" | "Go" | "Mysql" = course.language?.name as any;

    return (

        <>
            {
                <Link href={ `/courses/${course.id}` }>
                    <Card className={ `p-2 sm:p-4 border grid gap-2 sm:gap-4 rounded-lg hover:border-primary hover:scale-[1.01] min-h-[310px] ${className}` }>
                        <CardHeader className="grid p-1">
                            <div // Course image placeholder
                                className={ `h-32 rounded flex justify-center items-center bg-secondary` }
                            />
                            <CourseProgressBar course={ course } />
                            <h3 className=" text-nowrap overflow-hidden text-ellipsis">{ course.title }</h3>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-start p-1">
                            <div className="flex justify-start items-start gap-1 flex-wrap">
                                {
                                    // Display badges for course details
                                    course.lessons_count && <Badge>{ course.lessons_count } lessons</Badge>
                                }
                                {
                                    // Display badges for course details
                                    course.difficulty && <Badge variant={ course.difficulty }>{ course.difficulty }</Badge>
                                }
                                {
                                    // Display badges for course details
                                    course.language && <Badge variant={ languageName }>{ languageName }</Badge>
                                }
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
            }
        </>

    );
};

export default CourseCard;
