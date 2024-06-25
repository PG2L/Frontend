import React from 'react';
import Leaderboard from '@/components/Leaderboard/Leaderboard';


async function getUsers() {
    const response = await fetch('http://localhost:8000/users');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export default async function Page() {

    const users: User[] = await getUsers();

    const sortedUsers: User[] = users.sort((a, b) => b.total_points - a.total_points);

    return (
        <>
            <div className="grid items-center justify-center grid-cols-1 gap-6 w-4/5">
                <h1 className="text-lg text-center">Leaderboard</h1>
                <div className="grid gap-4 text-muted-foreground">
                    <p>Welcome to the Leaderboard page! Here, we celebrate the top achievers in our web development e-learning community. The leaderboard is designed to motivate and inspire you by showcasing the accomplishments of your peers.</p>

                    <p>Track your progress, compare your performance with other learners, and aim for the top spot by completing courses, earning badges, and excelling in coding challenges. Whether you're mastering HTML, CSS, JavaScript, or advanced frameworks, your efforts and dedication are recognized here.</p>

                    <p className="text-foreground">Keep learning, keep coding, and climb the ranks to become a web development superstar!</p>
                </div>
                <Leaderboard users={ sortedUsers } />
            </div>
        </>
    );
}