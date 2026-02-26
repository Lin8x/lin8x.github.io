import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
  PROFESSIONAL_TRACKS,
  DEFAULT_RESUME_SECTION_ORDER,
  RESUME_SECTION_ORDER_BY_TRACK,
  type ResumeSectionKey,
} from '../../data/tracks';

const sanitizeText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/</g, ' < ')
    .replace(/>/g, ' > ')
    .replace(/=/g, ' = ')
    .replace(/&/g, ' and ')
    .replace(/\|/g, ' / ')
    .trim()
    .replace(/\s+/g, ' ');
};

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 8,
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 8,
    borderBottom: '2px solid #10b981',
    paddingBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 2,
    color: '#000',
    lineHeight: 1.0,
  },
  subtitle: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 4,
    marginTop: 1,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 7,
    color: '#6b7280',
    flexWrap: 'wrap',
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: '#10b981',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  projectItem: {
    marginBottom: 5,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  projectTitle: {
    fontSize: 8,
    fontWeight: 600,
    color: '#000',
    maxWidth: '76%',
  },
  projectDate: {
    fontSize: 7,
    color: '#6b7280',
  },
  projectBullet: {
    fontSize: 7,
    color: '#374151',
    marginLeft: 5,
    marginBottom: 1,
    lineHeight: 1.15,
  },
  skillsLine: {
    fontSize: 7,
    color: '#065f46',
    lineHeight: 1.15,
  },
  certItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    paddingBottom: 1,
    borderBottom: '0.5px solid #e5e7eb',
  },
  certName: {
    fontSize: 7.5,
    fontWeight: 600,
    color: '#000',
  },
  certProvider: {
    fontSize: 7,
    color: '#6b7280',
  },
  certStatus: {
    fontSize: 6.5,
    color: '#10b981',
    fontWeight: 600,
  },
  educationItem: {
    marginBottom: 2,
  },
  degreeTitle: {
    fontSize: 7.5,
    fontWeight: 600,
    color: '#000',
  },
  institution: {
    fontSize: 7,
    color: '#10b981',
  },
  coursework: {
    fontSize: 6.5,
    color: '#6b7280',
    marginTop: 1,
  },
  experienceItem: {
    marginBottom: 4,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  experienceTitle: {
    fontSize: 8,
    fontWeight: 600,
    color: '#000',
    maxWidth: '72%',
  },
  experienceDate: {
    fontSize: 7,
    color: '#6b7280',
  },
  experienceBullet: {
    fontSize: 7,
    color: '#4b5563',
    marginLeft: 5,
    marginBottom: 1,
    lineHeight: 1.15,
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 24,
    right: 24,
    fontSize: 6,
    color: '#9ca3af',
    textAlign: 'center',
    borderTop: '0.5px solid #e5e7eb',
    paddingTop: 4,
  },
  summaryText: {
    fontSize: 7,
    color: '#374151',
    lineHeight: 1.15,
  },
  sectionDivider: {
    borderBottom: '0.5px solid #e5e7eb',
    marginBottom: 4,
    marginTop: 1,
  },
});

export const trackNames: Record<string, string> = PROFESSIONAL_TRACKS.reduce((acc, track) => {
  acc[track.key] = track.name;
  return acc;
}, {} as Record<string, string>);

export interface ResumeData {
  track: string;
  skills: { name: string }[];
  certifications: { name: string; provider: string; status: string; type: string }[];
  projects: { title: string; description: string; date: string; tags: string[] }[];
  education: { title: string; institution: string; year: string; relevantCourses: string[] }[];
  courses: { name: string }[];
  experience: { title: string; company?: string; organizationType?: string; startDate: string; endDate: string; bullets: string[] }[];
  contactInfo: {
    name: string;
    email: string;
    linkedin: string;
    github: string;
    website: string;
    location: string;
  };
  summary: string;
}

