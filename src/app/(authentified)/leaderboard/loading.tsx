import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <>
            <div className="grid items-center justify-center grid-cols-1 gap-6">
                <h1 className="text-xl font-medium text-center">Leaderboard</h1>
                <div className="grid gap-4">
                    <p>Welcome to the Leaderboard page! Here, we celebrate the top achievers in our web development e-learning community. The leaderboard is designed to motivate and inspire you by showcasing the accomplishments of your peers.</p>

                    <p className="text-muted-foreground">Track your progress, compare your performance with other learners, and aim for the top spot by completing courses, earning badges, and excelling in coding challenges. Whether you&apos;re mastering HTML, CSS, JavaScript, or advanced frameworks, your efforts and dedication are recognized here.</p>

                    <p>Keep learning, keep coding, and climb the ranks to become a web development superstar!</p>
                    <Skeleton className="h-10 w-1/4 mt-4" />
                    <div>
                        { Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={ index } className="h-16 w-full mt-2" />
                        )) }
                    </div>
                </div>
            </div>
        </>
    );
}