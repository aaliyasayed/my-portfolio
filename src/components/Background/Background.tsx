import styles from './Background.module.scss';
import { Background as BackgroundProps } from '../../context/types';
import { useEffect, useRef, useState } from 'react';

interface Props {
  background: BackgroundProps;
}

const parallaxMultiplier = 100;

export const Background = ({ 
  background, 
}: Props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!background.isParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;

      // Calculate mouse position as percentage of screen size
      // Use smaller values to reduce the movement amount
      const xPos = (e.clientX / window.innerWidth - 0.5) * parallaxMultiplier; 
      const yPos = (e.clientY / window.innerHeight - 0.5) * parallaxMultiplier;
      
      setMousePosition({ x: xPos, y: yPos });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [background.isParallax]);
  
  // Base style applied to all backgrounds
  let inlineStyles: React.CSSProperties = {
    backgroundImage: `url(${background.image})`,
    width: `calc(100% + ${parallaxMultiplier}px)`,
    height: `calc(100% + ${parallaxMultiplier}px)`,
    left: `-${parallaxMultiplier / 2}px`,
    top: `-${parallaxMultiplier / 2}px`,
  };
  
  if (background.isAnimated) {
    inlineStyles = {
      ...inlineStyles,
      transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    }
  }

  if (background.isParallax) {
    inlineStyles = {
      ...inlineStyles,
      backgroundAttachment: 'fixed',
    }
  }
  
  return (
    <div className={styles.backgroundContainer}>
      <div 
        ref={backgroundRef}
        className={styles.background}
        style={inlineStyles} 
      />
    </div>
  );
};