import { Badge } from '@/_components/ui/badge';
import { Button } from '@/_components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/_components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/_components/ui/collapsible';
import * as icons from 'lucide-react';
import React from 'react';
import { getData } from '@/_lib/data';
import CourseButton from '@/_components/CourseButton/CourseButton';
import CourseProgressBar from '@/_components/CourseProgressBar/CourseProgressBar';

/**
 * Renders a page component for a specific course.
 *
 * @param params - The parameters for the page component.
 * @returns A Promise that resolves to a JSX element representing the page component.
 */
export default async function Page({
    params,
}: {
    params: {
        courseId: number,
    };
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the course data from the server.
     * 
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Promise<Course>} - A promise that resolves to the course data.
     */
    const course: Course = await getData("courses", params.courseId) as Course;

    return (

        <>
            <Card>
                <CardHeader>
                    <div className="hidden sm:block py-36 bg-black/[0.1] border rounded"></div>
                    <CourseProgressBar course={ course } />
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="grid gap-4">
                            <h1 className="text-lg font-medium">{ course.title }</h1>
                            <div className="flex gap-1 flex-wrap">
                                { course.language.name && // Render a language badge if the course has a language.
                                    <Badge variant={ course.language.name as "Javascript" | "C#" | "C++" | "HTML/CSS" | "Ruby" | "Go" | "Php" | "Java" | "Mysql" | "Python" }>
                                        { course.language.name }
                                    </Badge>
                                }
                                { course.difficulty && // Render a category badge if the course has a category.
                                    <Badge variant={ course.difficulty }>
                                        { course.difficulty }
                                    </Badge>
                                }
                                <Badge>{ course.points_gain } points</Badge>
                                <Badge>+{ course.exp_gain } xp</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col h-full text-nowrap gap-2 items-end justify-end [&_p]:flex [&_p]:gap-2">
                            <p>
                                { course.points_gain }
                                <icons.LucideStar strokeWidth={ 1 } className="text-primary" />
                            </p>
                            <p>
                                { course.exp_gain }
                                <icons.LucideMedal strokeWidth={ 1 } className="text-primary" />
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="grid w-full grid-cols-1 sm:flex sm:justify-between gap-6">
                        <div className="flex items-end gap-6 w-1/2 [&_p]:flex [&_p]:gap-1 [&_p>span]:text-muted-foreground">
                            <p>
                                <icons.BookUser strokeWidth={ 1 } className="text-primary" />
                                <span>18 000+ students</span>
                            </p>
                            <p>
                                <icons.Clock strokeWidth={ 1 } className="text-primary" />
                                <span>5h</span>
                            </p>
                        </div>
                        <div className="w-1/2 text-end">
                            <CourseButton />
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <Card className="md:hidden">
                <CardHeader>
                    <Collapsible className="text-lg font-medium">
                        <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between">
                                <h2 className="font-medium">Included lessons</h2>
                                <Button variant="ghost">
                                    <icons.ChevronDown />
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid gap-4 mt-4">
                                { course.lessons && // Render the lessons if they exist.
                                    course.lessons.map((lesson: Lesson, index: number): React.JSX.Element => ( // Map over the lessons and render them each in a card.
                                        <Card key={ index }>
                                            <CardHeader>
                                                <h2>{ lesson.title }</h2>
                                            </CardHeader>
                                            <CardFooter>
                                                <div className="flex flex-wrap gap-1 justify-start items-center">
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardHeader>
            </Card>
            <div className="text-muted-foreground">
                { course.description }
            </div>
            <CourseButton className="w-1/2 mx-auto" />
        </>

    );
}