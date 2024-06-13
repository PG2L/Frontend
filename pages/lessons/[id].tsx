/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from '@radix-ui/react-avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import IndexView from '@/components/IndexView/IndexView';
import * as icons from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

async function getData(id: number) {

    const res = await fetch(`http://localhost:8000/lessons/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Page() {

    const router = useRouter();
    const { id } = router.query;

    const [data, setData] = useState(null);

    console.log(id);
    useEffect(() => {
        getData(id).then(data => setData(data)).catch(error => console.error(error));
    }, [id]);

    // const lessonsMenuContent: { title: string, badges: string[], isFinished: boolean, isUnlock: boolean }[] = [
    //     {
    //         title: "Lesson 1 : Introduction to Python",
    //         badges: ["Python", "Easy", "3 lessons", "5 000 points", "+100 000 xp"],
    //         isFinished: true,
    //         isUnlock: true
    //     },
    //     {
    //         title: "Lesson 2 : Basic Python Construct",
    //         badges: ["Python", "Easy", "1 lesson", "1 000 points", "+20 000 xp"],
    //         isFinished: true,
    //         isUnlock: true
    //     },
    //     {
    //         title: "Lesson 3 : Data Structure in Python",
    //         badges: ["Python", "Intermediate", "1 lesson", "2 000 points", "+40 000 xp"],
    //         isFinished: true,
    //         isUnlock: true
    //     },
    //     {
    //         title: "Lesson 4 : Advanced Python Concept",
    //         badges: ["Python", "Intermediate", "1 lesson", "1 000 points", "+20 000 xp"],
    //         isFinished: false,
    //         isUnlock: true
    //     },
    //     {
    //         title: "Lesson 5 : Object-Oriented Programming (OOP) in Python",
    //         badges: ["Python", "Intermediate", "1 lesson", "1 000 points", "+20 000 xp"],
    //         isFinished: false,
    //         isUnlock: false
    //     },
    //     {
    //         title: "Lesson 6 : Working with Libraries and Frameworks",
    //         badges: ["Python", "Hard", "1 lesson", "1 000 points", "+20 000 xp"],
    //         isFinished: false,
    //         isUnlock: false
    //     },
    //     {
    //         title: "Lesson 7 : Practical Applications of Python",
    //         badges: ["Python", "Hard", "1 lesson", "1 000 points", "+20 000 xp"],
    //         isFinished: false,
    //         isUnlock: false
    //     },
    //     {
    //         title: "Lesson 8 : Final Project and Assessment",
    //         badges: ["Python", "Hackerman", "1 lesson", "1 000 points", "+20 000 xp"],
    //         isFinished: false,
    //         isUnlock: false
    //     }
    // ];

    return (
        <IndexView>
            <div className="grid md:flex gap-4 grid-cols-1 rounded-lg p-2 sm:p-4">
                <div className="hidden md:grid grid-cols-1 w-1/3 gap-4 h-fit">
                    <Card>
                        <a href={`/courses/${data && data.course.id}`}>
                        <CardHeader className="flex justify-center items-center gap-4 rounded outline outline-2 outline-primary">
                            <h1 className="text-xl font-medium text-center">{data && data.course && data.course.title}</h1>
                            <div className="flex flex-wrap gap-1 justify-center w-3/4">
                                <Badge variant={data && data.language && data.language.name.toLowerCase()}>{data && data.language.name}</Badge>
                                <Badge variant={data && data.difficulty.toLowerCase()}>{data && data.difficulty}</Badge>
                                <Badge>5 000 points</Badge>
                                <Badge>+100 000 xp</Badge>
                            </div>
                        </CardHeader>
                    </a>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid gap-4">
                            {data && data.course.lessons && data.course.lessons.map((lesson, index) => (
                                    <a key={index} href={`/lessons/${lesson.id}`}>
                                        <Card className={`${lesson.isFinished && "bg-secondary"} outline outline-2 outline-secondary ${(lesson.id == id) && "translate-x-6 outline-foreground"}`}>
                                            <CardHeader>
                                                <h2 className={`text-lg`}>{index + 1} .  {lesson.title}</h2>
                                            </CardHeader>
                                            <CardFooter>
                                                <div className="flex flex-wrap gap-1 justify-start items-center">
                                                    {/* {lesson.badges.map((badge, index) => (
                                                        <Badge key={index}>{badge}</Badge>
                                                    ))} */}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:w-2/3 grid gap-4">
                    <Card>
                        <CardHeader className="outline outline-2 outline-primary rounded-lg gap-6">
                            <div className="hidden sm:block py-36 bg-secondary rounded"></div>
                            <div className="flex justify-between items-start">
                                <div className="grid gap-4">
                                    <div className="flex items-end text-xl font-medium">
                                        <p>{data && data.lesson_number}</p>
                                        <icons.Dot className="h-6 w-6 text-primary" />
                                        <h1>{data && data.title}</h1>
                                    </div>
                                    <div className="flex gap-1 flex-wrap">
                                        <Badge variant={data && data.language && data.language.name.toLowerCase()}>{data && data.language.name}</Badge>
                                        <Badge variant={data && data.difficulty.toLowerCase()}>{data && data.difficulty}</Badge>
                                        <Badge>5 000 points</Badge>
                                        <Badge>+100 000 xp</Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full text-nowrap gap-2 items-end justify-end">
                                    <div className="flex gap-2">
                                        500
                                        <icons.LucideStar strokeWidth={1} color="#1461cc" />
                                    </div>
                                    <div className="flex gap-2">
                                        15 000
                                        <icons.LucideMedal strokeWidth={1} color="#1461cc" />
                                    </div>
                                </div>
                            </div>
                            <Button size="lg" className="text-lg">Start lesson</Button>
                        </CardHeader>
                    </Card>
                    <Card className="md:hidden">
                        <CardHeader>
                            <Collapsible className="text-xl font-medium">
                                <CollapsibleTrigger asChild>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-medium">Related lessons</h2>
                                        <Button variant="ghost">
                                            <icons.ChevronDown />
                                        </Button>
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="grid gap-4 mt-4">
                                        {data && data.menu && data.menu.lessons.map((lesson, index) => (
                                            <Card key={index} className={`${lesson.isFinished && "bg-secondary"} ${lesson.isUnlock && "outline outline-2 outline-primary"}`}>
                                                <CardHeader>
                                                    <h2 className={`text-lg ${!lesson.isUnlock && "text-muted-foreground"}`}>{lesson.title}</h2>
                                                </CardHeader>
                                                <CardFooter>
                                                    <div className="flex flex-wrap gap-1 justify-start items-center">
                                                        {lesson.badges.map((badge, index) => (
                                                            <Badge key={index}>{badge}</Badge>
                                                        ))}
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardHeader>
                    </Card>
                    <Card className="text-muted-foreground">
                        <CardHeader>
                            {data && data.content}
                        </CardHeader>
                        {/* <CardHeader>
                            <p className="text-white">
                                The "Introduction to Python Programming" course is designed to provide learners with a solid foundation in Python, one of the most popular and versatile programming languages in the world today. This course is suitable for complete beginners with no prior programming experience as well as those with some programming background who wish to learn Python. The course emphasizes practical applications and real-world examples to ensure that students gain not only theoretical knowledge but also hands-on skills.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl text-white font-medium mb-4">Course Objectives:</h3>
                            <p>By the end of this course, students will be able to:</p>
                            <ul className="ms-4 list-disc marker:text-primary">
                                <li>Understand the basic concepts and constructs of Python programming.</li>
                                <li>Write simple to moderately complex Python programs.</li>
                                <li>Implement Python code using standard libraries and third-party modules.</li>
                                <li>Utilize Python for data manipulation, analysis, and visualization.</li>
                                <li>Develop problem-solving skills and algorithmic thinking.</li>
                                <li>Apply Python in various domains such as web development, automation, and data science.</li>
                            </ul>

                            <h3 className="text-xl text-white font-medium mt-6">Course Content:</h3>
                            <div className="grid gap-4 mt-4">
                                <h3 className="text-lg text-white">Lesson 1: Introduction to Python</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Overview of Python and its applications</li>
                                    <li>Setting up the Python environment (installation, IDEs, Jupyter Notebooks)</li>
                                    <li>Writing and executing the first Python program</li>
                                    <li>Understanding Python syntax and conventions</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 2: Basic Python Constructs</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Variables, data types, and operators</li>
                                    <li>Control flow: conditional statements (if, else, elif)</li>
                                    <li>Loops: for and while loops</li>
                                    <li>Functions: defining and calling functions, lambda functions</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 3: Data Structures in Python</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Lists, tuples, and sets</li>
                                    <li>Dictionaries and their applications</li>
                                    <li>List comprehensions</li>
                                    <li>String manipulation and formatting</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 4: Advanced Python Concepts</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Lessons and packages</li>
                                    <li>File handling (reading from and writing to files)</li>
                                    <li>Exception handling (try, except, finally)</li>
                                    <li>Working with dates and times</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 5: Object-Oriented Programming (OOP) in Python</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Understanding classes and objects</li>
                                    <li>Attributes and methods</li>
                                    <li>Inheritance and polymorphism</li>
                                    <li>Encapsulation and data hiding</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 6: Working with Libraries and Frameworks</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Overview of Python standard library</li>
                                    <li>Introduction to popular third-party libraries (e.g., NumPy, Pandas)</li>
                                    <li>Data manipulation with Pandas</li>
                                    <li>Data visualization with Matplotlib and Seaborn</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 7: Practical Applications of Python</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Web scraping with BeautifulSoup and Requests</li>
                                    <li>Introduction to web development with Flask or Django</li>
                                    <li>Automating tasks with Python (e.g., file manipulation, web automation)</li>
                                    <li>Basic introduction to machine learning concepts</li>
                                </ul>

                                <h3 className="text-lg text-white">Lesson 8: Final Project and Assessment</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Developing a final project that integrates various concepts learned</li>
                                    <li>Peer review and feedback sessions</li>
                                    <li>Final assessment to evaluate understanding and application of Python programming skills</li>
                                </ul>

                                <h3 className="text-xl text-white font-medium">Teaching Methodology:</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Lectures and interactive discussions</li>
                                    <li>Hands-on coding exercises and assignments</li>
                                    <li>Quizzes and assessments to reinforce learning</li>
                                    <li>Collaborative projects and peer learning</li>
                                    <li>Access to online resources and supplementary materials</li>
                                </ul>

                                <h3 className="text-xl text-white font-medium">Prerequisites:</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>No prior programming experience required.</li>
                                    <li>Basic computer literacy and familiarity with operating systems.</li>
                                </ul>

                                <h3 className="text-xl text-white font-medium">Recommended Texts and Resources:</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>"Automate the Boring Stuff with Python" by Al Sweigart</li>
                                    <li>"Python Crash Course" by Eric Matthes</li>
                                    <li>Online documentation and tutorials from the official Python website</li>
                                </ul>

                                <h3 className="text-xl text-white font-medium">Assessment and Certification:</h3>
                                <ul className="ms-4  list-disc marker:text-primary">
                                    <li>Continuous assessment through quizzes, assignments, and projects</li>
                                    <li>Final project evaluation and presentation</li>
                                    <li>Certificate of completion upon successfully meeting course requirements</li>
                                </ul>

                                <h3 className="text-xl text-white font-medium">Course Duration:</h3>
                                <p>Typically, the course spans 8-12 weeks, with weekly sessions and assignments.</p>

                                <p className="text-white">This comprehensive course aims to equip learners with the skills and confidence to use Python for a wide range of applications, laying a strong foundation for further study and professional development in the field of programming and software development.</p>
                            </div>
                        </CardContent> */}
                    </Card>
                </div>
            </div>
        </IndexView>
    )
}