import React, { FC } from 'react';
import styles from './IndexView.module.css';
import Layout from '../Layout/Layout';
import { ScrollArea } from '../ui/scroll-area';

interface IndexViewProps {
    children: React.ReactNode;
}

const IndexView: FC<IndexViewProps> = ({ children }) => (
    <Layout>
        <div className="pb-12 pt-36 px-4 sm:container items-center">
            <ScrollArea className="h-screen w-full border rounded-lg bg-background">
                {children}
            </ScrollArea>
        </div>
    </Layout>
);

export default IndexView;
