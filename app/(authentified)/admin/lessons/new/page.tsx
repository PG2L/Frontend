import React from 'react';
import LessonForm from '../../../../_components/forms/LessonForm/LessonForm';
import { getData } from '../../../../_lib/data';

export default async function Page(): Promise<React.JSX.Element> {

    const courses: Course[] = await getData('courses') as Course[];

    return (
        <LessonForm courses={ courses } />
    );
}