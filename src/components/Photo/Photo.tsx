import React from 'react';
import styles from './Photo.module.scss';

interface PhotoProps {
  className?: string;
  customImage: string;
}

const Photo: React.FC<PhotoProps> = ({ 
  customImage,
}) => {
  return (
    <div className={styles.container}>
      {customImage && (
        <img 
          src={customImage} 
          alt="Profile" 
          className={`${styles.image} ${styles.customImage}`} 
        />
      )}
    </div>
  );
};

export default Photo; 