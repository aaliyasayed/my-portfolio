import { useState, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { useData } from "../../context/DataContext";
import { Background } from "../../components/Background";
import { Background as BackgroundType } from "../../context/types";
import { useTracking } from "../../hooks/useTracking";

import styles from "./Hero.module.scss";

export const Hero = () => {
  const { navigateTo } = useNavigation();
  const { hero, loading } = useData();
  const { trackCtaClick } = useTracking();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (loading || !hero.titles.length) return;

    const interval = setInterval(() => {
      setIsFlipping(true);

      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % hero.titles.length);
        setIsFlipping(false);
      }, hero.flipAnimationDuration);
    }, hero.titleChangeInterval);

    return () => clearInterval(interval);
  }, [
    hero.titles.length,
    hero.flipAnimationDuration,
    hero.titleChangeInterval,
    loading,
  ]);

  const handleScrollDown = () => {
    trackCtaClick("hero-scroll-down", "button");
    navigateTo("about");
  };

  if (loading) return null;

  // Create background object from backgroundImage if background is not provided
  const backgroundConfig: BackgroundType | undefined =
    hero.background ||
    (hero.backgroundImage
      ? { image: hero.backgroundImage, isParallax: false }
      : undefined);

  return (
    <section className={styles.hero} id="home">
      {/* Modern Background Elements */}
      <div className={styles.gradientOrb1}></div>
      <div className={styles.gradientOrb2}></div>
      <div className={styles.gridPattern}></div>

      {backgroundConfig && <Background background={backgroundConfig} />}

      <div className={styles.content}>
        <div className={styles.greeting}>
          <span className={styles.greetingText}>{hero.greeting}</span>
          <div className={styles.greetingLine}></div>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingGradient}>{hero.heading}</span>
        </h1>

        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div
              className={styles.titleText}
              style={{
                animation: isFlipping
                  ? `${styles.flipOut} 0.5s forwards`
                  : `${styles.flipIn} 0.5s forwards`,
              }}
            >
              {hero.titles[activeIndex]}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={handleScrollDown}
        aria-label="Scroll to about section"
      >
        <div className={styles.scrollText}>
          <span>Scroll</span>
        </div>
        <div className={styles.scrollLine}></div>
        <div className={styles.scrollArrow}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};
