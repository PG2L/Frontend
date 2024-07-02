import React from 'react';
import AdminMenu from '../../_components/AdminMenu/AdminMenu';

export default async function AdminLayout({
    children,

}: {
    children: React.ReactNode,

}) {

    return (
        <>
            <div className="flex gap-6">
                <AdminMenu />
                { children }
            </div>
        </>
    );
};