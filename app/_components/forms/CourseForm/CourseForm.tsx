"use client";

import React, { FC, Suspense } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../ui/select';
import { Input } from '../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Skeleton } from '../../ui/skeleton';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    exp_gain: z.coerce.number().int().nonnegative({
        message: "Points gain must be a positive number.",
    }).optional(),
    points_gain: z.coerce.number().int().nonnegative({
        message: "Points gain must be a positive number.",
    }).optional(),
    lessons_count: z.coerce.number().int().nonnegative({
        message: "Lesson number must be a positive number.",
    }).optional(),
    is_free: z.coerce.boolean(),
    lesson_count: z.coerce.number().int().nonnegative({
        message: "Lesson number must be a positive number.",
    }).optional(),
    difficulty: z.enum([
        'Beginner',
        'Novice',
        'Intermediate',
        'Advanced',
        'Expert',
        'Master',
        'Master+',
    ]).optional(),
    price: z.coerce.number().int().nonnegative({
        message: "Price must be a positive number.",
    }).optional(),
    category: z.coerce.number().int().nonnegative({
        message: "Category must be a positive number.",
    }).optional(),
    language: z.coerce.number().int().nonnegative({
        message: "Language must be a positive number.",
    }).optional(),
});

interface CourseFormProps {
    categories: {
        id: number,
        name: string;
    }[];
    languages: {
        id: number,
        name: string;
    }[];
    course?: {
        id: number;
        title: string;
        description?: string;
        exp_gain?: number;
        points_gain?: number;
        is_free?: boolean;
        lesson_count?: number;
        difficulty?: "Beginner" | "Novice" | "Intermediate" | "Advanced" | "Expert" | "Master" | "Master+";
        price?: number;
        category?: number;
        language?: number;
    };
}

const CourseForm: FC<CourseFormProps> = ({
    categories,
    languages,
    course,
}): React.JSX.Element => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course ? course.title : "",
            description: course ? course.description : "",
            exp_gain: course ? course.exp_gain : 0,
            points_gain: course ? course.points_gain : 0,
            is_free: course ? course.is_free : true,
            lesson_count: course ? course.lesson_count : 0,
            difficulty: course ? course.difficulty : "Beginner",
            price: course ? course.price : 0,
            category: course ? course.category : 0,
            language: course ? course.language : 0,
        },
    });

    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {
        try {
            if (course) {
                const response = await fetch(`http://localhost:8000/courses/${course.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to put data');
                }

                const data: any = await response.json();
                console.log(data);
            } else {
                const response = await fetch('http://localhost:8000/courses/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to post data');
                }

                const data: any = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Suspense fallback={
            <div className="grid gap-10 md:gap-12 mt-12">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-24" />
                <div className="grid gap-10 sm:flex sm:gap-6">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <div className="grid gap-10 sm:flex sm:gap-6">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <div className="grid gap-10 sm:flex sm:gap-6">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <div className="grid gap-10 sm:flex sm:gap-6">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-24 h-10 justify-self-center" />
            </div>
        }>
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="grid gap-4 lg:gap-6 mt-6">
                    <FormField
                        control={ form.control }
                        name="title"
                        render={ ({ field }): React.JSX.Element => (
                            <FormItem className="w-full">
                                <FormLabel>Title <span className="text-xs text-muted-foreground font-normal">(required)</span></FormLabel>
                                <FormControl>
                                    <Input { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Enter a concise and informative title for your course. This is the first thing learners will see, so make it catchy and relevant to the course content.
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
                                    Provide a detailed overview of your course. Include what learners will achieve, the topics covered, and any prerequisites. This is your chance to convince learners why they should enroll.
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
                                        Specify the total points learners can earn by completing this course. Points motivate learners and reflect the effort required to complete the course.
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
                                        Indicate the experience points (XP) learners will gain upon course completion. XP helps learners track their progress and growth on the platform.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <div className="grid gap-4 sm:flex lg:gap-6">
                        <FormField
                            control={ form.control }
                            name="difficulty"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Difficulty</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={ field?.value }>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a difficulty" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Beginner">
                                                Beginner
                                            </SelectItem>
                                            <SelectItem value="Novice">
                                                Novice
                                            </SelectItem>
                                            <SelectItem value="Intermediate">
                                                Intermediate
                                            </SelectItem>
                                            <SelectItem value="Advanced">
                                                Advanced
                                            </SelectItem>
                                            <SelectItem value="Expert">
                                                Expert
                                            </SelectItem>
                                            <SelectItem value="Master">
                                                Master
                                            </SelectItem>
                                            <SelectItem value="Master+">
                                                Master+
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select the difficulty level of your course. This helps learners choose courses that match their skill level. Options range from Beginner, Intermediate, to Master and Master+.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="lessons_count"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Lessons count</FormLabel>
                                    <FormControl>
                                        <Input type="number" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the total number of lessons included in this course. This gives learners an idea of the course&apos;s scope and structure.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <div className="grid gap-4 sm:flex lg:gap-6">
                        <FormField
                            control={ form.control }
                            name="category"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={ field.value?.toString() }>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            { categories.map((category: {
                                                id: number;
                                                name: string;
                                            }): React.JSX.Element => (
                                                <SelectItem key={ category.id } value={ category.id.toString() }>
                                                    { category.id } - { category.name }
                                                </SelectItem>
                                            )) }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose the category that best fits your course. A relevant category improves course discoverability for interested learners.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="language"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Language</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={ field.value?.toString() }>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a language" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            { languages.map((language: {
                                                id: number;
                                                name: string;
                                            }): React.JSX.Element => (
                                                <SelectItem key={ language.id } value={ language?.id.toString() }>
                                                    { language.id } - { language.name }
                                                </SelectItem>
                                            )) }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select the primary language used in your course content. This ensures learners are aware of the language requirements before enrolling.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <div className="grid gap-4 sm:flex lg:gap-6">
                        <FormField
                            control={ form.control }
                            name="is_free"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Is it free ?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={ field.onChange }
                                            defaultValue={ field.value?.toString() }
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="yes" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Yes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="no" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Indicate whether your course is free or paid. Free courses can attract more learners but consider charging for courses with extensive resources or professional value.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={ form.control }
                            name="price"
                            render={ ({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" { ...field } />
                                    </FormControl>
                                    <FormDescription>
                                        If your course is paid, set a price. Consider the depth and breadth of your content, as well as your target audience, when setting the price.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form>
        </Suspense>
    );
};

export default CourseForm;