import { useEffect, useRef, useState, useCallback, memo } from 'react';
import styles from './SkillProgressBar.module.scss';

interface SkillProgressBarProps {
  title: string;
  percentage: number;
  subtitle?: string;
  description?: string;
  delay?: number;
}

export const SkillProgressBar = memo(function SkillProgressBar({ 
  title, 
  percentage, 
  subtitle, 
  description, 
  delay = 0 
}: SkillProgressBarProps) {
  const [animate, setAnimate] = useState(false);
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const countInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Memoize the count animation function
  const startCountAnimation = useCallback(() => {
    // Clear any existing interval
    if (countInterval.current) {
      clearInterval(countInterval.current);
    }
    
    // Reset display percentage
    setDisplayPercentage(0);
    
    // Calculate increment and interval duration
    const duration = 1200; // match the transition duration in milliseconds
    const steps = 20; // number of steps to animate
    const increment = Math.ceil(percentage / steps);
    const intervalTime = duration / steps;
    
    countInterval.current = setInterval(() => {
      setDisplayPercentage((prev) => {
        const next = prev + increment;
        if (next >= percentage) {
          if (countInterval.current) {
            clearInterval(countInterval.current);
          }
          return percentage;
        }
        return next;
      });
    }, intervalTime);
  }, [percentage]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setAnimate(true);
          startCountAnimation();
        }, delay);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.3 });

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      observer.disconnect();
      if (countInterval.current) {
        clearInterval(countInterval.current);
        countInterval.current = null;
      }
    };
  }, [delay, startCountAnimation]);

  return (
    <div 
      className={styles.skillProgressBar} 
      ref={progressBarRef}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
        <span className={styles.percentage}>{displayPercentage}%</span>
      </div>
      <div className={styles.progressContainer}>
        <div 
          className={`${styles.progressBar} ${animate ? styles.animate : ''}`} 
          style={{ width: animate ? `${percentage}%` : '0%' }}
        ></div>
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p>{description}</p>}
    </div>
  );
}); 