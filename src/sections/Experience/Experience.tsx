import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Timeline, TimelineColumn, TimelineItem } from '../../components/Timeline';
import { Tags } from '../../components/Tags/Tags';
import { DateDisplay } from '../../components/DateDisplay';
import { Location } from '../../components/Location';
import { useTracking } from '../../hooks/useTracking';

export const Experience = () => {
  const { experience } = useData();
  const { trackCtaClick } = useTracking();
  const [expandedItems, setExpandedItems] = useState<{[key: number]: boolean}>({});

  const toggleExpand = (index: number) => {
    const isExpanding = !expandedItems[index];
    trackCtaClick(`experience-${isExpanding ? 'expand' : 'collapse'}-${index}`, 'button');
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Section
      id="experience"
      title={experience.heading}
      subtitle={experience.subheading}
      titleAlign="left"
      background={experience.background}
    >
      <Timeline>
        <TimelineColumn>
          {experience.jobs.map((exp, index) => (
            <TimelineItem
              key={index}
              delay={index * 200}
            >
              <h3>{exp.company}</h3>
              <h4>{exp.title}</h4>
              <DateDisplay date={exp.dateRange} />

              {exp.location && (
                <Location location={exp.location} />
              )}
              
              <div>
                {(expandedItems[index] ? exp.description : exp.description.slice(0, 3)).map((desc, i) => (
                  <p key={i} style={{ marginBottom: '20px', lineHeight: '1.4' }}>{desc}</p>
                ))}
                {exp.description.length > 3 && (
                  <div style={{ marginTop: '10px' }}>
                    <Button
                      variant="link"
                      size="small"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedItems[index] ? 'Show Less' : 'Show More'}
                    </Button>
                  </div>
                )}
              </div>
              
              {exp?.skills?.length > 0 && <Tags tags={exp.skills} />}
            </TimelineItem>
          ))}
        </TimelineColumn>
      </Timeline>
    </Section>
  );
}; 