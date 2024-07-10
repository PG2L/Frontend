import React from 'react';

/**
 * Renders the statistics page.
 * @returns A Promise that resolves to a JSX.Element representing the statistics page.
 */
export default async function Page(): Promise<React.JSX.Element> {

    const menuContent: {
        name: string,
        content: {
            name: string,
            value: number,
        }[];
    }[] = [
            {
                "name": "Courses & Lessons",
                "content": [
                    {
                        "name": "Courses completed",
                        "value": 5
                    },
                    {
                        "name": "Lessons completed",
                        "value": 18
                    },
                    {
                        "name": "*",
                        "value": 3
                    },
                    {
                        "name": "* *",
                        "value": 5
                    },
                    {
                        "name": "* * *",
                        "value": 4
                    },
                    {
                        "name": "* * * *",
                        "value": 5
                    },
                    {
                        "name": "* * * * *",
                        "value": 1
                    }
                ]
            },
            {
                "name": "Achievements",
                "content": [
                    {
                        "name": "Achievements completed",
                        "value": 18
                    },
                    {
                        "name": "Achievements failed",
                        "value": 5
                    },
                    {
                        "name": "Achievements in progress",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Badges",
                "content": [
                    {
                        "name": "Badges completed",
                        "value": 5
                    },
                    {
                        "name": "Badges failed",
                        "value": 18
                    }
                ]
            },
            {
                "name": "Quests",
                "content": [
                    {
                        "name": "Quests completed",
                        "value": 18
                    },
                    {
                        "name": "Quests failed",
                        "value": 5
                    },
                    {
                        "name": "Quests in progress",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Rewards",
                "content": [
                    {
                        "name": "Rewards claimed",
                        "value": 5
                    },
                    {
                        "name": "Rewards pending",
                        "value": 18
                    }
                ]
            },
            {
                "name": "Stats",
                "content": [
                    {
                        "name": "Total XP",
                        "value": 18
                    },
                    {
                        "name": "Total XP earned",
                        "value": 5
                    },
                    {
                        "name": "Total XP spent",
                        "value": 3
                    },
                    {
                        "name": "Total XP lost",
                        "value": 5
                    },
                ]
            },
            {
                "name": "Progress",
                "content": [
                    {
                        "name": "Progress to next level",
                        "value": 18
                    },
                    {
                        "name": "Progress to next rank",
                        "value": 5
                    },
                    {
                        "name": "Progress to next badge",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Rank",
                "content": [
                    {
                        "name": "Rank",
                        "value": 18
                    },
                    {
                        "name": "Rank progress",
                        "value": 5
                    },
                    {
                        "name": "Rank progress to next rank",
                        "value": 3
                    }
                ]
            },
            {
                "name": "Level",
                "content": [
                    {
                        "name": "Level",
                        "value": 18
                    },
                    {
                        "name": "Level progress",
                        "value": 5
                    },
                    {
                        "name": "Level progress to next level",
                        "value": 3
                    }
                ]
            }
        ];

    return (

        <div className="flex gap-6 w-full">
            <div className="w-full flex gap-6">
                <div className="grid gap-4 w-full">
                    {
                        menuContent.map((item: { // Mapping the first 4 elements of the menuContent array to JSX elements.
                            name: string;
                            content: {
                                name: string;
                                value: number;
                            }[];
                        }, index: number): false | React.JSX.Element => (
                            index <= 3 && ( // If the index is less than or equal to 3, render the JSX element.
                                <div key={ index } className="flex flex-col">
                                    <h2 className=" font-medium mb-2">{ item.name }</h2>
                                    { item.content.map((content: {
                                        name: string;
                                        value: number;
                                    }, index: number): React.JSX.Element => (
                                        <div key={ index } className="flex justify-between border-b">
                                            <h3 className="text-muted-foreground">{ content.name }</h3>
                                            <h3 className="text-white">{ content.value }</h3>
                                        </div>
                                    )) }
                                </div>
                            )
                        ))
                    }
                </div>
                <div className="grid gap-4 w-full">
                    {
                        menuContent.map((item: { // Mapping the last 5 elements of the menuContent array to JSX elements.
                            name: string;
                            content: {
                                name: string;
                                value: number;
                            }[];
                        }, index: number): false | React.JSX.Element => (
                            index > 3 && ( // If the index is greater than 3, render the JSX element.
                                <div key={ index } className="flex flex-col">
                                    <h2 className=" font-medium mb-2">{ item.name }</h2>
                                    {
                                        item.content.map((content: { // Mapping over the content array to render the content.
                                            name: string;
                                            value: number;
                                        }, index: number): React.JSX.Element => (
                                            <div key={ index } className="flex justify-between border-b">
                                                <h3 className="text-muted-foreground">{ content.name }</h3>
                                                <h3 className="text-white">{ content.value }</h3>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
        </div>

    );
}