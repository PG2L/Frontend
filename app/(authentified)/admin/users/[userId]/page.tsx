import React from 'react';
import UserForm from '../../../../_components/forms/UserForm/UserForm';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { getData } from '../../../../_lib/data';

export default async function Page({
    params,
}: {
    params: {
        userId: string,
    },
}): Promise<React.JSX.Element> {

    const user: User = await getData("users", parseInt(params.userId)) as User;
    const users: User[] = await getData("users") as User[];

    return (
        <div className="grid w-full grid-cols-1">
            <AdminHeader user={ user } users={ users } />
            <UserForm user={ user } />
        </div>
    );
}