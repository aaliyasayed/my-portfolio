import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Section.module.scss';
import { Background as BackgroundType } from '../../context/types';
import { Background } from '../Background';

interface SectionProps {
  className?: string;
  id?: string;
  highlighted?: boolean;
  title?: string;
  subtitle?: string;
  titleAlign?: 'left' | 'center' | 'right';
  background?: BackgroundType;
  children: ReactNode;
}

export const Section = ({ 
  className, 
  id, 
  highlighted = false, 
  title,
  subtitle,
  titleAlign = 'center',
  background,
  children 
}: SectionProps) => {
  return (
    <section 
      id={id} 
      className={classNames(
        styles.section,
        { [styles.sectionHighlighted]: highlighted },
        className
      )}
    >
      {background && (
        <Background background={background} />
      )}
      <div className={styles.sectionInner}>
        {(title || subtitle) && (
          <div className={classNames(
            styles.sectionTitle,
            styles[`sectionTitle${titleAlign.charAt(0).toUpperCase() + titleAlign.slice(1)}`]
          )}>
            <div className={styles.sectionTitleContainer}>
              {title && <h2 className={classNames(
                styles.sectionHeading,
                { [styles.sectionHeadingHighlighted]: highlighted }
              )}>{title}</h2>}
              {subtitle && <h3 className={styles.sectionSubheading}>{subtitle}</h3>}
            </div>
            <div className={styles.sectionDivider}></div>
          </div>
        )}
        <div className={styles.sectionContent}>
          {children}
        </div>
      </div>
    </section>
  );
};
