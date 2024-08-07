"use client";

import React, { FC } from 'react';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent
} from '@/_components/ui/collapsible';
import { icons } from 'lucide-react';

const faqs: {
    question: string;
    answer: string;
}[] = [
        {
            question: "What is your name?",
            answer: "My name is GitHub Copilot."
        },
        {
            question: "What do you do?",
            answer: "I assist with programming tasks."
        },
        {
            question: "How can I contact you?",
            answer: "I'm an AI and can't be contacted directly."
        },
        {
            question: "What languages do you support?",
            answer: "I support many programming languages including JavaScript, Python, Java, C++, and more."
        },
        {
            question: "Can you write code for me?",
            answer: "Yes, I can generate code based on your requirements."
        },
        {
            question: "Can you review my code?",
            answer: "Yes, I can review your code and suggest improvements."
        },
        {
            question: "Can you debug my code?",
            answer: "Yes, I can help identify issues in your code."
        },
        {
            question: "Can you test my code?",
            answer: "Yes, I can generate unit tests for your code."
        }
    ];

interface FAQProps { }

const FAQ: FC<FAQProps> = (): React.JSX.Element => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="faq bg-card border-t w-full border-t mt-auto">
            <div className="container mx-auto p-4">
                <Collapsible open={ isOpen } onOpenChange={ setIsOpen } className="w-full space-y-2">
                    <div className="flex items-center justify-between px-4">
                        <h3 className="text-lg font-bold">
                            F.A.Q
                        </h3>
                        <CollapsibleTrigger asChild>
                            <icons.ArrowDown width="32" height="32" />
                        </CollapsibleTrigger>
                    </div>
                    <p className="text-muted-foreground px-4">
                        Have a question? Check out our frequently asked questions.
                    </p>
                    <CollapsibleContent className="flex justify-between items-start flex-wrap">
                        { faqs.map((faq: {
                            question: string;
                            answer: string;
                        }, index: number): React.JSX.Element => (
                            <details key={ index } className="rounded-md border px-4 py-2 w-[48%] mt-2 text-sm shadow-sm">
                                <summary className="font-medium">{ faq.question }</summary>
                                <p className="text-muted-foreground">{ faq.answer }</p>
                            </details>
                        )) }
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

export default FAQ;
