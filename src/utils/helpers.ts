/**
 * Throttle function to limit how often a function can be called
 * @param func The function to throttle
 * @param delay The minimum time between function calls in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeRemaining = delay - (now - lastCall);
    
    // Clear any existing timeout
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    
    if (timeRemaining <= 0) {
      // It's been longer than the delay, execute immediately
      lastCall = now;
      func(...args);
    } else {
      // Schedule the execution for later
      timeout = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
        timeout = null;
      }, timeRemaining);
    }
  };
};

/**
 * Debounce function to wait until after a series of calls stops
 * @param func The function to debounce
 * @param wait The time to wait after the last call
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
};

/**
 * Create a stable key for list items
 * @param prefix A prefix for the key
 * @param value The main value to use as the key
 * @param fallback A fallback index if value is not available
 * @returns A string key
 */
export const createKey = (prefix: string, value: string | number | undefined, fallback: number): string => {
  if (value !== undefined && value !== null && value !== '') {
    // Convert value to string and strip non-alphanumeric chars for safety
    const cleanValue = String(value).replace(/[^a-zA-Z0-9]/g, '');
    return `${prefix}-${cleanValue}`;
  }
  return `${prefix}-item-${fallback}`;
}; 