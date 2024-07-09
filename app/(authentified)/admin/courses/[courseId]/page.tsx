import React from 'react';
import CourseForm from '../../../../_components/forms/CourseForm/CourseForm';
import { getData } from '../../../../_lib/data';

/**
 * Renders the page component for a specific course.
 * 
 * @param params - The parameters for the page component.
 * @param params.courseId - The ID of the course.
 * @returns A Promise that resolves to the JSX element representing the page component.
 */
export default async function Page({
    params,
}: {
    params: {
        courseId: string,
    };
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the course data from the server.
     *
     * @param {string} endpoint - The endpoint to fetch the data from.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Promise<Course>} - A promise that resolves to the course data.
     */
    const course: Course = await getData("courses", params.courseId) as Course;

    /**
     * Fetches the categories data from the server.
     * 
     * @returns {Promise<Category>} A promise that resolves to the fetched categories data.
     */
    const categories: Category = await getData("categories") as Category;

    /**
     * Fetches the list of languages from the server.
     * 
     * @returns {Promise<Language>} A promise that resolves to the list of languages.
     */
    const languages: Language = await getData("languages") as Language;

    return (
        <div className="grid w-full">
            <CourseForm languages={ languages } categories={ categories } course={ course } />
        </div>
    );
}