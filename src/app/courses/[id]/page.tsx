/* eslint-disable react/no-unescaped-entities */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import * as icons from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export async function getData(id: string) {

    const res = await fetch(`http://localhost:8000/courses/1`);

    console.log('yoyo')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = res.json();

    return data;
}

export default async function Page({ 
    params,
}: {
    params: {
        id: string,
    };
}) {

    const data = await getData(params.id);

    return (
        data &&
        <>
            
                    <Card>
                        <Link href={`/courses/1`}>
                            <CardHeader className="flex justify-center items-center gap-4 rounded outline outline-1 outline-primary hover:shadow-secondary hover:scale-[1.01]">
                                <h1 className="font-medium text-center">{data['title']}</h1>
                                <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                    {data.language && data.language.name && <Badge variant={data.language.name.toLowerCase()}>{data.language.name}</Badge>}
                                    {data.difficulty && <Badge variant={data.difficulty.toLowerCase()}>{data.difficulty}</Badge>}
                                    <Badge>{data.points_gain} points</Badge>
                                    <Badge>+{data.exp_gain} xp</Badge>
                                </div>
                            </CardHeader>
                        </Link>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-4">
                                {data.lessons && data.lessons.map((lesson, index) => (
                                    <Link key={index} href={`/lessons/${lesson.id}`}>
                                        <Card className={`${lesson.isFinished && "bg-secondary"} hover:shadow-secondary hover:scale-[1.01] hover:border-primary outline outline-1 outline-secondary`}>
                                            <CardHeader>
                                                <h2>{index + 1} .  {lesson.title}</h2>
                                            </CardHeader>
                                            <CardFooter>
                                                <div className="flex flex-wrap gap-1 justify-start items-center">
                                                    {/* {lesson.badges.map((badge, index) => (
                                                    <Badge key={index}>{badge}</Badge>
                                                ))} */}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                <div className="md:w-2/3 grid gap-4 lg:gap-6">
                    <Card className="outline outline-1 outline-primary">
                        <CardHeader>
                            <div className="hidden sm:block py-36 bg-secondary rounded"></div>
                            <div className="grid grid-cols-1">
                                <div className="flex gap-2">
                                    {data.lessons && data.lessons.map((lesson, index) => (
                                        <div key={index} className={`h-3 w-1/3 rounded ${lesson.isFinished ? "bg-primary" : "bg-secondary"} ${lesson.isUnlock && "outline outline-1 outline-primary"}`}></div>
                                    ))}
                                </div>
                                <p className="text-muted-foreground text-end">0%</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div className="grid gap-4">
                                    <h1 className="text-lg font-medium">{data.title}</h1>
                                    <div className="flex gap-1 flex-wrap">
                                        {data.language && data.language.name && <Badge variant={data.language.name.toLowerCase()}>{data.language.name}</Badge>}
                                        {data.difficulty && <Badge variant={data.difficulty.toLowerCase()}>{data.difficulty}</Badge>}
                                        <Badge>{data.points_gain} points</Badge>
                                        <Badge>+{data.exp_gain} xp</Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full text-nowrap gap-2 items-end justify-end">
                                    <div className="flex gap-2">
                                        {data.points_gain}
                                        <icons.LucideStar strokeWidth={1} color="#1461cc" />
                                    </div>
                                    <div className="flex gap-2">
                                        {data.exp_gain}
                                        <icons.LucideMedal strokeWidth={1} color="#1461cc" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="grid w-full grid-cols-1 sm:flex sm:justify-between gap-6">
                                <div className="flex items-end gap-6">
                                    <div className="flex gap-1">
                                        <icons.BookUser strokeWidth={1} color="#1461cc" />
                                        <span className="text-muted-foreground">18 000+ students</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <icons.Clock strokeWidth={1} color="#1461cc" />
                                        <span className="text-muted-foreground">5h</span>
                                    </div>
                                </div>
                                <Button size="lg" className="w-full sm:w-1/2">Continue</Button>
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
                                        {data.lessons && data.lessons.map((lesson, index) => (
                                            <Card key={index} className={`${lesson.isFinished && "bg-secondary"} ${lesson.isUnlock && "outline outline-1 outline-primary"}`}>
                                                <CardHeader>
                                                    <h2>{lesson.title}</h2>
                                                </CardHeader>
                                                <CardFooter>
                                                    <div className="flex flex-wrap gap-1 justify-start items-center">
                                                        {/* {lesson.badges.map((badge, index) => (
                                                            <Badge key={index}>{badge}</Badge>
                                                        ))} */}
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardHeader>
                    </Card>
                    <Card className="text-muted-foreground">
                        <CardHeader>
                            {data.description}
                        </CardHeader>
                    </Card>
                </div>
        </>
    )
}