import React, {
    FC,
    useContext,
    useEffect,
    useState
} from 'react';
import styles from './AssessmentModalForm.module.css';
import {
    CarouselItem,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    Carousel
} from "@/_components/ui/carousel";
import {
    RadioGroup,
    RadioGroupItem
} from '@/_components/ui/radio-group';
import { Label } from '@/_components/ui/label';
import { Input } from '@/_components/ui/input';
import { AssessmentContext } from "@/_contexts/AssessmentProvider";
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
} from '@/_components/ui/form';
import { Button } from '@/_components/ui/button';
import { UserContext } from '@/_contexts/UserProvider';
import { LessonContext } from '@/_contexts/LessonProvider';
import { updateUserPoints } from '@/_lib/points';
import { updateUserExp } from '@/_lib/levels';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { updateCourseProgress } from '@/_lib/courses';
import { useToast } from "@/_components/ui/use-toast";
import { Spinner } from '@/_components/ui/spinner';
import handleAchievementItems from '@/_lib/achievements';

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
     * The toast object used for displaying notifications.
     */
    const { toast } = useToast();

    /**
     * Navigates to the next lesson if there is one, otherwise navigates to the course page.
     */
    const navigateToNextLesson: () => void = (): void => {
        if (lesson.lesson_number === lesson.course.lessons.length) {
            router.push(`/courses/${lesson.course.id}`); // If the current lesson is the last lesson, navigate to the course page.
        } else {
            router.push(`/courses/${lesson.course.id}/${lesson.course.lessons[lesson.lesson_number].id}`); // Otherwise, navigate to the next lesson.
        }
        router.refresh();
    };

    /**
     * Handles the success of the assessment.
     * Displays a toast message with the score and updates the user's progress, points, and experience.
     *
     * @param score - The score obtained in the assessment.
     * @returns A Promise that resolves when the user's progress, points, and experience are updated.
     */
    async function handleSuccess(score: number): Promise<void> {
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
            if (userCourse) {
                updateCourseProgress(userCourse);
            }
            user.total_exp += lesson.exp_gain;
            user.total_points += lesson.points_gain;
            updateUserPoints(user, user.total_points + lesson.points_gain);
            updateUserExp(user, user.total_exp + lesson.exp_gain);
            const newlyCompletedAchievements: Achievement[] = await handleAchievementItems(lesson, user);
            if (newlyCompletedAchievements.length > 0) {
                newlyCompletedAchievements.forEach((achievement: Achievement, index: number): void => {
                    setTimeout((): void => {
                        toast({
                            title: achievement.name,
                            description:
                                <>
                                    <p className="text-muted-foreground">{ achievement.description }</p>
                                    <p className="mt-2">Congratulations ! You've unlocked an achievement and earned <span className="text-primary">{ achievement.points_gain } points</span> !</p>
                                </>,
                        });
                    }, ((index * 5000) + 2000));
                });
            }
        });
        navigateToNextLesson();
    }

    /**
     * Represents the state of whether the assessment is valid or not.
     */
    const [isValid, setIsValid] = useState(false);

    /**
     * The state variable that holds the number of answered questions.
     */
    const [answeredQuestions, setAnsweredQuestions] = useState(0);

    useEffect((): void => {
        const answeredQuestions: number = Object.values(form.getValues()).filter((value: string): boolean => value !== '').length;
        setAnsweredQuestions(answeredQuestions);
        if (answeredQuestions >= assessment.questions.length) {
            setIsValid(true);
        }
    }, [form.getValues()]);

    /**
     * Represents the state of whether the form is pending or not.
     */
    const [isPending, setIsPending] = useState(false);

    /**
     * Handles the form submission for the assessment modal form.
     * Calculates the score for the assessment based on the given answers and performs appropriate actions.
     * 
     * @param values - The user's answers for each question.
     * @returns void
     */
    const onSubmit: (values: any) => void = (values: any): void => {
        setIsPending(true);
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

        if (score >= assessment.passing_score) {
            toast({
                title: "Congratulations !",
                description: `You have successfully passed the assessment with a score of ${score}/${assessment.questions.length} and can now access the next lesson !`,
            });
            handleSuccess(score);
        } else {
            toast({
                title: "Assessment failed !",
                description: `You have failed the assessment with a score of ${score}/${assessment.questions.length}. Try again !`,
            });
            setIsPending(false);
        }
    };

    return (

        <Carousel>
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="grid">
                    <CarouselContent>
                        { assessment.questions.map((question: Question, index: number): React.JSX.Element => ( // Mapping through the questions array to render the questions.
                            question.type === 'mcq' ? // If the question type is multiple choice question, render a radio group.
                                <CarouselItem key={ index }>
                                    <FormField
                                        control={ form.control }
                                        name={ `answer${index + 1}` as "answer1" | "answer2" | "answer3" | "answer4" | "answer5" } // Dynamically setting the name of the field.
                                        render={ ({ field }): React.JSX.Element => (
                                            <FormItem className="w-full">
                                                <FormLabel>{ question.content } </FormLabel>
                                                <FormControl>
                                                    <RadioGroup className="mt-2" onValueChange={ field.onChange }>
                                                        { question.options.split('/')
                                                            .map((option: string, questIndex: number): React.JSX.Element => ( // Mapping through the options array to render the options.
                                                                <div key={ `${index}-${questIndex}` } className="flex gap-4 mt-1">
                                                                    <RadioGroupItem key={ `${index}-${questIndex}` } value={ option } id={ `rg${index}-${questIndex}` } />
                                                                    <Label htmlFor={ `rg${index}-${questIndex}` }>{ option }</Label>
                                                                </div>
                                                            ))
                                                        }
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        ) }
                                    />
                                </CarouselItem>
                                : // If the question type is text, render a text input.
                                <CarouselItem key={ index }>
                                    <FormField
                                        control={ form.control }
                                        name={ `answer${index + 1}` as "answer1" | "answer2" | "answer3" | "answer4" | "answer5" }
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
                    <div className="flex justify-between w-full items-center mt-4">
                        <p className="text-muted-foreground">
                            { `${answeredQuestions}/${assessment.questions.length}` }
                        </p>
                        <Button type="submit" className="w-1/3 justify-self-end mt-2" disabled={ !isValid }>
                            { isPending ?
                                <Spinner /> : "Submit"
                            }
                        </Button>
                    </div>
                </form>
            </Form >
            <CarouselPrevious />
            <CarouselNext />
        </Carousel >

    );
};

export default AssessmentModalForm;
