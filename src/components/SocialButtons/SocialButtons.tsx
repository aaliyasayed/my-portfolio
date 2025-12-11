import styles from './SocialButtons.module.scss';
import { Button } from '../Button/Button';
import { useData } from '../../context/DataContext';
import { useTracking } from '../../hooks/useTracking';

export interface SocialButtonsProps {
  linkedin?: string;
  github?: string;
  codepen?: string;
  whatsappNumber?: string;
  className?: string;
}

// Icon paths for different platforms
const platformIcons = {
  linkedin: '/icons/linkedin.svg',
  github: '/icons/github.svg',
  codepen: '/icons/codepen.svg'
};

// Single social icon component
const SocialIcon = ({
  platform,
  href
}: {
  platform: 'linkedin' | 'github' | 'codepen';
  href: string;
}) => {
  const { trackCtaClick } = useTracking();

  if (!href) return null;

  const handleClick = () => {
    trackCtaClick(`social-${platform}`, 'link');
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialIcon}
      aria-label={platform}
      onClick={handleClick}
    >
      <img
        src={platformIcons[platform]}
        alt={platform}
        className={styles.icon}
      />
    </a>
  );
};

// Main social buttons container component
export function SocialButtons({
  linkedin,
  github,
  codepen,
  whatsappNumber,
  className
}: SocialButtonsProps) {
  const { about } = useData();
  const { trackCtaClick } = useTracking();
  const hasAnySocial = linkedin || github || codepen || whatsappNumber;

  if (!hasAnySocial) return null;

  // Format WhatsApp URL
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(about.whatsappMessage || '')}`
    : '';

  const handleWhatsAppClick = () => {
    trackCtaClick('social-whatsapp', 'button');
  };

  return (
    <div className={`${styles.socialButtons} ${className || ''}`}>
      {linkedin && <SocialIcon platform="linkedin" href={linkedin} />}
      {github && <SocialIcon platform="github" href={github} />}
      {codepen && <SocialIcon platform="codepen" href={codepen} />}
      {whatsappNumber && (
        <Button
          target="_blank"
          rel="noopener noreferrer"
          href={whatsappUrl}
          variant="secondary"
          size="small"
          className={styles.whatsappButton}
          onClick={handleWhatsAppClick}
          aria-label="Open WhatsApp chat"
        >
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className={styles.icon} />
          <span>WhatsApp</span>
        </Button>
      )}
    </div>
  );
}