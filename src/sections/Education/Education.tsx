import { Section } from "../../components/Section";
import { useData } from "../../context/DataContext";
import {
  Timeline,
  TimelineColumn,
  TimelineItem,
} from "../../components/Timeline";
import { Tags } from "../../components/Tags/Tags";
import { DateDisplay } from "../../components/DateDisplay";

// import styles from "./Education.module.scss";

export const Education = () => {
  const { education } = useData();

  return (
    <Section
      id="education"
      title={education.heading}
      subtitle={education.subheading}
      titleAlign="left"
      highlighted
    >
      <Timeline variant="card">
        <TimelineColumn title="Academics">
          {education?.academics?.map((academic, index) => (
            <TimelineItem key={index} delay={index * 200}>
              <h3>{academic.degree}</h3>
              <h4>{academic.school}</h4>
              {academic.dateRange && <DateDisplay date={academic.dateRange} />}
              {academic.tags && academic.tags.length > 0 && (
                <Tags tags={academic.tags} />
              )}
            </TimelineItem>
          ))}
        </TimelineColumn>
      </Timeline>
    </Section>
  );
};
