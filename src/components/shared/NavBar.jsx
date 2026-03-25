import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'; 

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
          <Link to="/" className={styles.logoButton}>
            <div className={styles.logoIconBox}>
              <span className={styles.logoIconText}>𓂀</span>
            </div>
            <span className={styles.logoText}>Egyptian Grand Museum</span>
          </Link>
        <ul className={styles.navLinks}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} end>Home</NavLink></li>
          <li><NavLink to="/ramses" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Ramses II</NavLink></li>
          <li><NavLink to="/status" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Statues</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>About</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;