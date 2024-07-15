import React from 'react';
import MainMenu from '@/_components/MainMenu/MainMenu';
import ProfileSidebar from '@/_components/ProfileSidebar/ProfileSidebar';
import FAQ from '@/_components/FAQ/FAQ';
import Footer from '@/_components/Footer/Footer';
import {
    ScrollArea,
    ScrollBar
} from '@/_components/ui/scroll-area';
import UserProvider from '@/_contexts/UserProvider';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getData } from '@/_lib/data';

/**
 * Renders the layout for authenticated users.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {Promise<React.JSX.Element>} The rendered layout component.
 */
export default async function AuthentifiedLayout({
    children,
}: {
    children: React.ReactNode,
}): Promise<React.JSX.Element> {

    /**
     * Retrieves the user ID from the cookie.
     *
     * @param {string} name - The name of the cookie.
     * @param {object} options - The options for retrieving the cookie.
     * @returns {string} The user ID stored in the cookie.
     */
    const userId = getCookie('userId', { cookies });

    /**
     * Retrieves the user data from the server.
     * 
     * @param endpoint - The endpoint to fetch the data from.
     * @param userId - The ID of the user to retrieve data for.
     * @returns A Promise that resolves to the user data.
     */
    const user: User = await getData("users", Number(userId)) as User;

    return (

        <div className="flex justify-between">

            {/* UserProvider component wraps the layout to provide user context to all child components */ }
            <UserProvider user={ user }>

                {/* MainMenu component, typically contains navigation links */ }
                <MainMenu />

                {/* ScrollArea component to allow scrolling through the main content area */ }
                <ScrollArea className="grid w-full max-h-screen">

                    {/* Main content area where child components are rendered */ }
                    <div className="p-6">
                        { children }
                    </div>

                    {/* Frequently Asked Questions section */ }
                    <FAQ />

                    {/* Footer component, typically contains copyright and other site information */ }
                    <Footer />

                    {/* ScrollBar component to enhance the scrolling experience */ }
                    <ScrollBar />
                </ScrollArea>

                {/* ProfileSidebar component, provides user-specific navigation or information */ }
                <ProfileSidebar />
            </UserProvider>
        </div>

    );
};
