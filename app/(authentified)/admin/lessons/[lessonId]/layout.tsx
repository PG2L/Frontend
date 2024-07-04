import React from 'react';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { getData } from '../../../../_lib/data';

export default async function AdminLessonEditLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        lessonId: string,
    },
}): Promise<React.JSX.Element> {

    const lessons: Lesson[] = await getData("lessons") as Lesson[];
    const lesson: Lesson = await getData("lessons", params.lessonId) as Lesson;

    return (
        <div className="grid w-full grid-cols-1">
            <AdminHeader lesson={ lesson } lessons={ lessons } />
            { children }
        </div>
    );
}