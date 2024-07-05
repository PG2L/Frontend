"use client";

import React, { createContext } from "react"

export const CourseContext = createContext();

export default function CourseProvider({ children, course }) {
    return (
        <>
            <CourseContext.Provider value={course} >
                { children }
            </CourseContext.Provider>
        </>
    )
}