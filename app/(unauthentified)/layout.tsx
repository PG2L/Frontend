import React from 'react';
import FAQ from '../_components/FAQ/FAQ';
import Footer from '../_components/Footer/Footer';
import Header from '../_components/Header/Header';

export default function UnauthentifiedLayout({
    children,
}: {
    children: React.ReactNode,
}): React.JSX.Element {

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
