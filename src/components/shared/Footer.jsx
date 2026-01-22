import React from 'react';
import styles from './Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h4 className={styles.footerTitle}>Egyptian Grand Museum</h4>
            <p>Preserving and celebrating Egypt's magnificent heritage for future generations.</p>
          </div>
          <div>
            <h4 className={styles.footerTitle}>Visit Us</h4>
            <p>Near the Pyramids of Giza<br />Cairo, Egypt<br />Daily: 9:00 AM - 7:00 PM</p>
          </div>
          <div>
            <h4 className={styles.footerTitle}>Connect</h4>
            <p>Email: info@egyptianmuseum.eg<br />Phone: +20 2 1234 5678<br />Follow us on social media</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2024 Egyptian Grand Museum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;