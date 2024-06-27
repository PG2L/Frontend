"use client";

import React, { FC } from 'react';
import { Badge } from '../ui/badge';
import * as icons from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Card, CardHeader } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface ProfileSidebarProps {
    user?: {
        username: string;
        level: number;
        rank: number;
        badges: string[];
        country: string;
        created_at: string;
    };
}

const ProfileSidebar: FC<ProfileSidebarProps> = () => {

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <>
            <div className={ `flex bg-card right-0 top-0 sticky z-50 ${isOpen ? 'h-fit' : 'h-screen'}` }>
                <div className="flex flex-col items-center h-screen fixed justify-center z-[51]">
                    <Button variant="ghost" onClick={ () => setIsOpen(!isOpen) } className={ `absolute !p-2` } size="sm">
                        { isOpen ? <icons.ChevronRightIcon className="h-6 w-6" /> : <icons.ChevronLeftIcon className="h-6 w-6" /> }
                    </Button>
                </div>
                <div className={ `flex flex-col items-start border-l gap-4 py-6 ${isOpen ? "px-6 h-fit sticky" : "px-2 h-screen justify-between sticky top-0"}` }>
                    <div className="items-center">
                        <div className="items-center justify-center flex">
                            <icons.UserCircleIcon className={ `${isOpen ? "h-20 w-20" : "h-12 w-12"}` } strokeWidth={ 1 } color="#1461cc" />
                        </div>
                        { isOpen &&
                            <div className="grid gap-4 justify-items-center">
                                <div className="grid justify-items-center justify-center">
                                    <div className="grid items-center justify-items-center">
                                        <h1 className="text-2xl font-medium text-center">Nakkarst</h1>
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
                                </div>
                            </div>
                        }
                        <Separator className="mt-4" />
                        <div className={ `mt-4 grid rounded-lg bg-background p-2 border ${isOpen ? '!flex justify-around items-center' : 'justify-items-end items-end gap-2'}` }>
                            <div className="flex">
                                39875
                                <icons.MedalIcon className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                            </div>
                            <div className="flex">
                                14085
                                <icons.Star className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                            </div>
                            <div className="flex">
                                14
                                <icons.BookCheck className="ms-1 h-6 w-6 text-primary" strokeWidth={ 1 } />
                            </div>
                        </div>
                        { isOpen &&
                            <>
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
                                    {/* <span className="text-muted-foreground text-sm my-2">Complete these challenges daily for even more rewards !</span> */ }
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
                            </>
                        }
                    </div>
                    <div className="grid gap-4 w-full">
                        { isOpen &&
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
                        }
                        <div className={ `items-center w-full flex ${isOpen ? "justify-between" : "flex-col gap-6"}` }>
                            <div className={ `flex gap-2 items-center ${!isOpen && "w-full justify-center"}` }>
                                <Switch id="dark-mode-toggle" aria-orientation='vertical' />
                                <icons.Moon height={ 20 } width={ 20 } />
                            </div>
                            <Select>
                                <SelectTrigger className="w-fit flex gap-2">
                                    <icons.FlagIcon />
                                    { isOpen && "Français" }
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="eng">English</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSidebar;
