import React, {
    FC,
    useContext
} from 'react';
import styles from './AssessmentModalForm.module.css';
import {
    CarouselItem,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    Carousel
} from "../../ui/carousel";
import {
    RadioGroup,
    RadioGroupItem
} from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { AssessmentContext } from "../../../_contexts/AssessmentProvider";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

interface AssessmentModalFormProps { }

/**
 * Represents a form for taking an assessment.
 *
 * @component
 * @returns {JSX.Element} The rendered AssessmentModalForm component.
 */
const AssessmentModalForm: FC<AssessmentModalFormProps> = (): React.JSX.Element => {

    const assessment: Assessment = useContext(AssessmentContext) as Assessment;

    /**
     * Creates a form using the useForm hook from react-hook-form library.
     *
     * @returns The form object with resolver and default values.
     */
    const formSchema = z.object({
        answers: z.string().array()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answers: assessment.questions.map((_: Question): string => '')
        }
    });

    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {
        console.log(values);

        // try {
        //     const response = await fetch(`http://localhost:8000/questions/${question.id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(values),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to put data');
        //     }

        //     const data: any = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (

        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) }>
                <FormField
                    control={ form.control }
                    name="answers"
                    render={ ({ field }): React.JSX.Element => (
                        <Carousel>
                            <CarouselContent>
                                {
                                    assessment.questions.map((question: Question, index: number): React.JSX.Element => ( // Mapping through the questions array to render the questions.
                                        question.type === 'mcq' ? // If the question type is multiple choice question, render a radio group.
                                            <CarouselItem key={ index }>
                                                <FormItem className="w-full">
                                                    <FormLabel>{ question.content } </FormLabel>
                                                    <FormControl>
                                                        <RadioGroup className="mt-2" onValueChange={ field.onChange }>
                                                            {
                                                                question.options.split('/')
                                                                    .sort((): number => { // Splitting the options string and sorting them randomly.
                                                                        return Math.random() - 0.5;
                                                                    })
                                                                    .map((option: string, index: number): React.JSX.Element => ( // Mapping through the options array to render the options.
                                                                        <div key={ index } className="flex gap-4 mt-1">
                                                                            <RadioGroupItem key={ index } value={ option } />
                                                                            <Label>{ option }</Label>
                                                                        </div>
                                                                    ))
                                                            }
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </CarouselItem>
                                            : // If the question type is text, render a text input.
                                            <CarouselItem key={ index }>
                                                <Label>{ question.content }</Label>
                                                <div className="px-2">
                                                    <Input type="text" className="mt-6" />
                                                </div>
                                            </CarouselItem>
                                    ))
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    ) } />
                <Button type="submit" className="w-1/3 justify-self-end mt-2">Submit</Button>
            </form>
        </Form >

    );
};

export default AssessmentModalForm;
