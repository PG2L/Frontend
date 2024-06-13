import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from '@radix-ui/react-avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import IndexView from '@/components/IndexView/IndexView';
import * as icons from 'lucide-react';

export default function Page() {

    const lessons: { title: string, course: string, isUnlock: boolean, isFinished: boolean, difficulty: string, exp: number, points: number }[] = [
        {
            title: "Introduction to Python",
            course: "Python Programming",
            isUnlock: true,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Data Structures",
            course: "Python Programming",
            isUnlock: true,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Functions",
            course: "Python Programming",
            isUnlock: true,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python OOP",
            course: "Python Programming",
            isUnlock: true,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Modules",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Exceptions",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python File Handling",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Libraries",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Web Development",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Automation",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Exceptions",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python File Handling",
            course: "Python Programming",
            isUnlock: false,
            isFinished: false,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Libraries",
            course: "Python Programming",
            isUnlock: true,
            isFinished: true,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Web Development",
            course: "Python Programming",
            isUnlock: true,
            isFinished: true,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        },
        {
            title: "Python Automation",
            course: "Python Programming",
            isUnlock: true,
            isFinished: true,
            difficulty: "Beginner",
            exp: 100,
            points: 10
        }
    ]

    return (
        <IndexView>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-2 sm:gap-4 w-full sm:p-4 p-2 bg-background">
                {lessons.map((lesson, index) => (
                    <a key={index} href={`/lessons/${index + 1}`} >
                        <Card className={`p-2 sm:p-4 border w-full grid gap-2 sm:gap-4 rounded-lg ${lesson.isUnlock && "outline outline-primary outline-2"} ${lesson.isFinished && "bg-secondary"}`}>
                            <CardHeader className="grid p-1">
                                <div className={`${lesson.isFinished ? "bg-card" : "bg-secondary"} h-32 rounded flex justify-center items-center`}>
                                    {lesson.isFinished &&
                                        <Avatar className="h-32 w-32 flex justify-center items-center">
                                            <icons.Check strokeWidth={1} className="h-16 w-16 text-white"></icons.Check>
                                        </Avatar>
                                    }
                                </div>
                                <span className="text-sm text-muted-foreground text-end">{lesson.course}</span>
                                <h3 className="text-lg text-nowrap overflow-hidden text-ellipsis font-medium !mt-0">{lesson.title}</h3>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-start p-1">
                                <div className="flex justify-start items-start gap-1 flex-wrap">
                                    <Badge>1 lesson</Badge>
                                    <Badge>6 lessons</Badge>
                                    <Badge>5 000 points</Badge>
                                    <Badge>+100 000 XP</Badge>
                                </div>
                                <div className={`grid text-nowrap gap-1 text-primary ${lesson.isFinished && "!text-muted-foreground"}`}>
                                    <div className="flex items-center justify-end gap-2">
                                        <p className={`${(!lesson.isFinished) && "text-white"}`}>500</p>
                                        <icons.MedalIcon strokeWidth={1} />
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <p className={`${(!lesson.isFinished) && "text-white"}`}>15 000</p>
                                        <icons.StarIcon strokeWidth={1} />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </a>
                ))}
            </div>
        </IndexView>
    )
}