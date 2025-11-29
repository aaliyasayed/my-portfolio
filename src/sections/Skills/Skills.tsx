import { useMemo, memo } from 'react';
import { Section } from '../../components/Section';
import { SkillProgressBar } from '../../components/SkillProgressBar';
import { useData } from '../../context/DataContext';

import styles from './Skills.module.scss';

export const Skills = memo(() => {
  const { skills = [], skillsSection } = useData();
    
  // Calculate delay for staggered animation
  const getDelay = (index: number) => {
    return 100 + (index * 150);
  };
  
  // Get section heading and subheading from skillsSection
  const sectionContent = useMemo(() => ({
    title: skillsSection?.heading || "My Skills",
    subtitle: skillsSection?.subheading || "What I can do"
  }), [skillsSection?.heading, skillsSection?.subheading]);

  // Memoize the skill grid items
  const skillItems = useMemo(() => (
    skills.map((skill, index) => (
      <div key={skill.title || index} className={styles.skillColumn}>
        <SkillProgressBar
          title={skill.title}
          percentage={skill.percentage || 0}
          subtitle={skill.subtitle || ''}
          description={skill.description || ''}
          delay={getDelay(index)}
        />
      </div>
    ))
  ), [skills]);

  return (
    <Section id="skills" title={sectionContent.title} subtitle={sectionContent.subtitle} highlighted>
      <div className={styles.container}>
        <div className={styles.skillsGrid}>
          {skillItems}
        </div>
      </div>
    </Section>
  );
}); 