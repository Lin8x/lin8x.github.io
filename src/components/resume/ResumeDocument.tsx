import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
  PROFESSIONAL_TRACKS,
  DEFAULT_RESUME_SECTION_ORDER,
  RESUME_SECTION_ORDER_BY_TRACK,
  getTrackRoleTitle,
  getResumeSectionItemLimit,
  type TrackKey,
  type ResumeSectionKey,
} from '../../data/tracks';
import { selectResumeProjects } from '../../utils/projectOrdering';

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

const toSentenceStart = (text: string): string => {
  const cleaned = sanitizeText(text);
  if (!cleaned) return '';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
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
    marginBottom: 2,
    paddingBottom: 1,
    borderBottom: '0.5px solid #e5e7eb',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  certName: {
    fontSize: 7.5,
    fontWeight: 600,
    color: '#000',
    maxWidth: '72%',
  },
  certProvider: {
    fontSize: 7,
    color: '#6b7280',
    maxWidth: '72%',
  },
  certMeta: {
    fontSize: 6.5,
    color: '#4b5563',
    textAlign: 'right',
    minWidth: 72,
  },
  certId: {
    fontSize: 6.25,
    color: '#6b7280',
    fontFamily: 'Courier',
    textAlign: 'right',
    minWidth: 72,
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
  acc[track.key] = getTrackRoleTitle(track.key);
  return acc;
}, {} as Record<string, string>);

export interface ResumeData {
  track: string;
  skills: { name: string }[];
  certifications: {
    name: string;
    provider: string;
    status: string;
    type: string;
    date?: string;
    credentialId?: string;
  }[];
  projects: { title: string; date: string; tags: string[]; bullets: { text: string; tracks: string[] }[]; pinned?: boolean }[];
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
  const limitedProjects = selectResumeProjects(data.projects, 3);
  const limitedSkills = data.skills.slice(0, 16);
  const certificationsLimit = getResumeSectionItemLimit(data.track as TrackKey, 'certifications');
  const projectBulletLimit = getResumeSectionItemLimit(data.track as TrackKey, 'projectBullets');
  const experienceBulletLimit = getResumeSectionItemLimit(data.track as TrackKey, 'experienceBullets');
  const limitedCerts = data.certifications
    .filter((c) => c.type === 'certification')
    .slice(0, certificationsLimit);
  const limitedExperience = data.experience.slice(0, 3);
  const summarizedSkills = limitedSkills.map((skill) => sanitizeText(skill.name)).join(', ');

  const getProjectBullets = (project: ResumeData['projects'][number]) =>
    project.bullets.map((bullet) => bullet.text).slice(0, projectBulletLimit);

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
              <View style={styles.certRow}>
                <Text style={styles.certName}>{sanitizeText(cert.name)}</Text>
                {cert.date ? (
                  <Text style={styles.certMeta}>{sanitizeText(cert.date)}</Text>
                ) : (
                  <Text style={styles.certMeta}></Text>
                )}
              </View>
              <View style={styles.certRow}>
                <Text style={styles.certProvider}>{sanitizeText(cert.provider)}</Text>
                {cert.credentialId && (
                  <Text style={styles.certId}>ID: {sanitizeText(cert.credentialId)}</Text>
                )}
              </View>
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
                <Text key={j} style={styles.projectBullet}>- {toSentenceStart(bullet)}</Text>
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
              {exp.bullets.slice(0, experienceBulletLimit).map((bullet, j) => (
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
          Generated from {sanitizeText(data.contactInfo.website)} - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </Page>
    </Document>
  );
};
