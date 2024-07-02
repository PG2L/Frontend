import React from 'react';
import CourseForm from '@/app/_components/forms/CourseForm/CourseForm';

async function getCourse(id: string) {

    const response = await fetch(`http://localhost:8000/courses/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch course');
    }

    return response.json();
}

async function getLanguages() {
    const response = await fetch('http://localhost:8000/languages');

    if (!response.ok) {
        throw new Error('Failed to fetch course');
    }

    return response.json();
}

async function getCategories() {
    const response = await fetch('http://localhost:8000/categories');

    if (!response.ok) {
        throw new Error('Failed to fetch course');
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

    const course = await getCourse(params.courseId);

    const categories = await getCategories();

    const languages = await getLanguages();

    return (
        <>
            <div className="grid w-full">
                <CourseForm languages={ languages } categories={ categories } course={ course } />
            </div>
        </>
    );
}