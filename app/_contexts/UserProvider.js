"use client";

import React, { createContext } from "react"

export const UserContext = createContext();

export default function UserProvider({ children, user }) {
    return (
        <>
            <UserContext.Provider value={user} >
                { children }
            </UserContext.Provider>
        </>
    )
}