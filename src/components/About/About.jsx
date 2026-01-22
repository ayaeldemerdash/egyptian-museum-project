import React from 'react';
import styles from './About.module.css';
import Footer from '../shared/Footer';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About the Museum</h1>
          <p>Preserving and celebrating Egypt's magnificent heritage</p>
        </div>
      </section>

      <div className={styles.second}>
        <h2>Our Mission</h2>
        <p>
          The Egyptian Grand Museum is dedicated to preserving, studying, and presenting the extraordinary legacy of
          ancient Egyptian civilization for current and future generations.
        </p>
        <p>
          As the world's largest archaeological museum, we combine cutting-edge conservation technology with world-class
          exhibitions to create an unparalleled cultural experience.
        </p>
      </div>

      <div className={styles.missionCardsContainer}>
        <div className={styles.card}>
          <div className={styles.circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 12h4"></path>
              <path d="M10 8h4"></path>
              <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
              <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
              <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
            </svg>
          </div>
          100,000+
          <h4>Artifacts</h4>
          <p>Spanning 5,000 years of history</p>
        </div>

        <div className={styles.card}>
          <div className={styles.circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
          </div>
          5 Million
          <h4>Annual Visitors</h4>
          <p>Expected from around the world</p>
        </div>

        <div className={styles.card}>
          <div className={styles.circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          500,000 m²
          <h4>Total Area</h4>
          <p>World's largest archaeological museum</p>
        </div>

        <div className={styles.card}>
          <div className={styles.circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              <circle cx="12" cy="8" r="6"></circle>
            </svg>
          </div>
          2024
          <h4>Grand Opening</h4>
          <p>A new era for Egyptian heritage</p>
        </div>
      </div>

      <section className={styles.ancient}>
        <div className={styles.text}>
          <h2>A Window to Ancient Egypt</h2>
          <p>
            Located just two kilometers from the Pyramids of Giza, the Egyptian Grand Museum creates a unique dialogue
            between ancient monuments and modern museum innovation.
          </p>
          <p>
            The museum's architectural design incorporates a translucent stone facade that allows natural light to
            illuminate the galleries, creating an ethereal atmosphere that honors the sun-worshipping culture of ancient
            Egypt.
          </p>
          <p>
            Our state-of-the-art conservation laboratories work continuously to preserve and restore artifacts, ensuring
            that these treasures remain accessible for millennia to come.
          </p>
        </div>
        <div className={styles.image}>
          <img src="/images/photo-1738935457671-76b950b9262e.jpg" alt="Ancient Egypt" />
        </div>
      </section>

      <div className={styles.journey}>
        <div className={styles.header}>
          <h2>Our Journey</h2>
          <p>
            From concept to reality, the creation of the Egyptian Grand Museum represents decades of dedication and
            international collaboration.
          </p>
        </div>

        <div className={styles.rows}>
          <div className={styles.row}>
            <div className={styles.left}>
              <div className={styles.circle}>2002</div>
            </div>
            <div className={styles.right}>
              <h3>Project Announced</h3>
              <p>Egypt announces plans to build the world's largest archaeological museum near the Pyramids of Giza.</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.left}>
              <div className={styles.circle}>2012</div>
            </div>
            <div className={styles.right}>
              <h3>Construction Begins</h3>
              <p>Groundbreaking ceremony marks the official start of construction on the massive complex.</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.left}>
              <div className={styles.circle}>2018</div>
            </div>
            <div className={styles.right}>
              <h3>Conservation Center Opens</h3>
              <p>State-of-the-art conservation laboratories begin restoration work on priceless artifacts.</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.left}>
              <div className={styles.circle}>2021</div>
            </div>
            <div className={styles.right}>
              <h3>Golden Parade</h3>
              <p>22 royal mummies transported in a spectacular procession through Cairo to the museum.</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.left}>
              <div className={styles.circle}>2024</div>
            </div>
            <div className={styles.right}>
              <h3>Grand Opening</h3>
              <p>The museum opens its doors, showcasing the complete Tutankhamun collection for the first time.</p>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.collections}>
        <h2>Unparalleled Collections</h2>
        <p className={styles.subtitle}>
          The museum houses the most comprehensive collection of ancient Egyptian artifacts,
          including treasures never before displayed together.
        </p>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>Tutankhamun Collection</h3>
            <p>
              All 5,398 objects from the tomb of Tutankhamun displayed together for the first time in history,
              including previously unseen artifacts.
            </p>
            <img src="/images/photo-1566214358736-df5a0048a9db.jpg" alt="Tutankhamun Collection" />
          </div>

          <div className={styles.card}>
            <h3>Royal Mummies</h3>
            <p>
              The mummies of Egypt’s greatest pharaohs, preserved in climate-controlled galleries
              with the latest conservation technology.
            </p>
            <img src="/images/photo-1728739831383-d8a2cdc283cb.jpg" alt="Royal Mummies" />
          </div>

          <div className={styles.card}>
            <h3>Solar Boat</h3>
            <p>
              The reconstructed Solar Boat of Khufu, a 4,500-year-old vessel that once accompanied
              the pharaoh to the afterlife.
            </p>
            <img src="/images/photo-1695902263765-9636769b5833.jpg" alt="Solar Boat" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
