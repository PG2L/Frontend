import React from 'react';
import LessonForm from '../../../../_components/forms/LessonForm/LessonForm';
import { getData } from '../../../../_lib/data';

export default async function Page({
    params,
}: {
    params: {
        lessonId: string,
    },
}): Promise<React.JSX.Element> {

    const lesson = await getData("lessons", params.lessonId) as Lesson;
    const courses = await getData("courses") as Course[];

    return (
        <LessonForm lesson={ lesson } courses={ courses } />
    );
}