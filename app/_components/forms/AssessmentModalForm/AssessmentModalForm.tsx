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
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../ui/form';
import { Button } from '../../ui/button';
import { UserContext } from '../../../_contexts/UserProvider';
import { LessonContext } from '../../../_contexts/LessonProvider';
import { updateUserPoints } from '../../../_lib/points';
import { updateUserExp } from '../../../_lib/levels';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { updateCourseProgress } from '../../../_lib/courses';
import { revalidateTag } from 'next/cache';

interface AssessmentModalFormProps { }

/**
 * Represents a form for taking an assessment.
 *
 * @component
 * @returns {JSX.Element} The rendered AssessmentModalForm component.
 */
const AssessmentModalForm: FC<AssessmentModalFormProps> = function AssessmentModalForm(): React.JSX.Element {

    /**
     * Retrieves the assessment from the AssessmentContext.
     * @returns The assessment object.
     */
    const assessment: Assessment = useContext(AssessmentContext) as Assessment;

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = useContext(UserContext) as User;

    /**
     * Retrieves the lesson from the LessonContext.
     * @returns The lesson object.
     */
    const lesson: Lesson = useContext(LessonContext) as Lesson;

    /**
     * Finds the user's course based on the course ID.
     *
     * @param user - The user object containing the courses.
     * @param lesson - The lesson object containing the course ID.
     * @returns The user's course if found, otherwise undefined.
     */
    const userCourse: UserCourse | undefined = user.courses.find((c: UserCourse): boolean => c.course.id === lesson.course.id);

    /**
     * Retrieves the router object using the useRouter hook.
     * @returns The router object.
     */
    const router: AppRouterInstance = useRouter();

    /**
     * Creates a form using the useForm hook from react-hook-form library.
     *
     * @returns The form object with resolver and default values.
     */
    const formSchema = z.object({
        answer1: z.string(),
        answer2: z.string().optional(),
        answer3: z.string().optional(),
        answer4: z.string().optional(),
        answer5: z.string().optional(),
    });

    /**
     * Creates a form instance using the useForm hook.
     *
     * @template T - The type of the form values.
     * @param {Object} options - The options for the form instance.
     * @param {Function} options.resolver - The resolver function for validating the form values.
     * @param {Object} options.defaultValues - The default values for the form fields.
     * @returns {Object} - The form instance.
     */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            answer5: '',
        }
    });

    /**
     * Navigates to the next lesson if there is one, otherwise navigates to the course page.
     */
    const navigateToNextLesson: () => void = (): void => {
        if (lesson.lesson_number === lesson.course.lessons.length) {
            // router.push(`/courses/${lesson.course.id}`); // If the current lesson is the last lesson, navigate to the course page.
            router.refresh();
        } else {
            // router.push(`/courses/${lesson.course.id}/${lesson.course.lessons[lesson.lesson_number].id}`); // Otherwise, navigate to the next lesson.
            router.refresh();
        }
    };

    /**
     * Handles the form submission for the assessment modal.
     * Calculates the score for the assessment based on the given answers and posts the solution to the server if the score is sufficient.
     * 
     * @param values - The user's answers for each question.
     * @returns A Promise that resolves when the submission is complete.
     */
    const onSubmit: (values: any) => Promise<void> = async (values: any): Promise<void> => {

        /**
         * Calculates the score for the assessment based on the given answers.
         * 
         * @param assessment - The assessment object containing the questions.
         * @param values - The user's answers for each question.
         * @returns The score for the assessment.
        */
        const score: number = assessment.questions.reduce((acc: number, question: Question, index: number): number => {
            return question.answer === values[`answer${index + 1}`] ? acc + 1 : acc;
        }, 0);

        if (score >= assessment.passing_score) { // If the user's score is greater than or equal to the passing score, post the solution to the server.
            await fetch('http://localhost:8000/solutions/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    score: score,
                    is_accepted: true,
                    author: user.id,
                    assessment: assessment.id,
                }),
            }).then(async (response: Response): Promise<void> => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                await updateCourseProgress(userCourse);
                await updateUserPoints(user.id, user.total_points + lesson.points_gain);
                await updateUserExp(user.id, user.total_exp + lesson.exp_gain);
                navigateToNextLesson();
            });
        }
    };

    return (

        <Carousel>
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) }>
                    <CarouselContent>
                        { assessment.questions.map((question: Question, index: number): React.JSX.Element => ( // Mapping through the questions array to render the questions.
                            question.type === 'mcq' ? // If the question type is multiple choice question, render a radio group.
                                <CarouselItem key={ index }>
                                    <FormField
                                        control={ form.control }
                                        name={ `answer${index + 1}` } // Dynamically setting the name of the field.
                                        render={ ({ field }): React.JSX.Element => (
                                            <FormItem className="w-full">
                                                <FormLabel>{ question.content } </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        className="mt-2"
                                                        onValueChange={ field.onChange }
                                                    >
                                                        { question.options.split('/')
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
                                        ) } />
                                </CarouselItem>
                                : // If the question type is text, render a text input.
                                <CarouselItem key={ index }>
                                    <FormField
                                        control={ form.control }
                                        name={ `answer${index + 1}` }
                                        render={ ({ field }): React.JSX.Element => (
                                            <>
                                                <Label>{ question.content }</Label>
                                                <div className="px-2">
                                                    <Input type="text" className="mt-6" { ...field } />
                                                </div>
                                            </>
                                        ) }
                                    />
                                </CarouselItem>
                        )) }
                    </CarouselContent>
                    <Button type="submit" className="w-1/3 justify-self-end mt-2">Submit</Button>
                </form>
            </Form >
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    );
};

export default AssessmentModalForm;
