import React from 'react';
import { Skeleton } from '@/_components/ui/skeleton';

/**
 * Renders a loading component with skeleton placeholders.
 *
 * @returns The JSX element representing the loading component.
 */
export default function Loading(): React.JSX.Element {

    return (

        <div className="grid items-center justify-center grid-cols-1 gap-6">
            <h1 className="text-xl font-medium text-center">Achievements</h1>
            <div className="space-y-4">
                <p>Welcome to the Achievements page! Here, you can track and celebrate your milestones in our web development e-learning community. Achievements are designed to recognize your hard work and dedication as you progress through various courses and challenges.</p>
                <p className="text-muted-foreground">Earn badges, complete projects, and participate in discussions to unlock new achievements. Each milestone you reach is a testament to your commitment to learning and growing as a web developer.</p>
                <p>Keep pushing forward, and showcase your accomplishments proudly!</p>
                <Skeleton className="h-10 w-1/4 mt-4" />
                <div>
                    { Array.from({ length: 10 }).map((_: unknown, index: number): React.JSX.Element => ( // Mapping over an array of 10 undefined elements to render 10 skeleton placeholders.
                        <Skeleton key={ index } className="h-16 w-full mt-2" />
                    )) }
                </div>
            </div>
        </div>

    );
}