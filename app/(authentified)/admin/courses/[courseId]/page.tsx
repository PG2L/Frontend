import React from 'react';
import CourseForm from '../../../../_components/forms/CourseForm/CourseForm';
import { getData } from '../../../../_lib/data';

export default async function Page({
    params,
}: {
    params: {
        courseId: string,
    };
}): Promise<React.JSX.Element> {

    const course: Course = await getData("courses", params.courseId) as Course;
    const categories: Category = await getData("categories") as Category;
    const languages: Language = await getData("languages") as Language;

    return (
        <div className="grid w-full">
            <CourseForm languages={ languages } categories={ categories } course={ course } />
        </div>
    );
}