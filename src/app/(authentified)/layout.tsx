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
                <div className="w-1/5">
                    <MainMenu />
                </div>
                {children}
            </div>
        </>
    )
};
