"use client";

import React, {
    FC,
    Suspense
} from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/_components/ui/form';
import { Button } from '@/_components/ui/button';
import { Textarea } from '@/_components/ui/textarea';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/_components/ui/select';
import { Input } from '@/_components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Skeleton } from '@/_components/ui/skeleton';
import {
    RadioGroup,
    RadioGroupItem
} from '@/_components/ui/radio-group';

/**
 * Represents the form schema for the course form.
 */
const formSchema = z.object({
    /**
     * The title of the course.
     * Must be at least 2 characters long.
     */
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),

    /**
     * The description of the course (optionnal).
     */
    description: z.string().optional(),

    /**
     * The experience points gain for the course (optionnal).
     * Must be a nonnegative number.
     */
    exp_gain: z.coerce.number().int().nonnegative({
        message: "Points gain must be a positive number.",
    }).optional(),

    /**
     * The points gain for the course (optionnal).
     * Must be a nonnegative number.
     */
    points_gain: z.coerce.number().int().nonnegative({
        message: "Points gain must be a positive number.",
    }).optional(),

    /**
     * The number of lessons in the course (optionnal).
     * Must be a nonnegative number.
     */
    lessons_count: z.coerce.number().int().nonnegative({
        message: "Lesson number must be a positive number.",
    }).optional(),

    /**
     * Indicates whether the course is free or not.
     */
    is_free: z.coerce.boolean(),

    /**
     * The number of lessons in the course (optionnal).
     * Must be a nonnegative number.
     */
    lesson_count: z.coerce.number().int().nonnegative({
        message: "Lesson number must be a positive number.",
    }).optional(),

    /**
     * The difficulty level of the course (optionnal).
     */
    difficulty: z.enum([
        'Beginner',
        'Novice',
        'Intermediate',
        'Advanced',
        'Expert',
        'Master',
        'Master+',
    ]).optional(),

    /**
     * The price of the course (optionnal).
     */
    price: z.coerce.number().int().nonnegative({
        message: "Price must be a positive number.",
    }).optional(),

    /**
     * The category of the course (optionnal).
     * Must be a nonnegative number.
     */
    category: z.coerce.number().int().nonnegative({
        message: "Category must be a positive number.",
    }).optional(),

    /**
     * The language of the course (optionnal).
     * Must be a nonnegative number.
     */
    language: z.coerce.number().int().nonnegative({
        message: "Language must be a positive number.",
    }).optional(),
});

interface CourseFormProps {
    categories: Category[];
    languages: Language[];
    course?: Course;
}

/**
 * Represents a form for creating or updating a course.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.categories - The list of available categories.
 * @param {Array} props.languages - The list of available languages.
 * @param {Object} props.course - The course object to be updated (optional).
 * @returns {JSX.Element} The rendered CourseForm component.
 */
const CourseForm: FC<CourseFormProps> = ({
    categories,
    languages,
    course,
}: CourseFormProps): React.JSX.Element => {

    /**
     * Creates a form using the useForm hook from react-hook-form library.
     * The form is initialized with default values based on the potentially provided course object.
     *
     * @param course - The course object to populate the form with.
     * @returns The form object with resolver and default values.
     */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:
            course ? {
                title: course.title,
                description: course.description,
                exp_gain: course.exp_gain,
                points_gain: course.points_gain,
                is_free: course.is_free,
                lesson_count: course.lessons_count,
                difficulty: course.difficulty,
                price: course.price,
                category: course.category.id,
                language: course.language.id,
            } : {
                title: "",
                description: "",
                exp_gain: 0,
                points_gain: 0,
                is_free: true,
                lesson_count: 0,
                difficulty: "Beginner",
                price: 0,
                category: 0,
            }
    });

    /**
     * Submits the form data to the server.
     * 
     * @param {any} values - The form values to be submitted.
     * @returns {Promise<void>} - A promise that resolves when the submission is complete.
     */
    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {
        try {
            if (course) { // If the course object is provided, update the course
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
            } else { // If the course object is not provided, create a new course
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
            <div className="space-y-10 md:space-y-12 mt-12">
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

            { <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="grid gap-4 lg:gap-6 mt-6">

                    {/* Title field with validation and description */ }
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

                    {/* Description field with a larger text area for detailed course information */ }
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

                    {/* Points and experience gain fields for gamification */ }
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

                    {/* Difficulty selection with predefined options */ }
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
                                            {/* Options ranging from Beginner to Master+ */ }
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Novice">Novice</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Advanced">Advanced</SelectItem>
                                            <SelectItem value="Expert">Expert</SelectItem>
                                            <SelectItem value="Master">Master</SelectItem>
                                            <SelectItem value="Master+">Master+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select the difficulty level of your course. This helps learners choose courses that match their skill level. Options range from Beginner, Intermediate, to Master and Master+.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />

                        {/* Lessons count field for course structure */ }
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

                    {/* Category and language selection with dynamic options */ }
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
                                            {
                                                // Mapping over the categories to display each one as a selectable option
                                                categories.map((category) => (
                                                    <SelectItem key={ category.id } value={ category.id.toString() }>
                                                        { category.id } - { category.name }
                                                    </SelectItem>
                                                ))
                                            }
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
                                            {
                                                // Mapping over the languages to display each one as a selectable option
                                                languages.map((language) => (
                                                    <SelectItem key={ language.id } value={ language.id.toString() }>
                                                        { language.id } - { language.name }
                                                    </SelectItem>
                                                ))
                                            }
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

                    {/* Free or paid course selection with conditional price input */ }
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
                                                <FormLabel className="font-normal">Yes</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="no" />
                                                </FormControl>
                                                <FormLabel className="font-normal">No</FormLabel>
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

                    {/* Submit button for the form */ }
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form>
            }

        </Suspense>

    );
};

export default CourseForm;
