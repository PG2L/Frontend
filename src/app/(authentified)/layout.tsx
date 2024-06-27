import React from 'react';
import MainMenu from '@/components/MainMenu/MainMenu';
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
