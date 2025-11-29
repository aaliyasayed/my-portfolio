// Umami tracking utility functions

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

export const trackEvent = (eventName: string, eventData?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

export const trackClick = (elementName: string, elementType: string = 'button') => {
  trackEvent('click', {
    element: elementName,
    type: elementType,
    timestamp: new Date().toISOString()
  });
}; 