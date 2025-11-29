import { useCallback } from 'react';
import { trackClick } from '../utils/umami';

export const useTracking = () => {
  const trackCtaClick = useCallback((elementName: string, elementType: string = 'button') => {
    trackClick(elementName, elementType);
  }, []);

  return {
    trackCtaClick
  };
}; 