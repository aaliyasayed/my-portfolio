import { ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Timeline.module.scss';

export type TimelineVariant = 'clean' | 'card';

interface TimelineProps {
  children: ReactNode;
  className?: string;
  variant?: TimelineVariant;
}

export function Timeline({ children, className = '', variant = 'clean' }: TimelineProps) {
  return (
    <div className={classNames(styles.timelineContainer, className, {
      [styles.cleanVariant]: variant === 'clean',
      [styles.cardVariant]: variant === 'card'
    })}>
      {children}
    </div>
  );
}

interface TimelineColumnProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function TimelineColumn({ children, className = '', title }: TimelineColumnProps) {
  return (
    <div className={classNames(styles.timelineColumn, className)}>
      {title && <h3 className={styles.timelineHeading}>{title}</h3>}
      <div className={styles.timelineItems}>
        {children}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TimelineItem({ children, className = '', delay = 0 }: TimelineItemProps) {
  const [animate, setAnimate] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setAnimate(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div 
      className={classNames(
        styles.timelineItem, 
        className, 
        { [styles.animate]: animate }
      )} 
      ref={itemRef}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.timelineDot}></div>
      <div className={styles.timelineContent}>
        {children}
      </div>
    </div>
  );
} 