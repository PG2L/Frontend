import React from 'react';
import LessonForm from '@/components/forms/LessonForm/LessonForm';

async function getCourses() {
    const res = await fetch('http://localhost:8000/courses');

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {

    const courses = await getCourses();

    return (
        <>
            <LessonForm courses={courses} />
        </>
    )
}