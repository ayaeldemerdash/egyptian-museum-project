import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; 

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>EGM</h1>
        <ul className={styles.navLinks}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
           <li><Link to="/ramses" className={styles.link}>Ramses II </Link></li>
          <li><Link to="/status" className={styles.link}> Statues </Link></li>
          <li><Link to="/about" className={styles.link}>About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;