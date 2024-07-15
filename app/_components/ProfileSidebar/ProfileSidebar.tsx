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
    const [isOpen, setIsOpen] = React.useState(true);

    return (

        <div>
            <div className={ `flex bg-card right-0 top-0 sticky z-50 h-screen` }>
                <div className="flex flex-col items-center h-screen fixed justify-center z-[51]">
                    <Button variant="ghost"
                        onClick={ (): void => setIsOpen(!isOpen) } // Toggles the sidebar's open/closed status
                        className={ `absolute !p-2` }
                        size="sm"
                    >
                        { isOpen ? // Ternary operator to display the correct icon based on the sidebar's open/closed status
                            <icons.ChevronRightIcon className="h-6 w-6" />
                            : <icons.ChevronLeftIcon className="h-6 w-6" />
                        }
                    </Button>
                </div>
                { isOpen ? // Ternary operator to display the sidebar content based on the sidebar's open/closed status
                    <ScrollArea className="flex flex-col items-start border-l min-h-screen gap-4 justify-between py-6 px-6 sticky">
                        <div>
                            <div className="items-center justify-center flex">
                                <icons.UserCircleIcon className={ `h-20 w-20` } strokeWidth={ 1 } color="#1461cc" />
                            </div>
                            <div className="grid gap-4 justify-items-center">
                                <div className="grid justify-items-center justify-center">
                                    <div className="grid items-center justify-items-center">
                                        <h1 className="text-2xl font-medium text-center">{ user.username }</h1>
                                        <div className="flex items-center text-center justify-center ">
                                            <div className="text-muted-foreground">Lvl { level.level }</div>
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
                                </div>
                            </div>
                            <Separator className="mt-4" />
                            <div className="mt-4 grid rounded-lg bg-background p-2 border !flex justify-around items-center">
                                <div className="flex">
                                    { user.total_exp }
                                    <icons.MedalIcon className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                                </div>
                                <div className="flex">
                                    { user.total_points }
                                    <icons.Star className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                                </div>
                                <div className="flex">
                                    { user.courses.filter((course: UserCourse): boolean => course.completion_status === "completed").length // Filters the completed courses and counts them
                                    }
                                    <icons.BookCheck className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                                </div>
                            </div>
                            <div className="p-4 mt-4 bg-background rounded-lg border w-full grid gap-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg text-center">Next achievement</h3>
                                    <span className="text-muted-foreground text-center">View all</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/242085?v=4" />
                                    </Avatar>
                                    <div className="grid gap-2 w-full">
                                        <span>React Abuser</span>
                                        <span className="text-muted-foreground">Complete 10 React challenges</span>
                                        <Progress value={ 92 } />
                                    </div>
                                </div>
                            </div>
                            <div className="grid w-full">
                                <h3 className="text-lg font-medium mt-4">Daily Goals</h3>
                                <div className="grid py-2">
                                    <div className="grid gap-2">
                                        <div className="flex justify-between items-center">
                                            <span>Complete 3 lessons</span>
                                            <span className="text-muted-foreground w-1/3 text-end content-end">+100 XP</span>
                                        </div>
                                        <Progress value={ 0 } />
                                    </div>
                                    <div className="grid mt-4 gap-2">
                                        <div className="flex justify-between items-center">
                                            <span>Complete one lesson without any mistake</span>
                                            <span className="text-muted-foreground w-1/3 text-end content-end">+50 XP</span>
                                        </div>
                                        <Progress value={ 0 } />
                                    </div>
                                    <div className="grid mt-4 gap-2">
                                        <div className="flex justify-between items-center">
                                            <span>Duel a friend</span>
                                            <span className="text-muted-foreground w-1/3 text-end content-end">+150 XP</span>
                                        </div>
                                        <Progress value={ 0 } />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 w-full align-self-end mt-6">
                            <div className="bg-background rounded-lg border p-4 grid gap-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg text-center">Friends <span className="text-base text-muted-foreground">(All-time XP)</span></h3>
                                    <span className="text-muted-foreground text-center">View all</span>
                                </div>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142035?v=4" />
                                    </Avatar>
                                    <div className="flex w-full justify-between items-center">
                                        <span>Nakkarst</span>
                                        <span className="text-muted-foreground">14670</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142095?v=4" />
                                    </Avatar>
                                    <div className="flex w-full justify-between items-center">
                                        <span>Tekky</span>
                                        <span className="text-muted-foreground">9452</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142045?v=4" />
                                    </Avatar>
                                    <div className="flex w-full justify-between items-center">
                                        <span>Vilou21</span>
                                        <span className="text-muted-foreground">3589</span>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center w-full flex justify-between">
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
                    <div className="items-center flex flex-col justify-between py-6 px-2 border-l">
                        <div>
                            <div className="items-center justify-center flex">
                                <icons.UserCircleIcon className="h-16 w-16" strokeWidth={ 1 } color="#1461cc" />
                            </div>
                            <Separator className="mt-4" />
                            <div className={
                                `mt-4 grid rounded-lg bg-background p-2 border ` +
                                `${isOpen ? '!flex justify-around items-center' : 'justify-items-end items-end gap-2'}` // Conditional classes based on isOpen state
                            }>
                                <div className="flex">
                                    { user.total_exp }
                                    <icons.MedalIcon className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                                </div>
                                <div className="flex">
                                    { user.total_points }
                                    <icons.Star className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                                </div>
                                <div className="flex">
                                    { user.courses.filter((course: UserCourse): boolean => course.completion_status === "completed").length // Filters the completed courses and counts them
                                    }
                                    <icons.BookCheck className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                                </div>
                            </div>
                        </div>
                        <div>
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
                    </div>
                }
            </div >
        </div >

    );
};

export default ProfileSidebar;
