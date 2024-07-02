import React from 'react';
import UserForm from '../../../../_components/forms/UserForm/UserForm';

export default async function Page() {

    return (
        <div className="grid w-full grid-cols-1">
            <h1 className="text-lg">Create a new user</h1>
            <UserForm />
        </div>
    );
}