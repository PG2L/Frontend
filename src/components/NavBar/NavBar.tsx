import React, { FC } from 'react';
import styles from './NavBar.module.css';

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => (
    <div className={styles.NavBar} id="navBar" data-testid="navBar">
        NavBar Component
    </div >
);

export default NavBar;
