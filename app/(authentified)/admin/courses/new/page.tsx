import React from 'react';
import CourseForm from '../../../../_components/forms/CourseForm/CourseForm';
import { getData } from '../../../../_lib/data';

export default async function Page(): Promise<React.JSX.Element> {

    const categories: Category[] = await getData("categories") as Category[];
    const languages: Language[] = await getData("languages") as Language[];

    return (
        <CourseForm categories={ categories } languages={ languages } />
    );
}