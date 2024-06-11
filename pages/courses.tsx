import React from 'react';
import Layout from "@/components/Layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
// import { Icons } from '@/components/icons';
import { icons } from 'lucide-react';
import { AvatarImage } from '@radix-ui/react-avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';



export default function Page() {

    const coursesContent: { title: string, description: string, author: string, lessonNb: number }[] = [
        {
            title: "Introduction to Python Programming",
            description: "Master the basics of Python, a popular and versatile programming language. Learn about data types, control flow, functions, and error handling.",
            author: "John Doe",
            lessonNb: 4,
        },
        {
            title: "Web Development with JavaScript and React",
            description: "Learn how to build dynamic, interactive web applications using JavaScript and React. Understand concepts like JSX, state, props, and React Hooks.",
            author: "Jane Williams",
            lessonNb: 2,
        },
        {
            title: "Data Structures and Algorithms",
            description: "Improve your problem-solving skills by learning about fundamental data structures and algorithms. This course covers arrays, linked lists, trees, hash tables, and more.",
            author: "Oliver Smith",
            lessonNb: 3,
        },
        {
            title: "Full Stack Development with Node.js and Express",
            description: "Learn how to build and deploy full-stack web applications using Node.js and Express. Topics include routing, middleware, error handling, and database integration.",
            author: "Alice Johnson",
            lessonNb: 5
        },
        {
            title: "Advanced Python Programming",
            description: "Dive deeper into Python and explore advanced topics like decorators, context managers, metaclasses, and asynchronous programming.",
            author: "Bob Brown",
            lessonNb: 2
        },
        {
            title: "Machine Learning with Python",
            description: "Learn how to build, train, and deploy machine learning models using Python. Understand concepts like regression, classification, clustering, and neural networks.",
            author: "Eva Green",
            lessonNb: 4
        },
        {
            title: "Front-End Development with Vue.js",
            description: "Learn how to build interactive web applications using Vue.js. Understand concepts like directives, components, and Vue Router.",
            author: "Georges Foreman",
            lessonNb: 3
        },
        {
            title: "Back-End Development with Django",
            description: "Learn how to build robust, scalable back-end services using Django. Topics include models, views, templates, and Django REST Framework.",
            author: "Hannah Baker",
            lessonNb: 3
        },
        {
            title: "Mobile App Development with React Native",
            description: "Learn how to build native mobile applications using React Native. Understand concepts like components, state, props, and navigation.",
            author: "Isaac Newton",
            lessonNb: 2
        },
        {
            title: "DevOps with Docker and Kubernetes",
            description: "Learn how to automate deployment, scaling, and management of containerized applications using Docker and Kubernetes.",
            author: "Jack Sparrow",
            lessonNb: 3,
        }
    ];

    return (
        <Layout>
            <div className="pb-12 pt-36 container items-center">
                <ScrollArea className="h-screen p-1 w-full border rounded-lg bg-white">
                    <div className="grid grid-cols-1 items-center justify-between gap-1 rounded-lg w-full">
                        {coursesContent.map((course, index) => (
                            <div key={index} className="p-2 bg-[#FBF9F9] border w-full grid gap-2 rounded">
                                <div className="grid">
                                    <div className="bg-black/[0.05] h-32"></div>
                                    <div className="flex justify-between gap-1">
                                    {Array.from({ length: course.lessonNb }).map((_, index) => (
                                        <div key={index} className="w-full h-1 mt-1 bg-black/[0.05]"></div>
                                    ))}
                                    </div>
                                </div>
                                <h3 className="text-lg text-nowrap overflow-hidden text-ellipsis">{course.title}</h3>
                                <div className="flex justify-between">
                                    <div className="flex justify-start items-start gap-1 flex-wrap">
                                        <Badge>1 course</Badge>
                                        <Badge>6 lessons</Badge>
                                        <Badge>8 exercices</Badge>
                                        <Badge>+100 000 XP</Badge>
                                    </div>
                                    <div className="grid text-nowrap">
                                        <div className="flex items-center">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src="https://img.icons8.com/?size=100&id=JUqatp7GzFaD&format=png&color=000000">
                                                </AvatarImage>
                                            </Avatar>
                                            500
                                        </div>
                                        <div className="flex items-center">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src="https://img.icons8.com/?size=100&id=54309&format=png&color=000000">
                                                </AvatarImage>
                                            </Avatar>
                                            15 000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </Layout>
    );
}