export const ResumeDocument = ({ data }: { data: ResumeData }) => {
  const trackTitle = trackNames[data.track] || 'Software Engineer';
  const relevantCourseNames = data.courses.map((c) => c.name);
  const limitedProjects = data.projects.slice(0, 3);
  const limitedSkills = data.skills.slice(0, 16);
  const limitedCerts = data.certifications.filter((c) => c.type === 'certification').slice(0, 2);
  const limitedExperience = data.experience.slice(0, 3);
  const summarizedSkills = limitedSkills.map((skill) => sanitizeText(skill.name)).join(', ');

  const getProjectBullets = (project: ResumeData['projects'][number]) => {
    const segments = (project.description || '')
      .split(/[,;](?=\s)/)
      .map((part) => part.trim())
      .filter(Boolean);
    const bullets: string[] = [];

    if (segments.length) {
      bullets.push(segments[0]);
      if (segments[1]) bullets.push(segments[1]);
    } else if (project.description) {
      bullets.push(project.description.trim());
    }

    if (project.tags.length) {
      bullets.push(`Tech stack: ${project.tags.slice(0, 5).join(', ')}`);
    }

    return bullets.slice(0, 3);
  };

  const sectionOrder: ResumeSectionKey[] =
    RESUME_SECTION_ORDER_BY_TRACK[data.track as keyof typeof RESUME_SECTION_ORDER_BY_TRACK] ||
    DEFAULT_RESUME_SECTION_ORDER;

  const renderSection = (section: ResumeSectionKey) => {
    if (section === 'summary') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{sanitizeText(data.summary)}</Text>
        </View>
      );
    }

    if (section === 'skills') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <Text style={styles.skillsLine}>{summarizedSkills}</Text>
        </View>
      );
    }

    if (section === 'certifications') {
      if (limitedCerts.length === 0) return null;
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {limitedCerts.map((cert, i) => (
            <View key={i} style={styles.certItem}>
              <View>
                <Text style={styles.certName}>{sanitizeText(cert.name)}</Text>
                <Text style={styles.certProvider}>{sanitizeText(cert.provider)}</Text>
              </View>
              <Text style={styles.certStatus}>{cert.status === 'completed' ? 'Verified' : 'In Progress'}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (section === 'projects') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {limitedProjects.map((project, i) => (
            <View key={i} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{sanitizeText(project.title)}</Text>
                <Text style={styles.projectDate}>{sanitizeText(project.date)}</Text>
              </View>
              {getProjectBullets(project).map((bullet, j) => (
                <Text key={j} style={styles.projectBullet}>- {sanitizeText(bullet)}</Text>
              ))}
            </View>
          ))}
        </View>
      );
    }

    if (section === 'experience') {
      if (limitedExperience.length === 0) return null;
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Relevant Experience</Text>
          {limitedExperience.map((exp, i) => (
            <View key={i} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                <Text style={styles.experienceDate}>{sanitizeText(exp.startDate)} - {sanitizeText(exp.endDate)}</Text>
              </View>
              {(exp.company || exp.organizationType) && (
                <Text style={styles.certProvider}>
                  {[exp.company, exp.organizationType].filter(Boolean).map((v) => sanitizeText(v || '')).join(' | ')}
                </Text>
              )}
              {exp.bullets.slice(0, 3).map((bullet, j) => (
                <Text key={j} style={styles.experienceBullet}>- {sanitizeText(bullet)}</Text>
              ))}
            </View>
          ))}
        </View>
      );
    }

    if (section === 'education') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.slice(0, 2).map((edu, i) => {
            const filteredCourses = edu.relevantCourses.filter((c) => relevantCourseNames.includes(c));
            return (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{sanitizeText(edu.title)}</Text>
                <Text style={styles.institution}>{sanitizeText(edu.institution)} - {sanitizeText(edu.year)}</Text>
                {filteredCourses.length > 0 && (
                  <Text style={styles.coursework}>
                    Relevant Coursework: {filteredCourses.slice(0, 4).map((c) => sanitizeText(c)).join(', ')}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      );
    }

    return null;
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page} wrap={false}>
        <View style={styles.header}>
          <Text style={styles.name}>{sanitizeText(data.contactInfo.name)}</Text>
          <Text style={styles.subtitle}>{sanitizeText(trackTitle)}</Text>
          <View style={styles.contactRow}>
            <Text>{sanitizeText(data.contactInfo.email)}</Text>
            <Text>{sanitizeText(data.contactInfo.linkedin)}</Text>
            <Text>{sanitizeText(data.contactInfo.github)}</Text>
            <Text>{sanitizeText(data.contactInfo.website)}</Text>
          </View>
        </View>

        {sectionOrder.map((section, idx) => {
          const content = renderSection(section);
          if (!content) return null;
          return (
            <View key={section}>
              {content}
              {idx < sectionOrder.length - 1 && <View style={styles.sectionDivider} />}
            </View>
          );
        })}

        <Text style={styles.footer}>
          Generated from danieljalali.com - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </Page>
    </Document>
  );
};
