import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../ui/avatar";
import { Button } from "../ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";

interface UserHoverCardProps {
    user: User;
}

/**
 * Renders a user hover card component.
 * 
 * @param {Object} user - The user object.
 * @returns {JSX.Element} The user hover card component.
 */
export function UserHoverCard({ user }: UserHoverCardProps): React.JSX.Element {

    return (

        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">@{ user.username }</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{ user.username }</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                            <span className="text-xs text-muted-foreground">
                                Since { user.created_at }
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>

    );
}
