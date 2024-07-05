import React from 'react';
import { Badge } from "../../../../_components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from '../../../../_components/ui/card';
import * as icons from 'lucide-react';
import { Button } from '../../../../_components/ui/button';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../../_components/ui/collapsible';
import { getData } from '../../../../_lib/data';

export default async function Page({
    params,
}: {
    params: {
        courseId: string,
        lessonId: string,
    };
}): Promise<React.JSX.Element> {

    const lesson: Lesson = await getData("lessons", params.lessonId) as Lesson;

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="hidden sm:block py-36 bg-secondary rounded"></div>
                    <h3 className="text-muted-foreground">
                        <Link href={ `/courses/${lesson.course.id}` } className="hover:underline">{ lesson.course.title }</Link>
                    </h3>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="grid gap-2">
                            <div className="flex items-end font-medium">
                                <p>{ lesson.lesson_number }</p>
                                <icons.Dot className="h-6 w-6 text-primary" />
                                <h1>{ lesson.title }</h1>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                { lesson.course.language.name && <Badge variant={ lesson.course.language.name.toLowerCase() }>{ lesson.course.language.name }</Badge> }
                                { lesson.course.difficulty && <Badge variant={ lesson.course.difficulty.toLowerCase() }>{ lesson.course.difficulty }</Badge> }
                                <Badge>5 000 points</Badge>
                                <Badge>+100 000 xp</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col h-full text-nowrap gap-2 items-end justify-end">
                            <div className="flex gap-2">
                                { lesson.points_gain?.toString() }
                                <icons.LucideStar strokeWidth={ 1 } color="#1461cc" />
                            </div>
                            <div className="flex gap-2">
                                { lesson.exp_gain?.toString() }
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
                                <span className="text-muted-foreground">7 000+ students</span>
                            </div>
                            <div className="flex gap-1">
                                <icons.Clock strokeWidth={ 1 } color="#1461cc" />
                                <span className="text-muted-foreground">30 min</span>
                            </div>
                        </div>
                        <Button size="lg" className="w-full sm:w-1/2">Start lesson</Button>
                    </div>
                </CardFooter>
            </Card>
            <Card className="md:hidden">
                <CardHeader>
                    <Collapsible className=" font-medium">
                        <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between">
                                <h2 className=" font-medium">Related lessons</h2>
                                <Button variant="ghost">
                                    <icons.ChevronDown />
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid gap-4 mt-4">

                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardHeader>
            </Card>
            <div className="grid gap-6">
                <div>
                    { lesson.description }
                </div>
                <div className="text-muted-foreground">
                    { lesson.content }
                </div>
            </div>
        </>
    );
}