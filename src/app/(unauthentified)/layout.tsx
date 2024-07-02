import React from 'react';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';
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
                <div className="p-6 mt-16">
                    { children }
                </div>
                <FAQ />
                <Footer />
            </div>
        </>
    );
};
