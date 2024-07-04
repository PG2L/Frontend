import React, { useEffect, useState } from 'react';
import { Badge } from "../../_components/ui/badge";
import { Avatar } from "../../_components/ui/avatar";
import { Card, CardFooter, CardHeader } from '../../_components/ui/card';
import * as icons from 'lucide-react';
import { Skeleton } from '../../_components/ui/skeleton';
import Link from 'next/link';
import { Button } from '../../_components/ui/button';
import { getData } from '../../_lib/data';

export default async function Page(): Promise<React.JSX.Element> {

    const lessons: Lesson[] = await getData("lessons") as Lesson[];

    return (
        <>
            <div className="flex justify-between items-center">
                <Link href="/lessons/new">
                    <Button variant="secondary">
                        Create a lesson
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-4 lg:gap-6 w-full bg-background py-6">
                { !lessons && Array.from({ length: 12 }).map((_: unknown, index: number): React.JSX.Element => (
                    <Skeleton key={ index } className="w-full rounded-lg h-80" />
                )) }
                { lessons && lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                    <Link key={ index } href={ `/lessons/${index + 1}` } >
                        <Card className={ `p-4 border w-full grid gap-2 sm:gap-4 rounded-lg hover:border-primary hover:scale-[1.01] ${lesson.isUnlock && "outline outline-primary outline-1"} ${lesson.isFinished && "bg-secondary"}` }>
                            <CardHeader className="grid p-1">
                                <div className={ `${lesson.isFinished ? "bg-card" : "bg-secondary"} h-32 rounded flex justify-center items-center` }>
                                    { lesson.isFinished &&
                                        <Avatar className="h-32 w-32 flex justify-center items-center">
                                            <icons.Check strokeWidth={ 1 } className="h-16 w-16 text-white"></icons.Check>
                                        </Avatar>
                                    }
                                </div>
                                <span className="text-sm text-muted-foreground">{ lesson.course.title }</span>
                                <h3 className=" text-nowrap overflow-hidden text-ellipsis !mt-0">{ lesson.title }</h3>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-start p-1">
                                <div className="flex justify-start items-start gap-1 flex-wrap">
                                    { lesson.course && lesson.course.language && lesson.course.language.name && <Badge variant={ lesson.course.language.name.toLowerCase() }>{ lesson.course.language.name }</Badge> }
                                    { lesson.course && lesson.course.difficulty && <Badge variant={ lesson.course.difficulty.toLowerCase() }>{ lesson.course.difficulty }</Badge> }
                                    <Badge>{ lesson.points_gain } points</Badge>
                                    <Badge>+{ lesson.exp_gain } XP</Badge>
                                </div>
                                <div className={ `grid text-nowrap gap-1 text-primary ${lesson.isFinished && "!text-muted-foreground"}` }>
                                    <div className="flex items-center justify-end gap-2">
                                        <p className={ `${(!lesson.isFinished) && "text-white"}` }>{ lesson.points_gain }</p>
                                        <icons.MedalIcon strokeWidth={ 1 } />
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <p className={ `${(!lesson.isFinished) && "text-white"}` }>{ lesson.exp_gain }</p>
                                        <icons.StarIcon strokeWidth={ 1 } />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                )) }
            </div>
        </>
    );
}