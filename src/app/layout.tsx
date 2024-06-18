import React from 'react'
import './globals.css';
import Header from '@/components/Header/Header';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';


export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-col" id="layout" data-testid="layout">
                    <Header />
                    <main className="MainContent container pt-20 pb-12 w-full">
                        {children}
                    </main>
                    <FAQ />
                    <Footer />
                </div>
            </body>
        </html>
    )
}