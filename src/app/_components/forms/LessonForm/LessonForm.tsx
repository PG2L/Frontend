"use client";

import React, { FC, Suspense } from 'react';
import styles from './LessonForm.module.css';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage, FormDescription } from '@/app/_components/ui/form';
import { Textarea } from '@/app/_components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/_components/ui/select';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Skeleton } from '@/app/_components/ui/skeleton';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    content: z.string().optional(),
    exp_gain: z.coerce.number().int().nonnegative({
        message: "Experience gain must be a nonnegative number.",
    }).optional(),
    points_gain: z.coerce.number().int().nonnegative({
        message: "Points gain must be a nonnegative number.",
    }).optional(),
    lesson_number: z.coerce.number().int().nonnegative({
        message: "Lesson number must be a nonnegative number.",
    }).optional(),
    course: z.coerce.number().int().nonnegative({
        message: "Course must be a nonnegative number.",
    }).optional(),
});

interface LessonFormProps {
    lesson?: {
        id: string,
        title: string,
        description: string,
        content: string,
        exp_gain: number,
        points_gain: number,
        lesson_number: number,
        course: number,
    },
    courses: any[],
}

const LessonForm: FC<LessonFormProps> = ({
    lesson,
    courses,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: lesson ? lesson.title : "",
            description: lesson ? lesson.description : "",
            content: lesson ? lesson.content : "",
            exp_gain: lesson ? lesson.exp_gain : 0,
            points_gain: lesson ? lesson.points_gain : 0,
            lesson_number: lesson ? lesson.lesson_number : 0,
            course: lesson ? lesson.course : 0,
        },
    });

    const onSubmit = async (values: any) => {
        try {
            if (lesson) {
                const response = await fetch(`http://localhost:8000/lessons/${lesson.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to put data');
                }

                const data = await response.json();
                console.log(data);
            } else {
                const response = await fetch('http://localhost:8000/lessons/new', {
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
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Suspense fallback={
            <div className="grid gap-10 sm:gap-12 mt-12">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-24" />
                <Skeleton className="w-full h-24" />
                <div className="grid gap-10 sm:flex sm:gap-6">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-24 h-10 justify-self-center" />
            </div>
        }>
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="grid gap-4 lg:gap-6 mt-6">
                    <FormField
                        control={ form.control }
                        name="title"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title <span className="text-muted-foreground text-xs">(required)</span></FormLabel>
                                <FormControl>
                                    <Input { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Enter a clear and descriptive title for this lesson. The title should give learners an immediate understanding of the lesson&apos;s focus.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <FormField
                        control={ form.control }
                        name="description"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Provide a comprehensive overview of what this lesson covers. Include objectives, key concepts, and any prerequisites. This helps learners understand what to expect and how this lesson fits into the overall course.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <FormField
                        control={ form.control }
                        name="content"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Input the main educational content for this lesson. This can include text, images, code snippets, and links to external resources. Ensure the content is organized and easy to follow for the best learner experience.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <div className="grid gap-4 sm:flex lg:gap-6">
                        <FormField
                            control={ form.control }
                            name="points_gain"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Points gain</FormLabel>
                                    <FormControl>
                                        <Input type="number" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Specify how many points learners can earn by completing this lesson. Points can motivate learners and signify the importance or difficulty of the lesson.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="exp_gain"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Exp gain</FormLabel>
                                    <FormControl>
                                        <Input type="number" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Indicate the amount of experience points (XP) learners will receive upon completing this lesson. XP helps track progress and engagement across the course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <FormField
                        control={ form.control }
                        name="lesson_number"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Lesson number</FormLabel>
                                <FormControl>
                                    <Input type="number" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Assign a lesson number to establish this lesson&apos;s order within the course. This number helps learners navigate the course and understand the sequence of learning.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <FormField
                        control={ form.control }
                        name="course"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Course</FormLabel>
                                <Select onValueChange={ field.onChange } defaultValue={ field.value?.toString() }>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        { courses.map((course) => (
                                            <SelectItem key={ course.id } value={ course.id.toString() }>
                                                { course.id } - { course.title }
                                            </SelectItem>
                                        )) }
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select the course this lesson belongs to. Associating the lesson with its course ensures it&apos;s correctly categorized and accessible to enrolled learners.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form>
        </Suspense>
    );
};

export default LessonForm;