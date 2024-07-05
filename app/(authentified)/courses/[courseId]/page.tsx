import { Badge } from '../../../_components/ui/badge';
import { Button } from '../../../_components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../../_components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../_components/ui/collapsible';
import * as icons from 'lucide-react';
import React from 'react';
import { getData } from '../../../_lib/data';
import CourseButton from '../../../_components/CourseButton/CourseButton';
import CourseProgressBar from '../../../_components/CourseProgressBar/CourseProgressBar';
import CoursesLayout from '../layout';

export default async function Page({
    params,
}: {
    params: {
        courseId: number,
    };
}): Promise<React.JSX.Element> {

    const course: Course = await getData("courses", params.courseId) as Course;

    return (
        <>
            <Card className="border">
                <CardHeader>
                    <div className="hidden sm:block py-36 bg-secondary rounded"></div>
                    <CourseProgressBar lessons={ course.lessons } />
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="grid gap-4">
                            <h1 className="text-lg font-medium">{ course.title }</h1>
                            <div className="flex gap-1 flex-wrap">
                                { course.language && course.language.name && <Badge variant={ course.language.name.toLowerCase() }>{ course.language.name }</Badge> }
                                { course.difficulty && <Badge variant={ course.difficulty.toLowerCase() }>{ course.difficulty }</Badge> }
                                <Badge>{ course.points_gain } points</Badge>
                                <Badge>+{ course.exp_gain } xp</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col h-full text-nowrap gap-2 items-end justify-end">
                            <div className="flex gap-2">
                                { course.points_gain }
                                <icons.LucideStar strokeWidth={ 1 } color="#1461cc" />
                            </div>
                            <div className="flex gap-2">
                                { course.exp_gain }
                                <icons.LucideMedal strokeWidth={ 1 } color="#1461cc" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="grid w-full grid-cols-1 sm:flex sm:justify-between gap-6">
                        <div className="flex items-end gap-6">
                            <div className="flex gap-1">
                                <icons.BookUser strokeWidth={ 1 } color="#1461cc" />
                                <span className="text-muted-foreground">18 000+ students</span>
                            </div>
                            <div className="flex gap-1">
                                <icons.Clock strokeWidth={ 1 } color="#1461cc" />
                                <span className="text-muted-foreground">5h</span>
                            </div>
                        </div>
                        <CourseButton />
                    </div>
                </CardFooter>
            </Card>
            <Card className="md:hidden">
                <CardHeader>
                    <Collapsible className="text-lg font-medium">
                        <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between">
                                <h2 className=" font-medium">Included lessons</h2>
                                <Button variant="ghost">
                                    <icons.ChevronDown />
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid gap-4 mt-4">
                                { course.lessons && course.lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                                    <Card key={ index } className={ `${lesson.isFinished && "bg-secondary"} ${lesson.isUnlock && "outline outline-1 outline-primary"}` }>
                                        <CardHeader>
                                            <h2>{ lesson.title }</h2>
                                        </CardHeader>
                                        <CardFooter>
                                            <div className="flex flex-wrap gap-1 justify-start items-center">
                                            </div>
                                        </CardFooter>
                                    </Card>
                                )) }
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardHeader>
            </Card>
            <div className="text-muted-foreground">
                { course.description }
            </div>
        </>
    );
}