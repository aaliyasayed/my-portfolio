import { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useData } from '../../context/DataContext';
import { Background } from '../../components/Background';
import { Background as BackgroundType } from '../../context/types';
import { useTracking } from '../../hooks/useTracking';

import styles from './Hero.module.scss';

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
  }, [hero.titles.length, hero.flipAnimationDuration, hero.titleChangeInterval, loading]);

  const handleScrollDown = () => {
    trackCtaClick('hero-scroll-down', 'button');
    navigateTo('about');
  };

  if (loading) return null;

  // Create background object from backgroundImage if background is not provided
  const backgroundConfig: BackgroundType | undefined = hero.background || 
    (hero.backgroundImage ? { image: hero.backgroundImage, isParallax: false } : undefined);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <div className={styles.verticalLine}></div>
        
        <div className={styles.greeting}>
          {hero.greeting}
        </div>
        
        <h1>{hero.heading}</h1>
        
        <div className={styles.title}>
          <div
            className={styles.titleText} 
            style={{ 
              animation: isFlipping 
                ? `${styles.flipOut} 0.5s forwards` 
                : `${styles.flipIn} 0.5s forwards` 
            }}
          >
            {hero.titles[activeIndex]}
          </div>
        </div>
      </div>
      
      <div className={styles.scrollDown}>
        <div className={styles.scrollCircle}>
          <span className={styles.textCircle}>
            <svg viewBox="0 0 100 100" width="150" height="150" className={styles.circleText}>
              <defs>
                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
              </defs>
              <text>
                <textPath xlinkHref="#circle">
                  {hero.scrollText}
                </textPath>
              </text>
            </svg>
          </span>
          <div className={styles.innerCircle}>
            <div className={styles.arrowDown} onClick={handleScrollDown}>
              <img src="/icons/arrow-down.svg" alt="Scroll down" width="24" height="24" />
            </div>
          </div>
        </div>
      </div>
      
      {backgroundConfig && <Background background={backgroundConfig} />}
      <div className={styles.backgroundDots}></div>
    </section>
  );
}; 