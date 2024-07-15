import React from 'react';
import AdminMenu from '@/_components/AdminMenu/AdminMenu';

/**
 * Renders the layout for the admin section of the application.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {Promise<React.JSX.Element>} The rendered layout component.
 */
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode,
}): Promise<React.JSX.Element> {

    return (

        <div className="flex gap-6">
            <AdminMenu />
            { children }
        </div>

    );
};