"use client";

import React, { FC } from 'react';
import styles from './CourseForm.module.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup } from '@radix-ui/react-context-menu';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    exp_gain: z.number().int().positive({
        message: "Experience gain must be a positive number.",
    }),
    points_gain: z.number().int().positive({
        message: "Points gain must be a positive number.",
    }),
    lessons_count: z.number().int().positive({
        message: "Lesson number must be a positive number.",
    }),
    is_free: z.boolean(),
    lesson_count: z.number().int().positive({
        message: "Lesson number must be a positive number.",
    }),
    difficulty: z.string().min(2, {
        message: "Difficulty must be at least 2 characters.",
    }),
    price: z.number().int().positive({
        message: "Price must be a positive number.",
    }),
    category_id: z.number().int().positive({
        message: "Category must be a positive number.",
    }),
    language_id: z.number().int().positive({
        message: "Language must be a positive number.",
    }),
})

interface CourseFormProps {
    onSubmitHandler: (data: z.infer<typeof formSchema>) => void;
    categories: { id: number, name: string }[];
    languages: { id: number, name: string }[];
    course: {
        title: string;
        description: string;
        exp_gain: number;
        points_gain: number;
        is_free: boolean;
        lesson_count: number;
        difficulty: string;
        price: number;
        category_id: number;
        language_id: number;
    };
}

const CourseForm: FC<CourseFormProps> = ({
    onSubmitHandler,
    categories,
    languages,
    course,
} : CourseFormProps) => {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            exp_gain: 0,
            points_gain: 0,
            is_free: true,
            lesson_count: 0,
            difficulty: "",
            price: 0,
            category_id: 0,
            language_id: 0,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)} className="grid gap-4 lg:gap-6 mt-6 mx-auto">
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
                <div className="grid gap-4 sm:flex lg:gap-6">
                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Difficulty</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lessons_count"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Lessons count</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-4 sm:flex lg:gap-6">
                    <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="language_id"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Language</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a language" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {languages.map((language) => (
                                            <SelectItem key={language.id} value={language.id}>
                                                {language.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-4 sm:flex lg:gap-6">
                    <FormField
                        control={form.control}
                        name="is_free"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Is it free ?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={true} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Yes
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={false} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                No
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
            </form>
        </Form>
    )
};

export default CourseForm;
