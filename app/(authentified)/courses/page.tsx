import React, { Suspense } from 'react';
import { Skeleton } from '../../_components/ui/skeleton';
import CourseCard from '../../_components/CourseCard/CourseCard';
import { getData } from '../../_lib/data';

export default async function Page(): Promise<React.JSX.Element> {

    const courses: Course[] = await getData("courses") as Course[];

    return (
        <>
            <div className="grid gap-2">
                <h1 className="text-xl font-medium text-center text-foreground py-6">Courses</h1>
                <p>Welcome to the Courses Page of our Web Development E-Learning Platform! Whether you&apos;re just starting your journey into web development or looking to enhance your existing skills, you&apos;ve come to the right place. Our comprehensive collection of courses covers everything from the basics of HTML, CSS, and JavaScript to advanced topics like React, Node.js, and full-stack development.</p>
                <p className="text-muted-foreground">Each course is designed with your learning in mind, featuring interactive lessons, hands-on projects, and real-world scenarios to help you apply what you&apos;ve learned immediately. Our expert instructors bring years of industry experience into the classroom, ensuring that you receive the most up-to-date and relevant information.

                </p>
                <p>Navigate through our catalog to find courses tailored to your skill level and interests. Whether you aim to build responsive websites, dynamic web applications, or scalable back-end services, our platform supports your growth every step of the way. Start learning today and join a community of developers making an impact in the digital world.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between py-6 gap-4 lg:gap-6 bg-background w-full">
                <Suspense fallback={ Array.from({ length: 12 }).map((_: unknown, index: number): React.JSX.Element => (
                    <Skeleton key={ index } className="w-full rounded-lg h-72" />
                )) }>
                    { courses.map((course: Course, index: number): React.JSX.Element => (
                        <CourseCard key={ index } course={ course } />
                    )) }
                </Suspense>
            </div >
        </>
    );
}