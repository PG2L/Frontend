import React from 'react';
import UserForm from '../../../../_components/forms/UserForm/UserForm';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';

async function getUser(id: number) {

    const res = await fetch(`http://localhost:8000/users/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function getUsers() {
    const res = await fetch('http://localhost:8000/users');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Page({
    params,
}: {
    params: {
        userId: string,
    },
}) {

    const user = await getUser(parseInt(params.userId));

    const users = await getUsers();

    return (
        <div className="grid w-full grid-cols-1">
            <AdminHeader user={ user } users={ users } />
            <UserForm user={ user } />
        </div>
    );
}