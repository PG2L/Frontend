import React from 'react';
import UserForm from '../../../../_components/forms/UserForm/UserForm';
import AdminHeader from '../../../../_components/AdminHeader/AdminHeader';
import { getData } from '../../../../_lib/data';

/**
 * Renders the page component for a specific user.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The parameters object.
 * @param {string} props.params.userId - The ID of the user.
 * @returns {Promise<React.JSX.Element>} The rendered page component.
 */
export default async function Page({
    params,
}: {
    params: {
        userId: string,
    },
}): Promise<React.JSX.Element> {

    /**
     * Retrieves user data from the server.
     * 
     * @param {string} resource - The resource to fetch data from.
     * @param {number} userId - The ID of the user to retrieve data for.
     * @returns {Promise<User>} - A promise that resolves to the user data.
     */
    const user: User = await getData("users", parseInt(params.userId)) as User;

    /**
     * Fetches user data from the server.
     * 
     * @param endpoint - The endpoint to fetch data from.
     * @returns An array of User objects.
     */
    const users: User[] = await getData("users") as User[];

    return (

        <div className="grid w-full grid-cols-1">
            <AdminHeader item={ user } content={ users } />
            <UserForm user={ user } />
        </div>

    );
}