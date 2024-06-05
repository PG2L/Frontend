import React, { FC } from 'react';
import styles from './Header.module.css';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
    <header className={styles.Header} id="header" data-testid="header">
        <div className="header-left-side">
            <h1>Header</h1>
            <div className="header-left-side__menu">
                <a href="#header" className="menu__link">Home</a>
                <a href="#about" className="menu__link">About</a>
                <a href="#contact" className="menu__link">Contact</a>
            </div>
        </div>
        <div className="header-right-side">
            <input type="text" placeholder="Search..." className="search" />
            <button className="search-button">Search</button>
            <div className="header-right-side__account">
                <button className="account__button">Sign in</button>
                <button className="account__button">Log in</button>
                <div className="account-dropdown">
                    <a href="#account" className="dropdown__link">My account</a>
                    <a href="#logout" className="dropdown__link">Logout</a>
                </div>
            </div>
        </div>
    </header>
);

export default Header;