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
import { Input } from '@/_components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Represents the form schema for the question form.
 */
const formSchema = z.object({
    /**
     * The content of the question.
     * Must be at least 2 characters long.
     */
    content: z.string().min(2, {
        message: "Content must be at least 2 characters.",
    }),

    /**
     * The type of the question.
     * Must be at least 2 characters long.
     */
    type: z.string().min(2, {
        message: "Type must be at least 2 characters.",
    }),

    /**
     * The options of the question, if its a MCQ.
     */
    options: z.string().min(2, {
        message: "Options must be at least 2 characters.",
    }).optional(),

    /**
     * The correct answer of the question.
     */
    answer: z.string().min(2, {
        message: "Answer must be at least 2 characters.",
    }).optional(),

    /**
     * The assessment related to the question.
     * Must be a nonnegative number.
     */
    assessment: z.coerce.number().int().nonnegative({
        message: "Assessment must be a positive number.",
    }),
});

interface QuestionFormProps {
    assessments: Assessment[];
    question?: Question;
}

/**
 * Represents a form for creating or updating a question.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.assessments - The list of available assessments.
 * @param {Object} props.question - The question object to be updated (optional).
 * @returns {JSX.Element} The rendered QuestionForm component.
 */
const QuestionForm: FC<QuestionFormProps> = ({
    assessments,
    question,
}: QuestionFormProps): React.JSX.Element => {

    /**
     * Creates a form using the useForm hook from react-hook-form library.
     * The form is initialized with default values based on the potentially provided question object.
     *
     * @param question - The question object to populate the form with.
     * @returns The form object with resolver and default values.
     */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:
            question ? {
                content: question.content,
                type: question.type,
                options: question.options,
                answer: question.answer,
                assessment: question.assessment.id,
            } : {
                content: '',
                type: '',
                options: '',
                answer: '',
                assessment: 0,
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
            if (question) { // If the question object is provided, update the question
                const response = await fetch(`http://localhost:8000/questions/${question.id}`, {
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
            } else { // If the question object is not provided, create a new question
                const response = await fetch('http://localhost:8000/questions/new', {
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

                    {/* Content field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="content"
                        render={ ({ field }): React.JSX.Element => (
                            <FormItem className="w-full">
                                <FormLabel>Content <span className="text-xs text-muted-foreground font-normal">(required)</span></FormLabel>
                                <FormControl>
                                    <Input { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Enter the content of the question. This will be displayed to learners when they view the question.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Type field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="type"
                        render={ ({ field }): React.JSX.Element => (
                            <FormItem className="w-full">
                                <FormLabel>Type <span className="text-xs text-muted-foreground font-normal">(required)</span></FormLabel>
                                <FormControl>
                                    <Input { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Enter the type of the question. This will determine the format of the question.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Options field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="options"
                        render={ ({ field }): React.JSX.Element => (
                            <FormItem className="w-full">
                                <FormLabel>Options</FormLabel>
                                <FormControl>
                                    <Input { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Enter the options for the question. This is required for multiple choice questions. This must include the answer. Use &quot;/&quot; to add multiple options. (e.g: &quot;Option 1/Option 2/Option 3/Option 4&quot;)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Answer field with validation and description */ }
                    <FormField
                        control={ form.control }
                        name="answer"
                        render={ ({ field }): React.JSX.Element => (
                            <FormItem className="w-full">
                                <FormLabel>Answer <span className="text-xs text-muted-foreground font-normal">(required)</span></FormLabel>
                                <FormControl>
                                    <Input { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Enter the correct answer for the question.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    {/* Submit button for the form */ }
                    <Button type="submit" size="lg" className="mt-4 justify-self-center">Submit</Button>
                </form>
            </Form>
            }

        </Suspense>

    );
};

export default QuestionForm;
