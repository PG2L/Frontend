import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from '@radix-ui/react-avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import IndexView from '@/components/IndexView/IndexView';
import * as icons from 'lucide-react';



export default function Page() {

    const coursesContent: { title: string, lessonNb: number, lessonsFinished: number, isUnlock: boolean, isFinished: boolean }[] = [
        {
            title: "Full Stack Development with Node.js and Express",
            lessonNb: 5,
            lessonsFinished: 4,
            isUnlock: true,
            isFinished: false
        },
        {
            title: "Machine Learning with Python",
            lessonNb: 4,
            lessonsFinished: 3,
            isUnlock: true,
            isFinished: false
        },
        {
            title: "Advanced Python Programming",
            lessonNb: 2,
            lessonsFinished: 1,
            isUnlock: true,
            isFinished: false
        },
        {
            title: "Back-End Development with Django",
            lessonNb: 8,
            lessonsFinished: 3,
            isUnlock: true,
            isFinished: false
        },
        {
            title: "Front-End Development with Vue.js",
            lessonNb: 3,
            lessonsFinished: 0,
            isUnlock: true,
            isFinished: false
        },
        {
            title: "Mobile App Development with React Native",
            lessonNb: 2,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "DevOps with Docker and Kubernetes",
            lessonNb: 3,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Introduction to Ruby Programming",
            lessonNb: 4,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Web Development with Angular",
            lessonNb: 3,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Data Analysis with R",
            lessonNb: 5,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Mobile App Development with Flutter",
            lessonNb: 4,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Game Development with Unity",
            lessonNb: 6,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Cybersecurity Basics",
            lessonNb: 3,
            lessonsFinished: 0,
            isUnlock: false,
            isFinished: false
        },
        {
            title: "Introduction to Python Programming",
            lessonNb: 4,
            lessonsFinished: 4,
            isUnlock: true,
            isFinished: true
        },
        {
            title: "Web Development with JavaScript and React",
            lessonNb: 2,
            lessonsFinished: 2,
            isUnlock: true,
            isFinished: true
        },
        {
            title: "Data Structures and Algorithms",
            lessonNb: 3,
            lessonsFinished: 3,
            isUnlock: true,
            isFinished: true
        }
    ];

    return (
        <IndexView>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-2 sm:gap-4 md:gap-6 w-full p-2 sm:p-4 md:p-6 bg-background">
                {coursesContent.map((course, index) => (
                    <a key={index} href={`/courses/${index + 1}`} >
                        <Card className={`p-2 sm:p-4 border w-full grid gap-2 sm:gap-4 rounded-lg ${course.isUnlock && "border-2 border-primary"} ${course.isFinished && "bg-secondary"}`}>
                            <CardHeader className="grid p-1">
                                <div className={`${course.isFinished ? "bg-card" : "bg-secondary"} h-32 rounded flex justify-center items-center`}>
                                    {course.isFinished &&
                                        <Avatar className="h-32 w-32 flex justify-center items-center">
                                            <icons.Check className="h-16 w-16 text-white"></icons.Check>
                                        </Avatar>
                                    }
                                </div>
                                <div className="flex justify-between gap-1">
                                    {Array.from({ length: course.lessonNb }).map((_, index) => (
                                        <div key={index} className={`w-full h-3 rounded mt-1 ${(index <= course.lessonsFinished - 1) ? "bg-primary" : "bg-secondary"} ${(index === course.lessonsFinished) && course.isUnlock && "border-2 border-primary border-solid"}`}></div>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="p-1 min-w-0">
                                <h3 className="text-lg text-nowrap overflow-hidden text-ellipsis font-medium">{course.title}</h3>
                            </CardContent>
                            <CardFooter className="flex justify-between items-start p-1">
                                <div className="flex justify-start items-start gap-1 flex-wrap">
                                    <Badge>1 course</Badge>
                                    <Badge>6 lessons</Badge>
                                    <Badge>5 000 points</Badge>
                                    <Badge>+100 000 XP</Badge>
                                </div>
                                <div className={`grid text-nowrap gap-1 text-primary ${course.isFinished && "!text-muted-foreground"}`}>
                                    <div className="flex items-center justify-end gap-2">
                                        <p className={`${(!course.isFinished) && "text-white"}`}>500</p>
                                        <icons.MedalIcon />
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <p className={`${(!course.isFinished) && "text-white"}`}>15 000</p>
                                        <icons.StarIcon />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </a>
                ))}
            </div>
        </IndexView >
    );
}