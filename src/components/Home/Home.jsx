import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const highlights = [
    {
      title: "Tutankhamun Collection",
      description: "Over 5,000 artifacts from the tomb of the legendary pharaoh",
      image: "https://images.unsplash.com/photo-1566214358736-df5a0048a9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRhbmtoYW11biUyMG1hc2slMjBnb2xkfGVufDF8fHx8MTc1OTc1NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Ancient Statues",
      description: "Monumental statues and sculptures from various dynasties",
      image: "https://images.unsplash.com/photo-1728739831383-d8a2cdc283cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHRpYW4lMjBzdGF0dWV8ZW58MXx8fHwxNzU5NzU2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Royal Artifacts",
      description: "Treasures and daily items from ancient Egyptian royalty",
      image: "https://images.unsplash.com/photo-1695902263765-9636769b5833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBhcnRpZmFjdHN8ZW58MXx8fHwxNzU5NzU2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const handleBooking = () => {
    window.open("https://visit-gem.com/en/AdmissionTkt", "_blank");
  };

  return (
    <div className={styles.homePage}>
      <NavBar />
      
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <img
              src="https://images.unsplash.com/photo-1637356216542-0d0a4e93f992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMG11c2V1bSUyMHB5cmFtaWRzfGVufDF8fHx8MTc1OTc1NjE2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Egyptian Museum"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
          
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Egyptian Grand Museum</h1>
            <p className={styles.heroSubtitle}>
              Discover the wonders of ancient Egypt in the world's largest archaeological museum
            </p>
            <div className={styles.heroButtonGroup}>
              <button className={`${styles.button} ${styles.btnHero}`} onClick={handleBooking}>
                <Ticket className={styles.btnIcon} size={20} />
                Book a Ticket
              </button>
              <button 
                className={`${styles.button} ${styles.btnExplore}`}
                onClick={() => navigate("/status")}
              >
                Explore Collections
              </button>
              <button 
                className={`${styles.button} ${styles.btnLearn}`}
                onClick={() => navigate("/about")}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Visit Information */}
        <section className={styles.visitInfoSection}>
          <div className={styles.container}>
            <div className={styles.visitGrid}>
              <div className={styles.infoItem}>
                <div className={styles.iconCircle}>
                  <Clock className={styles.iconGreen} size={24} />
                </div>
                <div className={styles.infoTextContainer}>
                  <h3 className={styles.infoHeading}>Opening Hours</h3>
                  <p className={styles.infoText}>
                    Daily: 9:00 AM - 7:00 PM<br />
                    Friday: 9:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconCircle}>
                  <MapPin className={styles.iconGreen} size={24} />
                </div>
                <div className={styles.infoTextContainer}>
                  <h3 className={styles.infoHeading}>Location</h3>
                  <p className={styles.infoText}>
                    Near the Pyramids of Giza<br />
                    Cairo, Egypt
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconCircle}>
                  <Calendar className={styles.iconGreen} size={24} />
                </div>
                <div className={styles.infoTextContainer}>
                  <h3 className={styles.infoHeading}>Book Your Visit</h3>
                  <p className={styles.infoText}>
                    Online booking available<br />
                    Reserve your tickets today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artifact Banner */}
        <section className={styles.featuredBanner}>
          <div className={styles.container}>
            <div className={styles.featuredFlex}>
              <div className={styles.featuredTextContent}>
                <span className={styles.featuredBadge}>Featured</span>
                <h3 className={styles.featuredTitle}>The Colossus of Ramesses II</h3>
                <p className={styles.featuredSubtitle}>
                  Experience our iconic 11-meter statue in immersive 3D
                </p>
              </div>
              <button 
                className={`${styles.button} ${styles.btnFeatured}`}
                onClick={() => navigate("/ramses")}
              >
                Explore Now
              </button>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className={styles.highlightsSection}>
          <div className={styles.container}>
            <div className={styles.highlightsHeader}>
              <h2 className={styles.sectionTitle}>Museum Highlights</h2>
              <p className={styles.sectionSubtitle}>
                Experience the most extraordinary collection of ancient Egyptian artifacts ever assembled
              </p>
            </div>

            <div className={styles.cardsGrid}>
              {highlights.map((highlight, index) => (
                <div key={index} className={styles.card} onClick={() => navigate("/status")}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{highlight.title}</h3>
                    <p className={styles.cardDescription}>{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Viewer CTA */}
        <section className={styles.interactiveCTA}>
          <div className={styles.interactiveContainer}>
            <h2 className={styles.interactiveTitle}>Interactive 3D Experience</h2>
            <p className={styles.interactiveSubtitle}>
              Explore our statues in stunning 3D, switch between artifacts seamlessly, and chat with AI to discover fascinating details about ancient Egypt
            </p>
            <div className={styles.interactiveButtons}>
              <button 
                className={`${styles.button} ${styles.btnPrimaryLg}`}
                onClick={() => navigate("/viewer")}
              >
                Launch Interactive Viewer
              </button>
              <button 
                className={`${styles.button} ${styles.btnOutlineLg}`}
                onClick={() => navigate("/status")}
              >
                Browse Collection
              </button>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className={styles.aboutPreview}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutTextContent}>
                <h2 className={styles.aboutTitle}>A Monument to History</h2>
                <p className={styles.aboutText}>
                  The Egyptian Grand Museum stands as one of the world's most ambitious cultural projects, 
                  housing over 100,000 artifacts spanning 5,000 years of Egyptian civilization.
                </p>
                <p className={styles.aboutText}>
                  Located near the Great Pyramids of Giza, this architectural marvel brings together 
                  treasures from across Egypt, including the complete Tutankhamun collection displayed 
                  together for the first time.
                </p>
                <button 
                  className={`${styles.button} ${styles.btnGold}`}
                  onClick={() => navigate("/about")}
                >
                  Discover Our Story
                </button>
              </div>
              <div className={styles.aboutImageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1757240758722-52aa9986f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGhpbnglMjBlZ3lwdHxlbnwxfHx8fDE3NTk3NTYxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sphinx"
                  className={styles.aboutImage}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
