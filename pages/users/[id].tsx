/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from '@radix-ui/react-avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import IndexView from '@/components/IndexView/IndexView';
import * as icons from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { Button } from '@/components/ui/button';

export default function Page() {

    const menuContent: {
        name: string,
        content: {
            name: string,
            value: number,
        }[];
    }[] = [
            {
                "name": "Courses & Lessons",
                "content": [
                    {
                        "name": "Courses completed",
                        "value": 5
                    },
                    {
                        "name": "Lessons completed",
                        "value": 18
                    },
                    {
                        "name": "*",
                        "value": 3
                    },
                    {
                        "name": "* *",
                        "value": 5
                    },
                    {
                        "name": "* * *",
                        "value": 4
                    },
                    {
                        "name": "* * * *",
                        "value": 5
                    },
                    {
                        "name": "* * * * *",
                        "value": 1
                    }
                ]
            },
            {
                "name": "Achievements",
                "content": [
                    {
                        "name": "Achievements completed",
                        "value": 18
                    },
                    {
                        "name": "Achievements failed",
                        "value": 5
                    },
                    {
                        "name": "Achievements in progress",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Badges",
                "content": [
                    {
                        "name": "Badges completed",
                        "value": 5
                    },
                    {
                        "name": "Badges failed",
                        "value": 18
                    }
                ]
            },
            {
                "name": "Quests",
                "content": [
                    {
                        "name": "Quests completed",
                        "value": 18
                    },
                    {
                        "name": "Quests failed",
                        "value": 5
                    },
                    {
                        "name": "Quests in progress",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Rewards",
                "content": [
                    {
                        "name": "Rewards claimed",
                        "value": 5
                    },
                    {
                        "name": "Rewards pending",
                        "value": 18
                    }
                ]
            },
            {
                "name": "Stats",
                "content": [
                    {
                        "name": "Total XP",
                        "value": 18
                    },
                    {
                        "name": "Total XP earned",
                        "value": 5
                    },
                    {
                        "name": "Total XP spent",
                        "value": 3
                    },
                    {
                        "name": "Total XP lost",
                        "value": 5
                    },
                ]
            },
            {
                "name": "Progress",
                "content": [
                    {
                        "name": "Progress to next level",
                        "value": 18
                    },
                    {
                        "name": "Progress to next rank",
                        "value": 5
                    },
                    {
                        "name": "Progress to next badge",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Rank",
                "content": [
                    {
                        "name": "Rank",
                        "value": 18
                    },
                    {
                        "name": "Rank progress",
                        "value": 5
                    },
                    {
                        "name": "Rank progress to next rank",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Level",
                "content": [
                    {
                        "name": "Level",
                        "value": 18
                    },
                    {
                        "name": "Level progress",
                        "value": 5
                    },
                    {
                        "name": "Level progress to next level",
                        "value": 3
                    }
                ]
            }
        ]

    return (
        <IndexView>
            <div className="grid lg:flex gap-4 grid-cols-1 rounded-lg p-2 sm:p-4">
                <div className="grid grid-cols-1 gap-4 h-fit w-full lg:w-1/3">
                    <Card className="hidden sm:block w-full">
                        <CardHeader className="flex justify-center items-center gap-4 rounded">
                            <h1 className="text-xl font-medium text-center">Profil</h1>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardContent className="p-4 lg:pt-12 rounded outline outline-1 outline-primary grid gap-4 lg:gap-6 justify-items-center">
                            <icons.UserCircleIcon className="h-24 w-24" strokeWidth={1} />
                            <div className="grid grid cols-1 gap-2 lg:gap-6 justify-items-center justify-center">
                                <div className="grid gap-2">
                                    <h3 className="text-lg flex items-end text-primary font-medium text-center justify-center">
                                        <icons.ChevronLeftIcon className="h-6 text-white w-6" />
                                        Order of the PG2L Gardians
                                        <icons.ChevronRightIcon className="h-6 w-6 text-white" />
                                    </h3>
                                    <h1 className="text-4xl font-medium text-center">Nakkarst</h1>
                                    <div className="flex items-center text-center justify-center text-lg">
                                        <div className="text-muted-foreground">Lvl 68</div>
                                        <icons.Dot className="h-4 w-4 text-primary" />
                                        <div className="text-muted-foreground">Rank 1</div>
                                    </div>
                                    <div className="flex flex-wrap justify-center items-center my-auto gap-1">
                                        <Badge>Beginner</Badge>
                                        <Badge>Fast Learner</Badge>
                                        <Badge>React Expert</Badge>
                                        <Badge>Python Master</Badge>
                                        <Badge>Hacker</Badge>
                                    </div>
                                </div>
                                <div className="text-muted-foreground text-center">
                                    <p>France</p>
                                    <p>Since <span>12 . 05 . 2024</span> </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="grid gap-2">
                        <Button className="w-full">Add friend</Button>
                        <div className="grid gap-2 sm:flex">
                            <Button variant="secondary" className="w-full">Send message</Button>
                            <Button variant="secondary" className="w-full">Edit profile</Button>
                        </div>
                    </div>
                </div>
                <div className="lg:w-2/3 h-fit grid gap-4">
                    <Card className="lg:order-last">
                        <CardHeader>
                            <Collapsible className="text-xl font-medium">
                                <CollapsibleTrigger asChild>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-medium">Show quests logs</h2>
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
                    <Card>
                        <CardHeader className="gap-6 h-fit grid grid-cols-1 justify-start sm:flex sm:flex-row items-start">
                            <div className="grid gap-4 w-full">
                                {menuContent.map((item, index) => (
                                    index <= 4 && (
                                        <div key={index} className="flex flex-col">
                                            <h2 className="text-lg font-medium mb-2">{item.name}</h2>
                                            {item.content.map((content, index) => (
                                                <div key={index} className="flex justify-between border-b">
                                                    <h3 className="text-muted-foreground">{content.name}</h3>
                                                    <h3 className="text-white">{content.value}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="grid gap-4 w-full justify-content-start !mt-0">
                                {menuContent.map((item, index) => (
                                    index > 4 && (
                                        <div key={index} className="flex flex-col">
                                            <h2 className="text-lg font-medium mb-2">{item.name}</h2>
                                            {item.content.map((content, index) => (
                                                <div key={index} className="flex justify-between border-b">
                                                    <h3 className="text-muted-foreground">{content.name}</h3>
                                                    <h3 className="text-white">{content.value}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </IndexView >
    )
}