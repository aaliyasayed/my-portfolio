import { createContext, useState, useContext, ReactNode, useEffect, useCallback, useRef, useMemo } from 'react';
import { throttle } from '../utils/helpers';
import { useData } from './DataContext';
type NavigationContextType = {
  activeSection: string;
  navigateTo: (sectionId: string) => void;
  navItems: { id: string; label: string }[];
};


const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const { navigation = [] } = useData();

  const [activeSection, setActiveSection] = useState('home');
  const activeSectionTimer = useRef<number | null>(null);
  const isManualNavigation = useRef(false);
  const DEBOUNCE_TIME = 300; // Time in ms a section must be visible before activating

  const navigateTo = useCallback((sectionId: string) => {
    // Set manual navigation flag to true
    isManualNavigation.current = true;

    // Immediately update active section when manually navigated
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      // Get dynamic navbar height based on viewport width
      const getNavbarHeight = () => {
        const width = window.innerWidth;
        if (width <= 576) {
          return 65; // Mobile
        } else if (width <= 768) {
          return 70; // Tablet
        }
        return 90; // Desktop
      };

      const navbarHeight = getNavbarHeight();
      const yOffset = -navbarHeight;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      // Reset the manual navigation flag after scroll completes
      window.setTimeout(() => {
        isManualNavigation.current = false;
      }, 1000); // This should be longer than the expected scroll duration
    }
  }, []);

  const calculateVisibleSection = useCallback(() => {
    // Skip calculation if navigation was triggered manually and still in progress
    if (isManualNavigation.current) return;

    // Get section IDs from navItems
    const sectionIds = navigation.map(item => item.id);

    // Get all sections
    const sections = sectionIds.map(id => ({
      id,
      element: document.getElementById(id),
      offset: document.getElementById(id)?.getBoundingClientRect().top || 0
    })).filter(section => section.element);

    // Find the section that is currently most visible in the viewport
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    const visibleSections = sections.map(section => {
      const rect = section.element!.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top + scrollPosition;
      const sectionBottom = sectionTop + sectionHeight;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(scrollPosition, sectionTop);
      const visibleBottom = Math.min(scrollPosition + viewportHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // Calculate the percentage of the section that is visible
      const visiblePercentage = visibleHeight / sectionHeight;

      return {
        id: section.id,
        visiblePercentage
      };
    });

    // Sort by visible percentage (highest first)
    visibleSections.sort((a, b) => b.visiblePercentage - a.visiblePercentage);

    // Update active section if the most visible one has changed and is visible enough
    if (visibleSections.length > 0 && visibleSections[0].visiblePercentage > 0.3) {
      const mostVisibleSection = visibleSections[0].id;

      // Clear any existing timer
      if (activeSectionTimer.current) {
        window.clearTimeout(activeSectionTimer.current);
        activeSectionTimer.current = null;
      }

      // Only update the active section after the debounce time
      activeSectionTimer.current = window.setTimeout(() => {
        setActiveSection(mostVisibleSection);
      }, DEBOUNCE_TIME);
    }
  }, [navigation]);

  // Memoize the throttled scroll handler
  const throttledScrollHandler = useMemo(
    () => throttle(calculateVisibleSection, 100),
    [calculateVisibleSection]
  );

  useEffect(() => {
    // Use the memoized throttled function
    window.addEventListener('scroll', throttledScrollHandler);

    // Trigger once on mount to set initial active section
    calculateVisibleSection();

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      // Clear any pending timeouts on unmount
      if (activeSectionTimer.current) {
        window.clearTimeout(activeSectionTimer.current);
        activeSectionTimer.current = null;
      }
    };
  }, [calculateVisibleSection, throttledScrollHandler]);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    activeSection,
    navigateTo,
    navItems: navigation
  }), [activeSection, navigateTo, navigation]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};