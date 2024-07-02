import React from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';

async function getLessons() {

    const res = await fetch(`http://localhost:8000/lessons`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function getLesson(id: string) {

    const res = await fetch(`http://localhost:8000/lessons/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function AdminLessonEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        lessonId: string,
    },
}) {

    const lessons = await getLessons();

    const lesson = await getLesson(params.lessonId);

    return (
        <>
            <div className="grid w-full grid-cols-1">
                <AdminHeader lesson={ lesson } lessons={ lessons } />
                { children }
            </div>
        </>
    );
}