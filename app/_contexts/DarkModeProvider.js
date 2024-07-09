"use client";

import React, { createContext, useState, useEffect } from "react"

/**
 * @fileoverview Defines the DarkModeContext.
 * @module DarkModeProvider
 */
export const DarkModeContext = createContext();

/**
 * Provides a context for managing dark mode state.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The DarkModeProvider component.
 */
export default function DarkModeProvider(props) {

    /**
     * Represents the Dark Mode Provider.
     * @typedef {Object} DarkModeProvider
     * @property {boolean} darkMode - Indicates whether dark mode is enabled or not.
     * @property {function} setDarkMode - Function to toggle the dark mode.
     */
    const [darkMode, setDarkMode] = useState(true);

    
    /**
     * Toggles the dark mode state.
     */
    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div>
            <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
                { props.children }
            </DarkModeContext.Provider>
        </div>
    )
}