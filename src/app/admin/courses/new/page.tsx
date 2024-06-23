import React, { useEffect, useState } from 'react';
import { z } from "zod";
import CourseForm from '@/components/forms/CourseForm/CourseForm';


const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    exp_gain: z.number().int().positive({
        message: "Experience gain must be a positive number.",
    }),
    points_gain: z.number().int().positive({
        message: "Points gain must be a positive number.",
    }),
    lessons_count: z.number().int().positive({
        message: "Lesson number must be a positive number.",
    }),
    is_free: z.boolean(),
    lesson_count: z.number().int().positive({
        message: "Lesson number must be a positive number.",
    }),
    difficulty: z.string().min(2, {
        message: "Difficulty must be at least 2 characters.",
    }),
    price: z.number().int().positive({
        message: "Price must be a positive number.",
    }),
    category_id: z.number().int().positive({
        message: "Category must be a positive number.",
    }),
    language_id: z.number().int().positive({
        message: "Language must be a positive number.",
    }),
})

async function getCategories() {

    const res = await fetch(`http://localhost:8000/categories`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getLanguages() {

    const res = await fetch(`http://localhost:8000/languages`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {

    const categories = await getCategories();

    const languages = await getLanguages();

    return (
        <>
            <CourseForm categories={categories} languages={languages} />
        </>
    )
}