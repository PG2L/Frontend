import React from 'react';
import AchievementsTable from '@/_components/AchievementsTable/AchievementsTable';
import { getData } from '@/_lib/data';

/**
 * Renders the Achievement page component.
 * 
 * @returns A Promise that resolves to a JSX.Element representing the Achievement page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    /**
     * Retrieves the achievements data from the server.
     * 
     * @returns {Promise<Achievement[]>} A promise that resolves to an array of Achievement objects.
     */
    const achievements: Achievement[] = await getData("achievements") as Achievement[];

    return (

        <div className="grid items-center justify-center grid-cols-1 gap-6">
            <h1 className="text-xl font-medium text-center">Achievements</h1>
            <div className="space-y-4">
                <p>Welcome to the Achievements page! Here, you can track and celebrate your milestones in our web development e-learning community. Achievements are designed to recognize your hard work and dedication as you progress through various courses and challenges.</p>
                <p className="text-muted-foreground">Earn badges, complete projects, and participate in discussions to unlock new achievements. Each milestone you reach is a testament to your commitment to learning and growing as a web developer.</p>
                <p>Keep pushing forward, and showcase your accomplishments proudly!</p>
            </div>
            <AchievementsTable achievements={ achievements } />
        </div>

    );
}