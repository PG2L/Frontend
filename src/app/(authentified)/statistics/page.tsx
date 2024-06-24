import React, { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import * as icons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';


async function getData() {
    const response = await fetch('http://localhost:8000/courses')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Page() {

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
        <div className="w-full flex gap-6 justify-between">
            <div className="grid gap-4 w-[37.5%]">
                {menuContent.map((item, index) => (
                    index <= 3 && (
                        <div key={index} className="flex flex-col">
                            <h2 className=" font-medium mb-2">{item.name}</h2>
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
            <div className="grid gap-4 w-[37.5%]">
                {menuContent.map((item, index) => (
                    index > 3 && (
                        <div key={index} className="flex flex-col">
                            <h2 className=" font-medium mb-2">{item.name}</h2>
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
            <ProfileSidebar />
        </div>
    );
}