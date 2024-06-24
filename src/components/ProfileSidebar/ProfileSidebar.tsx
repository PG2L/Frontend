import React, { FC } from 'react';
import styles from './ProfileSidebar.module.css';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import * as icons from 'lucide-react';

interface ProfileSidebarProps {
    user?: {
        username: string;
        level: number;
        rank: number;
        badges: string[];
        country: string;
        created_at: string;
    }
}

const ProfileSidebar: FC<ProfileSidebarProps> = () => {
    return (
        <div className="w-1/5 items-start">
            <Card className="sticky top-6">
                <CardHeader className="items-center justify-center">
                    <icons.UserCircleIcon className="h-24 w-24" strokeWidth={1} />
                </CardHeader>
                <CardContent className="rounded grid gap-4 lg:gap-6 justify-items-center">
                    <div className="grid grid cols-1 gap-2 lg:gap-6 justify-items-center justify-center">
                        <div className="grid gap-2 items-center justify-items-center">
                            <h3 className=" flex items-end text-primary font-medium text-center justify-center">
                                Order of the PG2L Gardians
                            </h3>
                            <h1 className="text-xl font-medium text-center">Nakkarst</h1>
                            <div className="flex items-center text-center justify-center ">
                                <div className="text-muted-foreground">Lvl 68</div>
                                <icons.Dot className="h-8 w-8 text-primary" />
                                <div className="text-muted-foreground">Rank 1</div>
                            </div>
                            <div className="flex flex-wrap justify-center items-center my-auto gap-1">
                                <Badge>Beginner</Badge>
                                <Badge>Fast Learner</Badge>
                                <Badge>React Expert</Badge>
                                <Badge>Python Master</Badge>
                                <Badge>Hacker</Badge>
                            </div>
                        </div>
                        <CardFooter>
                            <div className="text-muted-foreground text-center">
                                <p>France</p>
                                <p>Since <span>12 . 05 . 2024</span> </p>
                            </div>
                        </CardFooter>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default ProfileSidebar;
