import React from 'react';
import Leaderboard from '@/components/Leaderboard/Leaderboard';


async function getUsers() {
    const response = await fetch('http://localhost:8000/users')

    if (!response.ok) {
        throw new Error('Failed to fetch users')
    }

    return response.json()
}

export default async function Page() {

    const users: User[] = await getUsers();

    const sortedUsers: User[] = users.sort((a, b) => b.total_points - a.total_points);

    return (
        <>
            <div className="grid w-full items-center justify-center grid-cols-1">
                <h1 className="text-lg text-center">Leaderboard</h1>
                <Leaderboard users={sortedUsers} />
            </div>
        </>
    );
}