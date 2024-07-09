import React from 'react';
import UserForm from '../../../../_components/forms/UserForm/UserForm';

/**
 * Renders the page for creating a new user.
 * @returns A Promise that resolves to a JSX.Element representing the page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    return (
        <div className="grid w-full grid-cols-1">
            <h1 className="text-lg">Create a new user</h1>
            <UserForm />
        </div>
    );
}