"use client";

import React, { createContext } from "react"

/**
 * @fileoverview Defines the CourseContext for the application.
 * @module CourseProvider
 */
export const CourseContext = createContext();

/**
 * Provides the course context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @param {Object} props.course - The course object.
 * @returns {ReactNode} The rendered component.
 */
export default function CourseProvider({ children, course }) {
    return (
        <>
            <CourseContext.Provider value={course} >
                { children }
            </CourseContext.Provider>
        </>
    )
}