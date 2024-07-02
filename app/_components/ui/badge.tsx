import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../_lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",

                // Difficulty badges
                beginner: "text-primary-foreground border-transparent bg-[#1abc9c] hover:bg-[#1abc9c]/80",
                novice: "text-primary-foreground border-transparent bg-[#2ecc71] hover:bg-[#2ecc71]/80",
                intermediate: "text-primary-foreground border-transparent bg-[#f1c40f] hover:bg-[#f1c40f]/80",
                advanced: "text-primary-foreground border-transparent bg-[#f39c12] hover:bg-[#f39c12]/80",
                expert: "text-primary-foreground border-transparent bg-[#e67e22]  hover:bg-[#e67e22]/80]",
                master: "text-primary-foreground border-transparent bg-[#e74c3c] hover:bg-[#e74c3c]/80",
                "master+": "text-primary-foreground border-transparent bg-[#c0392b]  hover:bg-[#c0392b]/80]",

                // Language badges
                javascript: "text-primary-foreground border-transparent bg-[#4514cc]  hover:bg-[#4514cc]/80]",
                "c#": "text-primary-foreground border-transparent bg-[#68217a]  hover:bg-[#68217a]/80]",
                "c++": "text-primary-foreground border-transparent bg-[#00599C]  hover:bg-[#00599C]/80]",
                java: "text-primary-foreground border-transparent bg-[#b07219]  hover:bg-[#b07219]/80]",
                php: "text-primary-foreground border-transparent bg-[#8993be]  hover:bg-[#8993be]/80]",
                ruby: "text-primary-foreground border-transparent bg-[#cc342d]  hover:bg-[#cc342d]/80]",
                python: "text-primary-foreground border-transparent bg-[#306998]  hover:bg-[#306998]/80]",
                "html/css": "text-primary-foreground border-transparent bg-[#e34c26] hover:bg-[#e34c26]/80]",
                go: "text-primary-foreground border-transparent bg-[#00add8]  hover:bg-[#00add8]/80]",
                mysql: "text-primary-foreground border-transparent bg-[#4479a1]  hover:bg-[#4479a1]/80]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={ cn(badgeVariants({ variant }), className) } { ...props } />
    );
}

export { Badge, badgeVariants };
