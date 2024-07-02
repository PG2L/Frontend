import React from 'react';
import MainMenu from '@/app/_components/MainMenu/MainMenu';
import ProfileSidebar from '@/app/_components/ProfileSidebar/ProfileSidebar';
import FAQ from '@/app/_components/FAQ/FAQ';
import Footer from '@/app/_components/Footer/Footer';
import { ScrollArea, ScrollBar } from '@/app/_components/ui/scroll-area';

export default async function CoursesLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <>
            <div className="flex justify-between">
                <MainMenu />
                <ScrollArea className="grid w-full max-h-screen">
                    <div className="p-6">
                        { children }
                    </div>
                    <FAQ />
                    <Footer />
                    <ScrollBar />
                </ScrollArea>
                <ProfileSidebar />
            </div>
        </>
    );
};
