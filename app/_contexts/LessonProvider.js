"use client";

import React, { createContext } from "react"

export const LessonContext = createContext();

export default function LessonProvider({ children, lesson }) {

    return (
        <>
            <LessonContext.Provider value={lesson} >
                { children }
            </LessonContext.Provider>
        </>
    )
}