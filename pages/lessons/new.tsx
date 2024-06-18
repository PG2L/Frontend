"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/router';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import TextEditor from '@/components/TextEditor/TextEditor';


const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    content: z.string().min(2, {
        message: "Content must be at least 2 characters.",
    }),
    exp_gain: z.number().int().positive({
        message: "Experience gain must be a positive number.",
    }),
    points_gain: z.number().int().positive({
        message: "Points gain must be a positive number.",
    }),
    lesson_number: z.number().int().positive({
        message: "Lesson number must be a positive number.",
    }),
    course: z.number().int().positive({
        message: "Course must be a positive number.",
    }),
})

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            exp_gain: 0,
            points_gain: 0,
            lesson_number: 0,
            course: 0,
        },
    });

    const [courses, setCourses] = useState<any[]>([]);
    useEffect(() => {
        fetch('http://localhost:8000/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    const onSubmit = async (values: any) => {
        try {
            const response = await fetch(`http://localhost:8000/lessons/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/lessons">Lessons</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>New lesson</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid gap-6 md:flex md:gap-12 items-center justify-between grid-cols-1 mt-6">
                <div className="flex gap-1">
                    <h1 className=" font-medium text-foreground text-nowrap">New lesson</h1>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 lg:gap-6 mt-6 mx-auto">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <TextEditor {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid gap-4 sm:flex lg:gap-6">
                        <FormField
                            control={form.control}
                            name="points_gain"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Points gain</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="exp_gain"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Exp gain</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="lesson_number"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Lesson number</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Course</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form>
        </Layout>
    )
}