import React, { FC } from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => (
  <div className={styles.NavBar}>
    NavBar Component
  </div>
);

export default NavBar;
