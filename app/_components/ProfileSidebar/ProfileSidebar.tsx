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
                    onClick={ (): void => setIsOpen(!isOpen) }
                    className="absolute !p-2"
                    size="sm"
                >
                    { isOpen ?
                        <icons.ChevronRightIcon className="size-6" strokeWidth={ 1 } />
                        :
                        <icons.ChevronLeftIcon className="size-6" strokeWidth={ 1 } />
                    }
                </Button>
            </div>
            { isOpen ?
                <ScrollArea className="min-h-screen py-6 px-6 sticky min-w-[320px]">
                    <icons.UserCircleIcon className="size-20 mx-auto" strokeWidth={ 1 } color="#1461cc" />
                    <div>
                        <h1 className="text-2xl font-medium text-center">{ user.username }</h1>
                        <div className="flex items-center text-center justify-center [&_p]:text-muted-foreground">
                            <p>Lvl { level.level }</p>
                            <icons.Dot className="size-8 text-primary" />
                            <p>Rank 1</p>
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
                    <Card className="bg-background flex justify-around items-center py-2 [&_p]:flex [&_p]:gap-1 [&_p>*]:text-primary [&_p>*]:size-6">
                        <p>
                            { user.total_exp }
                            <icons.MedalIcon strokeWidth={ 1 } />
                        </p>
                        <p>
                            { user.total_points }
                            <icons.Star strokeWidth={ 1 } />
                        </p>
                        <p>
                            { user.courses.filter((course: UserCourse): boolean => course.completion_status === "completed").length }
                            <icons.BookCheck strokeWidth={ 1 } />
                        </p>
                    </Card>
                    <Card className="mt-4 bg-background">
                        <CardHeader>
                            <p className="flex justify-between items-center">
                                <h3 className="text-lg text-center">Next achievement</h3>
                                <span className="text-muted-foreground text-nowrap">View all</span>
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
                        <div className="py-2 [&_div]:space-y-2 [&_div>p]:flex [&_div>p]:justify-between [&_div>p]:items-center last:[&_div>p>span]:text-muted-foreground last:[&_div>p>span]:w-1/3 last:[&_div>p>span]:text-end last:[&_div>p>span]:content-end">
                            <div>
                                <p>
                                    <span>Complete 3 lessons</span>
                                    <span>+100 XP</span>
                                </p>
                                <Progress value={ 0 } />
                            </div>
                            <div className="mt-4">
                                <p>
                                    <span>Complete one lesson without any mistake</span>
                                    <span>+50 XP</span>
                                </p>
                                <Progress value={ 0 } />
                            </div>
                            <div className="mt-4">
                                <p>
                                    <span>Duel a friend</span>
                                    <span>+150 XP</span>
                                </p>
                                <Progress value={ 0 } />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 align-self-end mt-6">
                        <Card className="bg-background">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg">Friends <span className="text-base text-muted-foreground">(All-time XP)</span></h3>
                                    <p className="text-muted-foreground text-nowrap">View all</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 [&_div]:flex [&_div]:gap-2 [&_div>p]:flex [&_div>p]:w-full [&_div>p]:justify-between [&_div>p]:items-center [&_div>p>span]:text-muted-foreground">
                                <div>
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142035?v=4" />
                                    </Avatar>
                                    <p>
                                        <span>Nakkarst</span>
                                        <span>14670</span>
                                    </p>
                                </div>
                                <div>
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142095?v=4" />
                                    </Avatar>
                                    <p>
                                        <span>Tekky</span>
                                        <span>9452</span>
                                    </p>
                                </div>
                                <div>
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/142045?v=4" />
                                    </Avatar>
                                    <p>
                                        <span>Vilou21</span>
                                        <span>3589</span>
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
                            </Select>
                        </div>
                        <Separator />
                    </div>
                    <ScrollBar />
                </ScrollArea>
                : // Sidebar content when closed
                <div className="items-center flex flex-col justify-between py-6 px-2">
                    <div>
                        <icons.UserCircleIcon className="size-16 mx-auto" strokeWidth={ 1 } color="#1461cc" />
                        <Separator className="my-4" />
                        <Card className="bg-background flex flex-col items-end p-2 gap-2 [&_p]:flex [&_p>*]:text-primary [&_p>*]:size-6 [&_p>*]:ms-1">
                            <p>
                                { user.total_exp }
                                <icons.MedalIcon strokeWidth={ 1 } />
                            </p>
                            <p>
                                { user.total_points }
                                <icons.Star strokeWidth={ 1 } />
                            </p>
                            <p>
                                { user.courses.filter((course: UserCourse): boolean => course.completion_status === "completed").length }
                                <icons.BookCheck strokeWidth={ 1 } />
                            </p>
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
