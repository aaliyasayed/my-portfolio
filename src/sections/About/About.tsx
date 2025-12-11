import { useRef, useState, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tags } from "../../components/Tags";
import { SocialButtons } from "../../components/SocialButtons/SocialButtons";
import Photo from "../../components/Photo";
import styles from "./About.module.scss";

export const About = () => {
  const { navigateTo } = useNavigation();
  const { about } = useData();
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Section id="about">
      <div
        className={`${styles.container} ${animate ? styles.animate : ""}`}
        ref={sectionRef}
      >
        <div className={styles.imageSection}>
          <div className={styles.imageStack}>
            {about.imageUrl && about.imageUrl.trim() !== "" ? (
              <div className={styles.imageWrapper}>
                <Photo customImage={about.imageUrl} />
                <div className={styles.imageDecoration}></div>
              </div>
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>Profile Image</span>
              </div>
            )}

            <div className={styles.experienceBadge}>
              <span className={styles.years}>7.5+</span>
              <span className={styles.text}>Years of Experience</span>
            </div>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.heading}>
            <h2 className={styles.title}>{about.heading}</h2>
            <h3 className={styles.subtitle}>{about.subheading}</h3>
          </div>

          {about.titleTags && about.titleTags.length > 0 && (
            <div className={styles.tags}>
              <Tags tags={about.titleTags} size="default" />
            </div>
          )}

          <div className={styles.divider}></div>

          <div className={styles.description}>
            <p dangerouslySetInnerHTML={{ __html: about.aboutContent }} />
          </div>

          <div className={styles.buttonGroup}>
            <Button onClick={() => navigateTo("contact")}>
              {about.contactButtonText}
            </Button>
            <Button
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              {about.resumeButtonText}
            </Button>
          </div>

          <div className={styles.socialButtons}>
            <SocialButtons
              linkedin={about.linkedin}
              github={about.github}
              // codepen={about.codepen}
              whatsappNumber={about.whatsappNumber}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
