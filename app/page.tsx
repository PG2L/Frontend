import React from 'react';
import Image from "next/image";
import Link from "next/link";
import FAQ from "./_components/FAQ/FAQ";
import { Badge } from "./_components/ui/badge";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./_components/ui/card";
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

export default function Page(): React.JSX.Element {

    const sponsors: string[] = [
        `https://img.icons8.com/?size=100&id=435&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=25627&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=32292&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=447&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=12598&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=437&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=37325&format=png&color=1461cc`,
        `https://img.icons8.com/?size=100&id=jlpBF1fJe9fs&format=png&color=1461cc`
    ];
    const lessonsContent: { title: string, description: string; }[] = [
        {
            title: "Introduction to Python Programming",
            description: "Master the basics of Python, a popular and versatile programming language. Learn about data types, control flow, functions, and error handling."
        },
        {
            title: "Web Development with JavaScript and React",
            description: "Learn how to build dynamic, interactive web applications using JavaScript and React. Understand concepts like JSX, state, props, and React Hooks."
        },
        {
            title: "Data Structures and Algorithms",
            description: "Improve your problem-solving skills by learning about fundamental data structures and algorithms. This course covers arrays, linked lists, trees, hash tables, and more."
        },
        {
            title: "Full Stack Development with Node.js and Express",
            description: "Learn how to build and deploy full-stack web applications using Node.js and Express. Topics include routing, middleware, error handling, and database integration."
        }
    ];
    const featureContent: { title: string, description: string; }[] = [
        {
            title: "Interactive Lessons",
            description: "Engaging, interactive lessons that make learning fun and effective. Lessons can include multimedia content, quizzes, and interactive exercises."
        },
        {
            title: "Progress Tracking",
            description: "Allows users to track their learning progress and see how much they've improved over time. This can include a dashboard showing completed lessons, scores, and areas for improvement."
        },
        {
            title: "Gamification Elements",
            description: "Incorporates game design elements like points, badges, leaderboards, and levels to motivate users and make learning more enjoyable."
        },
        {
            title: "Social Features",
            description: "Enables users to learn together by competing with friends, joining study groups, or sharing their progress on social media."
        },
        {
            title: "Personalized Learning Paths",
            description: "Offers personalized learning paths based on the user's goals, interests, and skill level. This ensures that the learning content is relevant and challenging for each individual user."
        },
        {
            title: "Offline Modes",
            description: "Allows users to download lessons and learn even when they're offline. This is especially useful for users with limited internet access."
        }
    ];
    const testimonies: { name: string, description: string, review: string, stars: number; }[] = [
        {
            name: "John Doe",
            description: "Software Engineer",
            review: "I've never been more engaged in learning! The gamified approach makes it fun and I find myself spending hours on the platform without even realizing it. 5 stars!",
            stars: 5
        },
        {
            name: "Jane Smith",
            description: "Data Scientist",
            review: "This platform has completely changed the way I learn. The interactive lessons and gamified elements keep me motivated and eager to progress. Absolutely worth 5 stars!",
            stars: 5
        },
        {
            name: "Robert Johnson",
            description: "Full Stack Developer",
            review: "I love how this app makes learning feel like a game. It's not just about earning points and badges, but also about truly understanding the material. 5 stars from me!",
            stars: 5
        },
        {
            name: "Emily Davis",
            description: "UI/UX Designer",
            review: "The personalized learning paths are a game changer. It feels like the app really understands my learning style and adjusts accordingly. Definitely a 5-star experience!",
            stars: 5
        },
        {
            name: "Michael Brown",
            description: "Mobile App Developer",
            review: "I've tried many e-learning platforms, but this is the first one that's truly kept me engaged. The gamification elements make learning fun and addictive. 5 stars without a doubt!",
            stars: 5
        },
        {
            name: "Sarah Wilson",
            description: "Frontend Developer",
            review: "This app has made me look forward to learning. The gamified approach is not just fun, but also very effective. I've learned so much in such a short time. 5 stars well deserved!",
            stars: 5
        }
    ];

    return (
        <>
            <Header />
            <div className="container grid grid-cols-1">
                <div className="py-48 flex flex-col items-center justify-center">
                    <div className="h-1/2 flex flex-col items-center justify-center space-y-2">
                        <Badge>NEW: Build on Bitcoin - Stacks Developer Degree out now !</Badge>
                        <Badge>Announcing: Uniswap Hook Incubator - do you have what it takes ?</Badge>
                        <span className="text-muted-foreground text-3xl text-center">Lead the charge to new frontiers</span>
                        <h1 className="text-7xl font-medium text-center">Welcome to PG2L</h1>
                        <span className="text-muted-foreground text-m font-medium">The future is now</span>
                        <Button size="lg" className="text-lg px-12 py-8 !mt-16">Get started</Button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center m-0 px-0">
                    <h2 className="text-3xl text-color-gradient">Backed by the best</h2>
                    <div className="overflow-hidden mt-6 w-full border-b border-t bg-card whitespace-nowrap flex items-center">
                        <div className="slide-track animate-[slide_60s_linear_infinite] inline-block whitespace-nowrap content-center py-2">
                            <div className="flex gap-48 justify-center">
                                { sponsors.map((sponsor: string, index: number): React.JSX.Element => (
                                    <Image key={ index } src={ sponsor } alt="" width="64" height="64" />
                                )) }
                                { sponsors.map((sponsor: string, index: number): React.JSX.Element => (
                                    <Image key={ index + sponsors.length } src={ sponsor } alt="" width="64" height="64" />
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-16 grid justify-center justify-items-center gap-24">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 justify-items-center w-full">
                        { lessonsContent.map((content: {
                            title: string;
                            description: string;
                        }, index: number): React.JSX.Element => (
                            <Card key={ index }>
                                <CardHeader>
                                    <div className="bg-secondary py-24 rounded"></div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>{ content.title }</CardTitle>
                                    <CardDescription className="mt-4">
                                        { content.description }
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex items-end justify-end">
                                    <Link href="/" className="underline">Start learning</Link>
                                </CardFooter>
                            </Card>
                        )) }
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-1">
                        <Link href="/leaderboard">
                            <Button className="h-24 w-48 text-lg">
                                Leaderboard
                            </Button>
                        </Link>
                        <Link href="/courses">
                            <Button className="h-24 w-48 text-lg">
                                Courses
                            </Button>
                        </Link>
                        <Link href="/lessons">
                            <Button className="h-24 w-48 text-lg">
                                Lessons
                            </Button>
                        </Link>
                    </div>
                    <div className="grid gap-12 lg:flex lg:justify-between lg:gap-6">
                        <div className="grid gap-6 lg:w-full">
                            <h2 className="text-3xl">Ready to get started ?</h2>
                            <p className="text-muted-foreground">Dive into a world where learning meets adventure! Our gamified e-learning platform transforms education into an exciting journey, filled with challenges, rewards, and interactive experiences. Whether you&apos;re mastering a new skill or advancing your career, our app makes every lesson engaging and fun. Join us today and turn your learning goals into game-winning achievements!</p>
                            <p>Join the community and start learning today</p>
                            <div className="flex justify-center items-center gap-4">
                                <Button size="lg">Get started</Button>
                                <Button variant="outline" size="lg">Learn more</Button>
                            </div>
                        </div>
                        <div className="dummy h-40 lg:w-full lg:h-[auto] bg-secondary rounded"></div>
                    </div>
                    <div className="grid gap-12">
                        <h2 className="text-center text-3xl font-medium">Unlock your learning potential</h2>
                        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-6">
                            { featureContent.map((content: {
                                title: string;
                                description: string;
                            }, index: number): React.JSX.Element => (
                                <Card key={ index }>
                                    <CardHeader>
                                        <CardTitle className="text-center font-medium text-lg">{ content.title }</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            { content.description }
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            )) }
                        </div>
                    </div>
                    <div className="flex mx-auto flex-col gap-6 justify-center max-w-4xl">
                        <h2 className="text-center text-3xl font-medium">Find a course now !</h2>
                        <div className="flex w-full justify-center items-center gap-2">
                            <Input type="search" placeholder="Search..." />
                            <Button variant="secondary" type="submit" className="lg:px-16">Search</Button>
                        </div>
                        <p className="text-center text-muted-foreground">Search for courses, lessons, and more on our comprehensive platform. Whether you&apos;re looking to learn a new skill, brush up on an existing one, or explore a new hobby, we&apos;ve got you covered. Our extensive library covers a wide range of topics from coding to cooking, and everything in between. Each course is carefully curated and taught by industry experts to ensure you get the most out of your learning experience. Start your learning journey with us today!</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="dummy bg-secondary h-40 lg:h-auto rounded"></div>
                        <div className="grid gap-10">
                            <h2 className="text-3xl">Empowering learners with immersive, gamified experiences that make education exciting and unforgettable.</h2>
                            <div className="space-y-2">
                                <p className="text-muted-foreground">Welcome to PG2L, your ultimate destination for gamified web development learning. PG2L turns the learning process into an exciting journey, where you conquer new skills as you would conquer levels in a game.</p>
                                <p className="text-muted-foreground">Our platform offers a wide range of courses, from HTML and CSS basics to advanced JavaScript and React. Each course is structured as a quest, where you earn points, badges, and unlock new levels as you progress.</p>
                                <p className="text-muted-foreground">The interactive lessons are designed to keep you engaged and motivated. You can track your progress, compete with friends, and even share your achievements on socal media.</p>
                                <p className="text-muted-foreground">But that&apos;s not all! PG2L also offers personalized learning paths, tailored to your goals and skill level. Whether you&apos;re a beginner looking to get started in web development, or a seasoned developer wanting to upskill, PG2L has something for you.</p>
                                <p className="text-muted-foreground">Join PG2L today and turn your learning journey into an adventure!</p>
                            </div>
                            <div className="flex justify-center items-center space-x-4">
                                <Button size="lg">Get started</Button>
                                <Button variant="outline" size="lg">Learn more</Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-6 justify-center md:grid-cols-2 lg:grid-cols-3">
                        { testimonies.map((_: {
                            name: string;
                            description: string;
                            review: string;
                            stars: number;
                        }, index: number): React.JSX.Element => (
                            <Card key={ index }>
                                <CardHeader>
                                    <CardTitle>{ _.name }</CardTitle>
                                    <CardDescription>{ _.description }</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        { _.review }
                                    </CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex h-4">
                                            { Array.from({ length: _.stars }).map((_: unknown, index: number): React.JSX.Element => (
                                                <Image key={ index } height="16" width="16" src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000" alt="" />
                                            )) }
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        )) }
                    </div>
                    <div className="grid gap-6">
                        <h2 className="text-center text-3xl font-medium">Join the community</h2>
                        <p className="text-center ">Stay up to date with the latest news, events, and announcements</p>
                        <div className="flex justify-center gap-2 items-center">
                            <Button variant="outline">Join the Discord</Button>
                            <Button variant="outline">Follow us on Twitter</Button>
                        </div>
                    </div>
                </div>
            </div>
            <FAQ />
            <Footer />
        </>
    );
}