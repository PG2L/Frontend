import React, { FC } from 'react';
import styles from './IndexView.module.css';
import Layout from '../Layout/Layout';
import { ScrollArea } from '../ui/scroll-area';

interface IndexViewProps {
    children: React.ReactNode;
}

const IndexView: FC<IndexViewProps> = ({ children }) => (
    <Layout>
        <div className="pb-12 pt-24 px-4 sm:container items-center">
            <ScrollArea className="max-h w-full border-2 rounded-lg bg-background">
                {children}
            </ScrollArea>
        </div>
    </Layout>
);

export default IndexView;
