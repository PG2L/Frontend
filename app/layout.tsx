import React from 'react';
import DarkModeProvider from "@/_contexts/DarkModeProvider";
import './globals.css';
import { Toaster } from '@/_components/ui/toaster';

export const metadata = {
    title: 'PG2L',
    description: 'PlayGames2Learn',
};

/**
 * Root layout component that wraps the entire application.
 *
 * @param children - The child components to be rendered within the layout.
 * @returns The JSX element representing the root layout.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {

    return (

        <html lang="en">
            <body suppressHydrationWarning={ true }>
                <DarkModeProvider>
                    <div className="flex flex-col" id="layout" data-testid="layout">
                        <main>
                            { children }
                        </main>
                    </div>
                </DarkModeProvider>
                <Toaster />
            </body>
        </html>

    );
}
