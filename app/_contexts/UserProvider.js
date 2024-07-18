"use client";

import React, { createContext } from "react"

/**
 * @fileoverview Defines the UserContext for the application.
 * @module UserProvider
 */
export const UserContext = createContext();

/**
 * Provides the user context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @param {Object} props.user - The user object.
 * @returns {ReactNode} The user provider component.
 */
export default function UserProvider({ children, user }) {

    return (

        <UserContext.Provider value={user} >
            { children }
        </UserContext.Provider>
        
    )
}