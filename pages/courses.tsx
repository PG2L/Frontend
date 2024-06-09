import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AvatarImage } from '@radix-ui/react-avatar';


export default function Page() {

    const lessonsContent: { title: string, description: string, author: string }[] = [
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
            <div className="container flex flex-col items-center justify-center w-full h-full space-y-4 py-24">
                <h1 className="text-4xl font-medium">Courses</h1>
                {lessonsContent.map((lesson, index) => (
                    <a key={index} className="flex items-center justify-center p-6 gap-6 w-full hover:bg-black/[0.03] rounded-sm cursor-pointer">
                        <div className="dummy w-2/5 bg-black/[0.05] h-64 rounded-xl"></div>
                        <div className="flex flex-col justify-between gap-5 w-3/5">
                            <h2 className="font-medium text-xl">{lesson.title}</h2>
                            <hr />
                            <div className="flex gap-2">
                                <Badge>1 course</Badge>
                                <Badge>6 lessons</Badge>
                                <Badge>+100 000 XP</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {lesson.description}
                            </p>
                            <div className="flex gap-3">
                                <Avatar>
                                    <AvatarImage src={`https://randomuser.me/api/portraits/men/${index + 20}.jpg`} alt="avatar" />
                                </Avatar>
                                <div className="grid">
                                    <p className="text-sm text-muted-foreground">Created by</p>
                                    <p className="font-medium">{lesson.author}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </Layout>
    );
}