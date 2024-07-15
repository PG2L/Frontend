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
} from '../../ui/form';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '../../ui/select';
import { Input } from '../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Skeleton } from '../../ui/skeleton';
import {
    RadioGroup,
    RadioGroupItem
} from '../../ui/radio-group';

/**
 * Represents the form schema for the assessment form.
 */
const formSchema = z.object({
    /**
     * The title of the assessment.
     * Must be at least 2 characters long.
     */
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),

    /**
     * The description of the assessment (optionnal).
     */
    description: z.string().optional(),

    /**
     * The maximum score for the assessment (optionnal).
     * Must be a nonnegative number.
     */
    max_score: z.coerce.number().int().nonnegative({
        message: "Points gain must be a positive number.",
    }).optional(),

    /**
     * The passing score for the assessment (optionnal).
     * Must be a nonnegative number.
     */
    passing_score: z.coerce.number().int().nonnegative({
        message: "Points gain must be a positive number.",
    }).optional(),

    /**
     * The lesson related to the assessment.
     * Must be a nonnegative number.
     */
    lesson: z.coerce.number().int().nonnegative({
        message: "Lesson must be a positive number.",
    }),
});

interface AssessmentFormProps {
    lessons: Lesson[];
    assessment?: Assessment;
}

/**
 * Represents a form for creating or updating a assessment.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.lessons - The list of available lessons.
 * @param {Object} props.assessment - The assessment object to be updated (optional).
 * @returns {JSX.Element} The rendered AssessmentForm component.
 */
const AssessmentForm: FC<AssessmentFormProps> = ({
    lessons,
    assessment,
}: AssessmentFormProps): React.JSX.Element => {

    /**
     * Creates a form using the useForm hook from react-hook-form library.
     * The form is initialized with default values based on the potentially provided assessment object.
     *
     * @param assessment - The assessment object to populate the form with.
     * @returns The form object with resolver and default values.
     */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:
            assessment ? {
                title: assessment.title,
                description: assessment.description,
                max_score: assessment.max_score,
                passing_score: assessment.passing_score,
                lesson: assessment.lesson.id,
            } : {
                title: '',
                description: '',
                max_score: 0,
                passing_score: 0,
                lesson: 0,
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
            if (assessment) { // If the assessment object is provided, update the assessment
                const response = await fetch(`http://localhost:8000/assessments/${assessment.id}`, {
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
            } else { // If the assessment object is not provided, create a new assessment
                const response = await fetch('http://localhost:8000/assessments/new', {
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
                                    Enter the title of the assessment. This will be displayed to learners when they view the assessment.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Description field with a larger text area for detailed assessment information */ }
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
                                    Enter a description for the assessment. This will provide learners with additional information about the assessment.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Max score field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="max_score"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Max Score</FormLabel>
                                <FormControl>
                                    <Input { ...field } type="number" />
                                </FormControl>
                                <FormDescription>
                                    Enter the maximum score for the assessment. This will determine the total number of points that learners can earn.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Passing score field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="passing_score"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Passing Score</FormLabel>
                                <FormControl>
                                    <Input { ...field } type="number" />
                                </FormControl>
                                <FormDescription>
                                    Enter the passing score for the assessment. Learners must score above this threshold to successfully complete the assessment.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Lesson field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="lesson"
                        render={ ({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Lesson <span className="text-xs text-muted-foreground font-normal">(required)</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={ field.onChange } defaultValue={ field.value?.toString() }>
                                        <SelectTrigger />
                                        <SelectContent>
                                            { lessons.map((lesson: Lesson, index: number): React.JSX.Element => (
                                                <SelectItem key={ index } value={ lesson.id.toString() }>
                                                    { lesson.title }
                                                </SelectItem>
                                            )) }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Select the lesson that this assessment is associated with. The assessment will be displayed to learners after they complete this lesson.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Submit button for the form */ }
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form> }

        </Suspense>

    );
};

export default AssessmentForm;
