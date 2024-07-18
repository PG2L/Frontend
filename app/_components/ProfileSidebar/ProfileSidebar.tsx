"use client";

import React, {
    FC,
    useContext
} from 'react';
import { Badge } from '@/_components/ui/badge';
import * as icons from 'lucide-react';
import { Button } from '@/_components/ui/button';
import { Separator } from '@/_components/ui/separator';
import {
    Avatar,
    AvatarImage
} from '@/_components/ui/avatar';
import { Progress } from '@/_components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from '@/_components/ui/select';
import DarkModeToggle from '@/_components/DarkModeToggle/DarkModeToggle';
import {
    ScrollArea,
    ScrollBar
} from '@/_components/ui/scroll-area';
import { UserContext } from '@/_contexts/UserProvider';
import { getLevelByExp } from '@/_lib/levels';
import { Card, CardContent, CardHeader } from '@/_components/ui/card';

interface ProfileSidebarProps { }

/**
 * Represents the profile sidebar component.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
const ProfileSidebar: FC<ProfileSidebarProps> = (): React.JSX.Element => {

    /**
     * Retrieves the user from the UserContext.
     * @returns The user object.
     */
    const user: User = useContext(UserContext);

    /**
     * Retrieves the level and experience based on the total experience points.
     *
     * @param {number} totalExp - The total experience points.
     * @returns {[number, number]} - An array containing the level and experience.
     */
    const [level, exp] = getLevelByExp(user.total_exp);

    /**
     * Represents the state of the sidebar's open/closed status.
     */
    const [isOpen, setIsOpen] = React.useState(false);

    return (

        <div className="flex bg-card z-50 h-screen border-l">
            <div className="flex flex-col items-center h-screen fixed justify-center z-[51]">
                <Button variant="ghost"
                    onClick={ (): void => setIsOpen(!isOpen) } // Toggles the sidebar's open/closed status
                    className="absolute !p-2"
                    size="sm"
                >
                    { isOpen ? // Ternary operator to display the correct icon based on the sidebar's open/closed status
                        <icons.ChevronRightIcon className="size-6" strokeWidth={ 1 } />
                        :
                        <icons.ChevronLeftIcon className="size-6" strokeWidth={ 1 } />
                    }
                </Button>
            </div>
            { isOpen ? // Ternary operator to display the sidebar content based on the sidebar's open/closed status
                <ScrollArea className="min-h-screen py-6 px-6 sticky">
                    <icons.UserCircleIcon className="size-20 mx-auto" strokeWidth={ 1 } color="#1461cc" />
                    <div>
                        <h1 className="text-2xl font-medium text-center">{ user.username }</h1>
                        <div className="flex items-center text-center justify-center">
                            <p className="text-muted-foreground">Lvl { level.level }</p>
                            <icons.Dot className="size-8 text-primary" />
                            <p className="text-muted-foreground">Rank 1</p>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-1">
                            <Badge>Beginner</Badge>
                            <Badge>Fast Learner</Badge>
                            <Badge>React Expert</Badge>
                            <Badge>Python Master</Badge>
                            <Badge>Hacker</Badge>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <Card className="bg-background flex justify-around items-center py-1">
                        <div className="flex gap-1">
                            { user.total_exp }
                            <icons.MedalIcon className="size-6 text-primary" strokeWidth={ 1 } />
                        </div>
                        <div className="flex gap-1">
                            { user.total_points }
                            <icons.Star className="size-6 text-primary" strokeWidth={ 1 } />
                        </div>
                        <div className="flex gap-1">
                            { user.courses.filter((course: UserCourse): boolean => course.completion_status === "completed").length // Filters the completed courses and counts them
                            }
                            <icons.BookCheck className="size-6 text-primary" strokeWidth={ 1 } />
                        </div>
                    </Card>
                    <Card className="mt-4 bg-background">
                        <CardHeader>
                            <p className="flex justify-between items-center">
                                <h3 className="text-lg text-center">Next achievement</h3>
                                <span className="text-muted-foreground text-center">View all</span>
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 items-center">
                                <Avatar className="size-16">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/242085?v=4" />
                                </Avatar>
                                <div className="space-y-2 w-full">
                                    <p>React Abuser</p>
                                    <p className="text-muted-foreground">Complete 10 React challenges</p>
                                    <Progress value={ 92 } />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div>
                        <h3 className="text-lg font-medium mt-4">Daily Goals</h3>
                        <div className="py-2">
                            <div className="space-y-2">
                                <p className="flex justify-between items-center">
                                    <span>Complete 3 lessons</span>
                                    <span className="text-muted-foreground w-1/3 text-end content-end">+100 XP</span>
                                </p>
                                <Progress value={ 0 } />
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="flex justify-between items-center">
                                    <span>Complete one lesson without any mistake</span>
                                    <span className="text-muted-foreground w-1/3 text-end content-end">+50 XP</span>
                                </p>
                                <Progress value={ 0 } />
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="flex justify-between items-center">
                                    <span>Duel a friend</span>
                                    <span className="text-muted-foreground w-1/3 text-end content-end">+150 XP</span>
                                </p>
                                <Progress value={ 0 } />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 align-self-end mt-6">
                        <Card className="bg-background">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg text-center">Friends <span className="text-base text-muted-foreground">(All-time XP)</span></h3>
                                    <p className="text-muted-foreground text-center">View all</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142035?v=4" />
                                    </Avatar>
                                    <p className="flex w-full justify-between items-center">
                                        <span>Nakkarst</span>
                                        <span className="text-muted-foreground">14670</span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142095?v=4" />
                                    </Avatar>
                                    <p className="flex w-full justify-between items-center">
                                        <span>Tekky</span>
                                        <span className="text-muted-foreground">9452</span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142045?v=4" />
                                    </Avatar>
                                    <p className="flex w-full justify-between items-center">
                                        <span>Vilou21</span>
                                        <span className="text-muted-foreground">3589</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex items-center w-full justify-between">
                            <DarkModeToggle />
                            <Select>
                                <SelectTrigger className="w-fit flex gap-2">
                                    <icons.FlagIcon />
                                    Français
                                </SelectTrigger >
                                <SelectContent>
                                    <SelectItem value="eng">English</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                </SelectContent>
                            </Select >
                        </div >
                        <Separator />
                    </div >
                    <ScrollBar />
                </ScrollArea >
                : // Sidebar content when closed
                <div className="items-center flex flex-col justify-between py-6 px-2">
                    <div>
                        <icons.UserCircleIcon className="size-16 mx-auto" strokeWidth={ 1 } color="#1461cc" />
                        <Separator className="my-4" />
                        <Card className="bg-background">
                            <div className="flex flex-col items-end p-2 gap-2">
                                <p className="flex">
                                    { user.total_exp }
                                    <icons.MedalIcon className="ms-1 size-6 text-primary" strokeWidth={ 1 } />
                                </p>
                                <p className="flex justify-self-end">
                                    { user.total_points }
                                    <icons.Star className="ms-1 size-6 text-primary" strokeWidth={ 1 } />
                                </p>
                                <p className="flex">
                                    { user.courses.filter((course: UserCourse): boolean => course.completion_status === "completed").length
                                    }
                                    <icons.BookCheck className="ms-1 size-6 text-primary" strokeWidth={ 1 } />
                                </p>
                            </div>
                        </Card>
                    </div>
                    <div className="items-center w-full grid gap-4">
                        <DarkModeToggle />
                        <Select>
                            <SelectTrigger className="w-fit flex gap-2">
                                <icons.FlagIcon />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="eng">English</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                            </SelectContent>
                        </Select>
                        <Separator />
                    </div>
                </div>
            }
        </div>

    );
};

export default ProfileSidebar;
