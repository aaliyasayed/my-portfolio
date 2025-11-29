import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  fullPage?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ fullPage = true }) => {
  return (
    <div className={`${styles.loader} ${fullPage ? styles.fullPage : ''}`}>
      <div className={styles.spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
    </div>
  );
}; 