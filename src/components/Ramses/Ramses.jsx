import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Calendar } from 'lucide-react';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import styles from './Ramses.module.css';

const Ramses = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    window.open("https://visit-gem.com/en/AdmissionTkt", "_blank");
  };

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
                Standing at 11 meters tall, this magnificent red granite colossus welcomes
                visitors to the Egyptian Grand Museum. Ramesses II, one of Egypt&apos;s most
                powerful rulers, reigned for 66 years during the 19th Dynasty.
              </p>

              <div className={styles["info-box"]}>
                <div className={styles["info-row"]}>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Dynasty</span>
                    <span className={styles["info-value"]}>19th Dynasty</span>
                  </div>

                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Period</span>
                    <span className={styles["info-value"]}>1279-1213 BC</span>
                  </div>
                </div>

                <div className={styles["info-row"]}>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Material</span>
                    <span className={styles["info-value"]}>Red Granite</span>
                  </div>

                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Height</span>
                    <span className={styles["info-value"]}>11 meters</span>
                  </div>
                </div>
              </div>

              <div className={styles["action-buttons"]}>
                <button
                  className={`${styles.btn} ${styles["btn-primary"]}`}
                  onClick={() => navigate("/status")}
                >
                  Interactive Experience
                  <span className={styles.arrow}>→</span>
                </button>

                <button
                  className={`${styles.btn} ${styles["btn-secondary"]}`}
                  onClick={() => navigate("/status")}
                >
                  Explore More Statues
                </button>
              </div>

              <div className={styles["info-links"]}>
                <a
                  href="#"
                  className={styles["info-link"]}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                  }}
                >
                  <span className={styles.icon}>ⓘ</span>
                  About the Museum
                </a>

                <a
                  href="#"
                  className={styles["info-link"]}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  <span className={styles.icon}>🗺</span>
                  Visit Information
                </a>
              </div>

              <button className={styles["btn-ticket"]} onClick={handleBooking}>
                <span className={styles["ticket-icon"]}>
                  <Ticket size={18} />
                </span>
                Book Ticket
              </button>
            </div>

            {/* Right Section */}
            <div className={styles["right-section"]}>
              <div className={styles["statue-image"]}>
                <img
                  src="/images/photo-1728739831383-d8a2cdc283cb.jpg"
                  alt="Ramesses II Statue"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={styles["bottom-section"]}>
           <div className={styles["location-info"]}>
            <span className={styles["location-icon"]}>
              <Calendar size={20} />
            </span>
            <div className={styles["location-text"]}>
              <span className={styles["location-label"]}>Location</span>
              <span className={styles["location-name"]}>
                Main Entrance Hall, Egyptian Grand Museum
              </span>
            </div>
          </div>

            <button
              className={`${styles.btn} ${styles["btn-explore"]}`}
              onClick={() => navigate("/status")}
            >
              Explore Interactive View
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Ramses;