import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <NavBar />

      <div className={styles.container}>
        <section className={`${styles.hero} ${styles.heroBg}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to the Egyptian Grand Museum</h1>
            <p className={styles.heroSubtitle}>Discover 5,000 years of ancient wonders</p>
            <button className={styles.ctaButton}>Explore Exhibits</button>
          </div>
        </section>

        <section className={styles.collectionsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Featured Collections</h2>
            <div className={styles.cardsGrid}>
              <div className={styles.card}>
                <img
                  src="/images/photo-1566214358736-df5a0048a9db.jpg"
                  alt="Tutankhamun"
                  className={styles.cardImg}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Tutankhamun Collection</h3>
                  <p className={styles.cardText}>
                    The complete tomb treasures of the boy king
                  </p>
                </div>
              </div>

              <div className={styles.card}>
                <img
                  src="/images/photo-1728739831383-d8a2cdc283cb.jpg"
                  alt="Ancient Statues"
                  className={styles.cardImg}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Ancient Statues</h3>
                  <p className={styles.cardText}>
                    Monumental statues and sculptures from various dynasties
                  </p>
                </div>
              </div>

              <div className={styles.card}>
                <img
                  src="/images/photo-1757240758722-52aa9986f5da.jpg"
                  alt="Sphinx"
                  className={styles.cardImg}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Sphinx Exhibits</h3>
                  <p className={styles.cardText}>
                    Mystical guardians of the pyramids
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.monumentSection}>
          <div className={styles.container}>
            <div className={styles.monumentGrid}>
              <div className={styles.textSide}>
                <h2 className={styles.sectionTitle}>A Monument to History</h2>
                <p className={styles.text}>
                  The Egyptian Grand Museum stands as one of the world's most ambitious
                  cultural projects, located just steps from the Pyramids of Giza.
                  This architectural marvel combines modern innovation with ancient
                  inspiration, creating a space that honors Egypt's timeless legacy.
                </p>
                <p className={styles.text}>
                  With over 100,000 artifacts spanning 5,000 years, the museum offers
                  an unparalleled journey through the Nile Valley's greatest achievements.
                </p>
                <Link to="/about" className={styles.ctaButton}>
                  Discover Our Story
                </Link>
              </div>
              <div className={styles.imageSide}>
                <img
                  src="/images/photo-1757240758722-52aa9986f5da.jpg"
                  alt="Sphinx"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <noscript>
        <main
          style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '24px', padding: '8px', color: 'black' }}>
            This site requires JavaScript
          </h1>
          <p style={{ fontSize: '16px', padding: '8px', color: '#00000080' }}>
            To view this website, enable JavaScript in your browser settings and reload the page.
          </p>
          <form style={{ marginTop: '12px' }}>
            <button
              type="submit"
              style={{
                fontSize: '14px',
                color: 'black',
                border: '1px solid #0000001a',
                borderRadius: '5px',
                width: '256px',
                height: '32px',
              }}
            >
              Reload page
            </button>
          </form>
        </main>
      </noscript>
    </div>
  );
};

export default Home;
