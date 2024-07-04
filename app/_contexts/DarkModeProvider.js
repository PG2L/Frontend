"use client";

import React, { createContext, useState, useEffect, useMemo } from "react"

export const DarkModeContext = createContext();

export default function DarkModeProvider(props) {

    const [darkMode, setDarkMode] = useState(true);

    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        localStorage.setItem('darkMode', !darkMode);
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