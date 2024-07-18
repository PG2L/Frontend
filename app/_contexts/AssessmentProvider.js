"use client";

import React, { createContext } from "react"

/**
 * @fileoverview Defines the AssessmentContext for the application.
 * @module AssessmentProvider
 */
export const AssessmentContext = createContext();

/**
 * Provides the assessment context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @param {Object} props.assessment - The assessment object.
 * @returns {ReactNode} The rendered component.
 */
export default function AssessmentProvider({ children, assessment }) {

    return (

        <AssessmentContext.Provider value={assessment}>
            { children }
        </AssessmentContext.Provider>

    )
}