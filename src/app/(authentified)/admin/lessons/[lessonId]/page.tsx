import React from 'react';
import LessonForm from '@/app/_components/forms/LessonForm/LessonForm';
import AdminHeader from '@/app/_components/AdminHeader/AdminHeader';

async function getLesson(id: string) {

    const res = await fetch(`http://localhost:8000/lessons/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function getCourses() {
    const res = await fetch('http://localhost:8000/courses');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Page({
    params,
}: {
    params: {
        lessonId: string,
    },
}) {

    const lesson = await getLesson(params.lessonId);

    const courses = await getCourses();

    return (
        <LessonForm lesson={ lesson } courses={ courses } />
    );
}