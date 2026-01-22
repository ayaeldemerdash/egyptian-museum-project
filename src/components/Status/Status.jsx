import React from 'react';
import styles from './Status.module.css';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';

const Status = () => {
  return (
    <>
      <NavBar />

      <div className={styles.status}>
        <h1 className={styles.title}>Ancient Statues Collection</h1>
        <p className={styles.subtitle}>Explore our magnificent collection...</p>
        <p className={styles.statsLine}>Showing 6 statues from our collection</p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1728739831383-d8a2cdc283cb"
              alt="Statue of Ramesses II"
              className={styles.cardImg}
            />
            <div className={styles.cardBody}>
              <div className={styles.cardTags}>
                <span>Colossal</span>
                <span>Royal</span>
                <span>New Kingdom</span>
              </div>

              <div className={styles.cardTitle}>Statue of Ramesses II</div>

              <div className={styles.infoRow}>
                <span>Dynasty:</span>
                <span>19th Dynasty</span>
              </div>

              <div className={styles.cardDescription}>
                A colossal statue representing Ramesses II.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Status;
