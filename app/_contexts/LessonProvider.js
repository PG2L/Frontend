"use client";

import React, { createContext } from "react"

/**
 * @fileoverview Defines the LessonContext for the application.
 * @module LessonProvider
 */
export const LessonContext = createContext();

/**
 * Provides the lesson context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @param {Object} props.lesson - The lesson object.
 * @returns {ReactNode} The rendered component.
 */
export default function LessonProvider({ children, lesson }) {

    return (

        <LessonContext.Provider value={lesson} >
            { children }
        </LessonContext.Provider>

    )
}