import { useState, useEffect, useCallback, memo } from "react";
import styles from "./Navbar.module.scss";
import { useNavigation } from "../../context/NavigationContext";
import { useTracking } from "../../hooks/useTracking";

export const Navbar = memo(() => {
  const { activeSection, navigateTo, navItems } = useNavigation();
  const { trackCtaClick } = useTracking();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Memoize scroll handler to prevent recreation on each render
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const hideThreshold = 100; // Hide navbar when scrolled less than 100px

    // Hide navbar when at the top (in hero section)
    if (scrollY < hideThreshold) {
      setIsVisible(false);
      setScrolled(false);
    } else {
      // Show navbar after scrolling down
      setIsVisible(true);
      setScrolled(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Memoize click handlers
  const toggleMobileMenu = useCallback(() => {
    trackCtaClick("mobile-menu-toggle", "button");
    setMobileMenuOpen((prev) => !prev);
  }, [trackCtaClick]);

  const handleHomeClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      trackCtaClick("nav-home", "link");
      navigateTo("home");
    },
    [navigateTo, trackCtaClick]
  );

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      trackCtaClick("nav-contact", "link");
      navigateTo("contact");
    },
    [navigateTo, trackCtaClick]
  );

  const handleNavItemClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      trackCtaClick(`nav-${id}`, "link");
      navigateTo(id);
      setMobileMenuOpen(false);
    },
    [navigateTo, trackCtaClick]
  );

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
        !isVisible ? styles.hidden : ""
      }`}
    >
      <div className={styles.logo}>
        <a href="#home" onClick={handleHomeClick}>
          <img src="/icons/home.svg" alt="Home" width="24" height="24" />
        </a>
      </div>

      <button
        type="button"
        className={`${styles.menuToggle} ${
          mobileMenuOpen ? styles.active : ""
        }`}
        onClick={toggleMobileMenu}
        aria-label={
          mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={mobileMenuOpen}
        aria-controls="primary-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul
        id="primary-navigation"
        className={`${styles.navItems} ${mobileMenuOpen ? styles.open : ""}`}
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            className={activeSection === item.id ? styles.active : ""}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleNavItemClick(e, item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.emailButton}>
        <a
          href="#home"
          onClick={handleContactClick}
          aria-label="Contact via email"
        >
          <img src="/icons/email.svg" alt="Email" width="24" height="24" />
        </a>
      </div>
    </nav>
  );
});
