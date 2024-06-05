import React, { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

/**
 * Represents the layout component that wraps the entire application.
 */
interface LayoutProps {
    children: ReactNode;
}

/**
 * The layout component that wraps the entire application.
 * @param children - The child components to be rendered within the layout.
 * @returns The rendered layout component.
 */
const Layout: FC<LayoutProps> = ({ children }) => (
    <div className={styles.Layout} id="layout" data-testid="layout">
        <Header />
        <main className={styles.MainContent}>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;