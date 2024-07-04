import React from 'react';
import AdminMenu from '../../_components/AdminMenu/AdminMenu';

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