import React from 'react';
import Layout from "@/components/Layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from '@radix-ui/react-avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';



export default function Page() {

    const coursesContent: { title: string, description: string, author: string }[] = [
        {
            title: "Introduction to Python Programming",
            description: "Master the basics of Python, a popular and versatile programming language. Learn about data types, control flow, functions, and error handling.",
            author: "John Doe"
        },
        {
            title: "Web Development with JavaScript and React",
            description: "Learn how to build dynamic, interactive web applications using JavaScript and React. Understand concepts like JSX, state, props, and React Hooks.",
            author: "Jane Williams"
        },
        {
            title: "Data Structures and Algorithms",
            description: "Improve your problem-solving skills by learning about fundamental data structures and algorithms. This course covers arrays, linked lists, trees, hash tables, and more.",
            author: "Oliver Smith"
        },
        {
            title: "Full Stack Development with Node.js and Express",
            description: "Learn how to build and deploy full-stack web applications using Node.js and Express. Topics include routing, middleware, error handling, and database integration.",
            author: "Alice Johnson"
        },
        {
            title: "Advanced Python Programming",
            description: "Dive deeper into Python and explore advanced topics like decorators, context managers, metaclasses, and asynchronous programming.",
            author: "Bob Brown"
        },
        {
            title: "Machine Learning with Python",
            description: "Learn how to build, train, and deploy machine learning models using Python. Understand concepts like regression, classification, clustering, and neural networks.",
            author: "Eva Green"
        },
        {
            title: "Front-End Development with Vue.js",
            description: "Learn how to build interactive web applications using Vue.js. Understand concepts like directives, components, and Vue Router.",
            author: "Georges Foreman"
        },
        {
            title: "Back-End Development with Django",
            description: "Learn how to build robust, scalable back-end services using Django. Topics include models, views, templates, and Django REST Framework.",
            author: "Hannah Baker"
        },
        {
            title: "Mobile App Development with React Native",
            description: "Learn how to build native mobile applications using React Native. Understand concepts like components, state, props, and navigation.",
            author: "Isaac Newton"
        },
        {
            title: "DevOps with Docker and Kubernetes",
            description: "Learn how to automate deployment, scaling, and management of containerized applications using Docker and Kubernetes.",
            author: "Jack Sparrow"
        }
    ];

    return (
        <Layout>
            <div className="pb-12 pt-36 container items-center justify-end">
                <div className="w-full border rounded-lg p-2">
                    <ScrollArea className="h-96">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                            {coursesContent.map((course, index) => (
                                <Card key={index} className="bg-[#FBF9F9] h-60 w-full p-3">
                                    <CardHeader className="h-[40%]">
                                        <div className="bg-black/[0.03]"></div>
                                    </CardHeader>
                                    <CardContent>
                                        <h2 className="font-medium text-xl">{course.title}</h2>
                                        <hr />
                                    </CardContent>
                                    <CardFooter>
                                    <Badge>1 course</Badge>
                                        <Avatar>
                                            <AvatarImage src="/avatar.jpg" alt="avatar" />
                                            <span>{course.author}</span>
                                        </Avatar>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </Layout>
    );
}