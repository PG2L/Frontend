import React from 'react';
import MainMenu from '@/components/MainMenu/MainMenu';
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Header from '@/components/Header/Header';

export default async function CoursesLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="p-6 mt-20">
                    { children }
                </div>
                <FAQ />
                <Footer />
            </div>
        </>
    );
};
