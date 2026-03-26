import React from 'react';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import styles from './Ramses.module.css';

const Ramses = () => {
  return (
    <>
      <NavBar />

      <div className={styles["main-background"]}>
        <div className={styles["main-content"]}>
          <div className={styles["content-wrapper"]}>

            {/* Left Section */}
            <div className={styles["left-section"]}>
              <div className={styles["featured-badge"]}>
                Featured Artifact
              </div>

              <h1 className={styles["artifact-title"]}>RAMSES II</h1>

              <h2 className={styles["artifact-subtitle"]}>
                The Great Pharaoh
              </h2>

              <p className={styles["artifact-description"]}>
                Discover the grandeur of one of ancient Egypt’s most iconic rulers.
                Explore the legacy, architecture, and timeless history behind the
                legendary Ramesses II.
              </p>

              <div className={styles["info-box"]}>
                <div className={styles["info-row"]}>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Period</span>
                    <span className={styles["info-value"]}>New Kingdom</span>
                  </div>

                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Dynasty</span>
                    <span className={styles["info-value"]}>19th Dynasty</span>
                  </div>
                </div>

                <div className={styles["info-row"]}>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Reign</span>
                    <span className={styles["info-value"]}>1279–1213 BC</span>
                  </div>

                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Known For</span>
                    <span className={styles["info-value"]}>Monuments & Temples</span>
                  </div>
                </div>
              </div>

              <div className={styles["action-buttons"]}>
                <button className={`${styles.btn} ${styles["btn-primary"]}`}>
                  Learn More
                  <span className={styles.arrow}>→</span>
                </button>

                <button className={`${styles.btn} ${styles["btn-secondary"]}`}>
                  Watch Story
                </button>
              </div>

              <div className={styles["info-links"]}>
                <a href="#" className={styles["info-link"]}>
                  <span className={styles.icon}>★</span>
                  Historical Facts
                </a>

                <a href="#" className={styles["info-link"]}>
                  <span className={styles.icon}>⏳</span>
                  Timeline
                </a>
              </div>

              <button className={styles["btn-ticket"]}>
                <span className={styles["ticket-icon"]}>
                  <img src="/images/ticket.png" alt="ticket" />
                </span>
                Book Ticket
              </button>
            </div>

            {/* Right Section */}
            <div className={styles["right-section"]}>
              <div className={styles["statue-image"]}>
                <img src="/public/images/photo-1728739831383-d8a2cdc283cb.jpg" alt="Ramesses II Statue" />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={styles["bottom-section"]}>
            <div className={styles["location-info"]}>
              <span className={styles["location-icon"]}>📍</span>

              <div className={styles["location-text"]}>
                <span className={styles["location-label"]}>Location</span>
                <span className={styles["location-name"]}>
                  Grand Egyptian Museum
                </span>
              </div>
            </div>

            <button className={`${styles.btn} ${styles["btn-explore"]}`}>
              Explore Museum
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Ramses;