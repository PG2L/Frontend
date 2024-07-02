import React from 'react';

export default async function NewLessonLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="grid grid-cols-1 w-full">
            <h1 className="text-lg">Create a new lesson</h1>
            {children}
        </div>
    )
}