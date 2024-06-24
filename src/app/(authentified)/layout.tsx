import React, { ReactNode } from 'react'
import MainMenu from '@/components/MainMenu/MainMenu';
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';

export default async function CoursesLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <>
            <div className="flex gap-6 justify-between container">
                <MainMenu />
                <div className="w-4/5 flex gap-6">
                    {children}
                </div>
            </div>
        </>
    )
};
