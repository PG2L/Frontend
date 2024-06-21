import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
import CourseForm from '@/components/forms/CourseForm/CourseForm';


async function getData(id: string | string[] | undefined) {

    const response = await fetch(`http://localhost:8000/courses/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

async function getLanguages() {
    const response = await fetch('http://localhost:8000/languages');

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json();
}

async function getCategories() {
    const response = await fetch('http://localhost:8000/categories');

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json();
}

async function getCourses() {
    const response = await fetch('http://localhost:8000/courses');

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json();
}

export default async function Page({ 
    params,
}: {
    params: {
        courseId: string,
    };
}) {


    const data = await getData(params.courseId);

    const categories = await getCategories();

    const languages = await getLanguages();

    const courses = await getCourses();

    const onSubmitHandler = async (values: any) => {
        try {
            const response = await fetch(`http://localhost:8000/courses/${params.courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to put data');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="grid gap-6 md:flex md:gap-12 grid-cols-1 justify-between w-full">
                <div className="flex gap-1 items-center font-medium">
                    <h1 className="text-muted-foreground text-nowrap">Edit course #{data.id} - </h1>
                    <span className="text-foreground">{data.title}</span>
                </div>
                <Select>
                    <SelectTrigger className="md:w-1/2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((course) => (
                            <Link key={course.id} href={`/admin/courses/${course.id}`}>
                                <SelectItem value={course.id}>
                                    {course.id} - {course.title}
                                </SelectItem>
                            </Link>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <CourseForm onSubmitHandler={onSubmitHandler} languages={languages} categories={categories} course={data} />
        </>
    )
}