import React from 'react';
import CourseForm from '@/_components/forms/CourseForm/CourseForm';
import { getData } from '@/_lib/data';

/**
 * Renders the page for creating a new course.
 * 
 * @returns A Promise that resolves to a JSX.Element representing the page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    /**
     * Fetches the categories data from the server.
     * 
     * @returns {Promise<Category[]>} A promise that resolves to an array of Category objects.
     */
    const categories: Category[] = await getData("categories") as Category[];

    /**
     * Fetches the list of languages from the server.
     * 
     * @returns {Promise<Language[]>} A promise that resolves to an array of Language objects.
     */
    const languages: Language[] = await getData("languages") as Language[];

    return <CourseForm categories={ categories } languages={ languages } />;

}