import React from 'react';
import { Badge } from "@/_components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/_components/ui/card';
import * as icons from 'lucide-react';
import { Button } from '@/_components/ui/button';
import Link from 'next/link';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/_components/ui/collapsible';
import { getData } from '@/_lib/data';
import LessonContent from '@/_components/LessonContent/LessonContent';
import LessonProvider from '@/_contexts/LessonProvider';
import AssessmentProvider from '@/_contexts/AssessmentProvider';

/**
 * Renders a page component for a specific lesson.
 *
 * @param params - The parameters for the lesson, including the courseId and lessonId.
 * @returns A Promise that resolves to a JSX element representing the lesson page.
 */
export default async function Page({
    params,
}: {
    params: {
        courseId: string,
        lessonId: string,
    };
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the lesson data from the server.
     * 
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} lessonId - The ID of the lesson to retrieve.
     * @returns {Promise<Lesson>} - A promise that resolves to the lesson data.
     */
    const lesson: Lesson = await getData("lessons", Number(params.lessonId)) as Lesson;

    /**
     * Retrieves the assessment data from the server.
     * 
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} lessonId - The ID of the lesson to retrieve the assessment from.
     * @param {string} spec - The specific data to retrieve from the lesson.
     * @returns {Promise<Assessment>} - A promise that resolves to the assessment data.
     */
    const assessment: Assessment = await getData("lessons", Number(params.lessonId), "assessment") as Assessment;

    return (

        <LessonProvider lesson={ lesson }>
            <AssessmentProvider assessment={ assessment }>
                <Card>
                    <CardHeader>
                        <div className="hidden sm:block py-36 bg-black/[0.1] border rounded"></div>
                        <Link
                            href={ `/courses/${lesson.course.id}` } // Link to the course page
                            className="hover:underline"
                        >
                            <h3 className="text-muted-foreground">
                                { lesson.course.title }
                            </h3>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="grid gap-2">
                                <div className="flex items-end font-medium">
                                    <p>{ lesson.lesson_number }</p>
                                    <icons.Dot className="size-6 text-primary" />
                                    <h1>{ lesson.title }</h1>
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                    { lesson.course.language.name && // Renders a badge for the language if it exists
                                        <Badge variant={ lesson.course.language.name as "Javascript" | "C#" | "C++" | "HTML/CSS" | "Ruby" | "Go" | "Php" | "Java" | "Mysql" | "Python" }>
                                            { lesson.course.language.name }
                                        </Badge>
                                    }
                                    { lesson.course.difficulty && // Renders a badge for the difficulty level if it exists
                                        <Badge variant={ lesson.course.difficulty }>
                                            { lesson.course.difficulty }
                                        </Badge>
                                    }
                                    <Badge>5 000 points</Badge>
                                    <Badge>+100 000 xp</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col h-full text-nowrap gap-2 items-end justify-end">
                                <div className="flex gap-2">
                                    { lesson.points_gain?.toString() }
                                    <icons.LucideStar strokeWidth={ 1 } color="#1461cc" />
                                </div>
                                <div className="flex gap-2">
                                    { lesson.exp_gain?.toString() }
                                    <icons.LucideMedal strokeWidth={ 1 } color="#1461cc" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-end gap-6">
                            <div className="flex gap-1">
                                <icons.BookUser strokeWidth={ 1 } color="#1461cc" />
                                <span className="text-muted-foreground">7 000+ students</span>
                            </div>
                            <div className="flex gap-1">
                                <icons.Clock strokeWidth={ 1 } color="#1461cc" />
                                <span className="text-muted-foreground">30 min</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="md:hidden">
                    <CardHeader>
                        <Collapsible className=" font-medium">
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center justify-between">
                                    <h2 className=" font-medium">Related lessons</h2>
                                    <Button variant="ghost">
                                        <icons.ChevronDown />
                                    </Button>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="grid gap-4 mt-4">

                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </CardHeader>
                </Card>
                <LessonContent />
            </AssessmentProvider>
        </LessonProvider>

    );
};