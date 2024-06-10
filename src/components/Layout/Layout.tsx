import React, { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FAQ from '../FAQ/FAQ';
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
    <div className="layout flex flex-col" id="layout" data-testid="layout">
        <Header />
        <main className="MainContent bg-[#FBF9F9]">
            {children}
        </main>
        <FAQ />
        <Footer />
    </div>
);

export default Layout;