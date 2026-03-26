import React from 'react';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';

const Ramses = () => {
  return (
    <>
      <NavBar />

      <main style={{ padding: '120px 20px', minHeight: '60vh' }}>
        
    <div className={styles.mainBackground}>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Left Section */}
          <section className={styles.leftSection}>
            <div className={styles.featuredBadge}>Featured Artifact</div>

            <h2 className={styles.artifactTitle}>RAMESSES II</h2>
            <h3 className={styles.artifactSubtitle}>The Great Pharaoh</h3>

            <p className={styles.artifactDescription}>
              Standing at 11 meters tall, this magnificent red granite colossus
              welcomes visitors to the Egyptian Grand Museum. Ramesses II, one
              of Egypt&apos;s most powerful rulers, reigned for 66 years during
              the 19th Dynasty.
            </p>

            <div className={styles.infoBox}>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Dynasty</span>
                  <span className={styles.infoValue}>19th Dynasty</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Period</span>
                  <span className={styles.infoValue}>1279-1213 BC</span>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Material</span>
                  <span className={styles.infoValue}>Red Granite</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Height</span>
                  <span className={styles.infoValue}>11 meters</span>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
                Interactive Experience
                <span className={styles.arrow}>→</span>
              </button>

              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`}>
                Explore More Statues
              </button>
            </div>

            <div className={styles.infoLinks}>
              <a href="#about" className={styles.infoLink}>
                <span className={styles.icon}>ⓘ</span>
                About the Museum
              </a>

              <a href="#visit" className={styles.infoLink}>
                <span className={styles.icon}>🗺</span>
                Visit Information
              </a>
            </div>

            <button type="button" className={`${styles.btn} ${styles.btnTicket}`}>
              <span className={styles.ticketIcon}>
                <img src={ticketIcon} alt="ticket" />
              </span>
              Book a Ticket
            </button>
          </section>

          {/* Right Section */}
          <section className={styles.rightSection}>
            <div className={styles.statueImage}>
              <img src={ramsesImage} alt="Ramesses II Statue" />
            </div>
          </section>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.locationInfo}>
            <span className={styles.locationIcon}>📍</span>
            <div className={styles.locationText}>
              <span className={styles.locationLabel}>Location</span>
              <span className={styles.locationName}>
                Main Entrance Hall, Egyptian Grand Museum
              </span>
            </div>
          </div>

          <button type="button" className={`${styles.btn} ${styles.btnExplore}`}>
            Explore Interactive View
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </main>
    </div>
  ;

      </main>

      <Footer />
    </>
  );
};

export default Ramses;
