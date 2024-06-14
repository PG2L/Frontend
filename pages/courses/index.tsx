import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import * as icons from 'lucide-react';
import Layout from '@/components/Layout/Layout';

async function getData() {
    const res = await fetch('http://localhost:8000/courses')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Page() {

    const [data, setData] = useState<null | any[]>(null);

    useEffect(() => {
        getData().then(data => setData(data)).catch(error => console.error(error));
    }, []);

    // const coursesContent: { title: string, lessonNb: number, lessonsFinished: number, isUnlock: boolean, isFinished: boolean }[] = [
    //     {
    //         title: "Full Stack Development with Node.js and Express",
    //         lessonNb: 5,
    //         lessonsFinished: 4,
    //         isUnlock: true,
    //         isFinished: false
    //     },
    //     {
    //         title: "Machine Learning with Python",
    //         lessonNb: 4,
    //         lessonsFinished: 3,
    //         isUnlock: true,
    //         isFinished: false
    //     },
    //     {
    //         title: "Advanced Python Programming",
    //         lessonNb: 2,
    //         lessonsFinished: 1,
    //         isUnlock: true,
    //         isFinished: false
    //     },
    //     {
    //         title: "Back-End Development with Django",
    //         lessonNb: 8,
    //         lessonsFinished: 3,
    //         isUnlock: true,
    //         isFinished: false
    //     },
    //     {
    //         title: "Front-End Development with Vue.js",
    //         lessonNb: 3,
    //         lessonsFinished: 0,
    //         isUnlock: true,
    //         isFinished: false
    //     },
    //     {
    //         title: "Mobile App Development with React Native",
    //         lessonNb: 2,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "DevOps with Docker and Kubernetes",
    //         lessonNb: 3,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Introduction to Ruby Programming",
    //         lessonNb: 4,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Web Development with Angular",
    //         lessonNb: 3,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Data Analysis with R",
    //         lessonNb: 5,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Mobile App Development with Flutter",
    //         lessonNb: 4,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Game Development with Unity",
    //         lessonNb: 6,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Cybersecurity Basics",
    //         lessonNb: 3,
    //         lessonsFinished: 0,
    //         isUnlock: false,
    //         isFinished: false
    //     },
    //     {
    //         title: "Introduction to Python Programming",
    //         lessonNb: 4,
    //         lessonsFinished: 4,
    //         isUnlock: true,
    //         isFinished: true
    //     },
    //     {
    //         title: "Web Development with JavaScript and React",
    //         lessonNb: 2,
    //         lessonsFinished: 2,
    //         isUnlock: true,
    //         isFinished: true
    //     },
    //     {
    //         title: "Data Structures and Algorithms",
    //         lessonNb: 3,
    //         lessonsFinished: 3,
    //         isUnlock: true,
    //         isFinished: true
    //     }
    // ];
    console.log(data);
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between py-6 gap-4 lg:gap-6 w-full bg-background">
                {data && data.map((course, index) => (
                    <a key={index} href={`/courses/${index + 1}`} >
                        <Card className={`p-2 sm:p-4 border w-full grid gap-2 sm:gap-4 rounded-lg hover:shadow-primary hover:scale-[1.01] ${course.isUnlock && "outline-1 border-primary"} ${course.isFinished && "bg-secondary"}`}>
                            <CardHeader className="grid p-1">
                                <div className={`${course.isFinished ? "bg-card" : "bg-secondary"} h-32 rounded flex justify-center items-center`}>
                                    {course.isFinished &&
                                        <Avatar className="h-32 w-32 flex justify-center items-center">
                                            <icons.Check className="h-16 w-16 text-white"></icons.Check>
                                        </Avatar>
                                    }
                                </div>
                                <div className="flex justify-between gap-1">
                                    {Array.from({ length: course.lessons.length }).map((_, index) => (
                                        <div key={index} className={`w-full h-3 rounded mt-1 bg-secondary`}></div>
                                    ))}
                                </div>
                                <h3 className="text-lg text-nowrap overflow-hidden text-ellipsis">{course.title}</h3>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-start p-1">
                                <div className="flex justify-start items-start gap-1 flex-wrap">
                                    {course.lessons_count && <Badge>{course.lessons_count} lessons</Badge>}
                                    {course.difficulty && <Badge variant={course.difficulty.toLowerCase()}>{course.difficulty}</Badge>}
                                    {course.language && <Badge variant={course.language.name.toLowerCase()}>{course.language.name}</Badge>}
                                    {/* <Badge>{course.points_gain} points</Badge>
                                    <Badge>+{course.exp_gain} XP</Badge> */}
                                </div>
                                <div className={`grid text-nowrap gap-1 text-primary ${course.isFinished && "!text-muted-foreground"}`}>
                                    <div className="flex items-center justify-end gap-2">
                                        <p className={`${(!course.isFinished) && "text-white"}`}>{course.points_gain}</p>
                                        <icons.MedalIcon strokeWidth={1} />
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <p className={`${(!course.isFinished) && "text-white"}`}>{course.exp_gain}</p>
                                        <icons.StarIcon strokeWidth={1} />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </a>
                ))}
            </div>
        </Layout >
    );
}