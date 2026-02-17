import { useState, useEffect, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { FileDown, Loader2, ChevronDown } from 'lucide-react';

// Register a professional font
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff', fontWeight: 700 },
  ],
});

// Helper to sanitize text for PDF (fix overlapping special characters)
const sanitizeText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/</g, ' < ')
    .replace(/>/g, ' > ')
    .replace(/=/g, ' = ')
    .replace(/&/g, ' and ')
    .replace(/\|/g, ' / ')
    .trim()
    .replace(/\s+/g, ' '); // Normalize whitespace
};

// PDF Styles - Optimized for single page
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#1a1a1a',
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 12,
    borderBottom: '2px solid #10b981',
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,  // Increased spacing between name and subtitle
    color: '#000',
    lineHeight: 1.0,  // Tighter line height to prevent overlap
  },
  subtitle: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 6,
    marginTop: 2,  // Added top margin for separation
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    fontSize: 8,
    color: '#6b7280',
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#10b981',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#000',
    maxWidth: '80%',
  },
  projectDate: {
    fontSize: 8,
    color: '#6b7280',
  },
  projectDesc: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  bulletPoint: {
    fontSize: 8,
    color: '#4b5563',
    marginLeft: 8,
    marginBottom: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 2,
  },
  tag: {
    fontSize: 6,
    backgroundColor: '#f3f4f6',
    padding: '1 4',
    borderRadius: 2,
    color: '#374151',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillItem: {
    fontSize: 8,
    backgroundColor: '#ecfdf5',
    padding: '2 6',
    borderRadius: 3,
    color: '#065f46',
  },
  certItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingBottom: 2,
    borderBottom: '0.5px solid #e5e7eb',
  },
  certName: {
    fontSize: 9,
    fontWeight: 600,
    color: '#000',
  },
  certProvider: {
    fontSize: 8,
    color: '#6b7280',
  },
  certStatus: {
    fontSize: 7,
    color: '#10b981',
    fontWeight: 600,
  },
  educationItem: {
    marginBottom: 6,
  },
  degreeTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#000',
  },
  institution: {
    fontSize: 9,
    color: '#10b981',
  },
  coursework: {
    fontSize: 7,
    color: '#6b7280',
    marginTop: 2,
  },
  // Experience section styles
  experienceItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#000',
    maxWidth: '75%',
  },
  experienceDate: {
    fontSize: 8,
    color: '#6b7280',
  },
  experienceBullet: {
    fontSize: 8,
    color: '#4b5563',
    marginLeft: 8,
    marginBottom: 1,
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 7,
    color: '#9ca3af',
    textAlign: 'center',
    borderTop: '0.5px solid #e5e7eb',
    paddingTop: 6,
  },
  link: {
    color: '#10b981',
    textDecoration: 'none',
  },
  summaryText: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.4,
  },
  sectionDivider: {
    borderBottom: '0.5px solid #e5e7eb',
    marginBottom: 10,
    marginTop: 2,
  },
});

// Track display names
const trackNames: Record<string, string> = {
  'cloud': 'Cloud Engineer',
  'dataengineer': 'Data Engineer',
  'gamedev': 'Game Developer',
  'software-engineer': 'Software Engineer',
};

// Resume Document Component
interface ResumeData {
  track: string;
  skills: { name: string }[];
  certifications: { name: string; provider: string; status: string; type: string }[];
  projects: { title: string; description: string; date: string; tags: string[] }[];
  education: { title: string; institution: string; year: string; relevantCourses: string[] }[];
  courses: { name: string }[];
  experience: { title: string; startDate: string; endDate: string; bullets: string[] }[];
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

const ResumeDocument = ({ data }: { data: ResumeData }) => {
  const trackTitle = trackNames[data.track] || 'Software Engineer';
  
  // Filter courses for this track from education
  const relevantCourseNames = data.courses.map(c => c.name);
  
  // Limit projects to most recent 2 for single page (reduced to fit experience)
  const limitedProjects = data.projects.slice(0, 2);
  
  // Limit skills to fit on one page
  const limitedSkills = data.skills.slice(0, 12);
  
  // Limit certifications
  const limitedCerts = data.certifications
    .filter(c => c.type === 'certification')
    .slice(0, 2);
  
  // Limit experience to 3 most recent
  const limitedExperience = data.experience.slice(0, 3);
  
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
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

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>
            {sanitizeText(data.summary)}
          </Text>
        </View>
        <View style={styles.sectionDivider} />

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.slice(0, 2).map((edu, i) => {
            const filteredCourses = edu.relevantCourses.filter(c => 
              relevantCourseNames.includes(c)
            );
            return (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{sanitizeText(edu.title)}</Text>
                <Text style={styles.institution}>{sanitizeText(edu.institution)} - {sanitizeText(edu.year)}</Text>
                {filteredCourses.length > 0 && (
                  <Text style={styles.coursework}>
                    Relevant Coursework: {filteredCourses.slice(0, 4).map(c => sanitizeText(c)).join(', ')}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
        <View style={styles.sectionDivider} />

        {/* Certifications - Limited to 3 */}
        {limitedCerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {limitedCerts.map((cert, i) => (
                <View key={i} style={styles.certItem}>
                  <View>
                    <Text style={styles.certName}>{sanitizeText(cert.name)}</Text>
                    <Text style={styles.certProvider}>{sanitizeText(cert.provider)}</Text>
                  </View>
                  <Text style={styles.certStatus}>
                    {cert.status === 'completed' ? 'Verified' : 'In Progress'}
                  </Text>
                </View>
              ))}
          </View>
        )}
        <View style={styles.sectionDivider} />

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {limitedSkills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>{sanitizeText(skill.name)}</Text>
            ))}
          </View>
        </View>
        <View style={styles.sectionDivider} />

        {/* Projects - Limited to 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {limitedProjects.map((project, i) => (
            <View key={i} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{sanitizeText(project.title)}</Text>
                <Text style={styles.projectDate}>{sanitizeText(project.date)}</Text>
              </View>
              <Text style={styles.projectDesc}>{sanitizeText(project.description)}</Text>
              <View style={styles.tagsRow}>
                {project.tags.slice(0, 4).map((tag, j) => (
                  <Text key={j} style={styles.tag}>{sanitizeText(tag)}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.sectionDivider} />

        {/* Relevant Experience */}
        {limitedExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relevant Experience</Text>
            {limitedExperience.map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                  <Text style={styles.experienceDate}>
                    {sanitizeText(exp.startDate)} – {sanitizeText(exp.endDate)}
                  </Text>
                </View>
                {exp.bullets.slice(0, 3).map((bullet, j) => (
                  <Text key={j} style={styles.experienceBullet}>• {sanitizeText(bullet)}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated from danieljalali.com - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </Page>
    </Document>
  );
};

// Main Component with Download Button
interface ResumeGeneratorProps {
  track?: string;
  variant?: 'button' | 'link' | 'dropdown';
  className?: string;
}

// All tracks for dropdown
const allTracks = [
  { key: 'cloud', name: 'Cloud Engineer' },
  { key: 'dataengineer', name: 'Data Engineer' },
  { key: 'gamedev', name: 'Game Developer' },
  { key: 'software-engineer', name: 'Software Engineer' },
];

// Individual Download Link Component
function ResumeDownloadLink({ 
  trackKey, 
  trackName, 
  className,
  showIcon = true 
}: { 
  trackKey: string; 
  trackName: string; 
  className?: string;
  showIcon?: boolean;
}) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      import('../data/portfolio'),
      import('../data/resumeProjects'),
      import('../data/personal'),
    ]).then(([portfolio, projectsModule, personalModule]) => {
      const skills = portfolio.getSkillsForTrack(trackKey);
      const certifications = portfolio.getCertificationsForTrack(trackKey);
      const courses = portfolio.courseMap[trackKey] || [];
      const education = portfolio.degrees;
      const projects = projectsModule.getProjectsForTrack(trackKey);
      const contactInfo = personalModule.contactInfo;
      const summary = personalModule.professionalSummaries[trackKey] || personalModule.professionalSummaries['software-engineer'];
      const experience = personalModule.getExperienceForTrack ? 
        personalModule.getExperienceForTrack(trackKey) : [];
      
      setResumeData({
        track: trackKey,
        skills,
        certifications,
        projects,
        education,
        courses,
        experience,
        contactInfo,
        summary,
      });
      setIsLoading(false);
    });
  }, [trackKey]);

  const fileName = `Daniel_Jalali_Resume_${trackName.replace(/\s+/g, '_')}.pdf`;

  if (isLoading || !resumeData) {
    return (
      <span className={className || "block px-4 py-2 text-gray-400"}>
        {showIcon && <Loader2 size={14} className="inline animate-spin mr-2" />}
        {trackName}
      </span>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumeDocument data={resumeData} />}
      fileName={fileName}
      className={className || "block px-4 py-2 hover:bg-gray-800 hover:text-brand-primary transition cursor-pointer"}
    >
      {({ loading }) => (
        <>
          {showIcon && (loading ? <Loader2 size={14} className="inline animate-spin mr-2" /> : <FileDown size={14} className="inline mr-2" />)}
          {trackName}
        </>
      )}
    </PDFDownloadLink>
  );
}

export default function ResumeGenerator({ track = 'software-engineer', variant = 'dropdown', className }: ResumeGeneratorProps) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isClient) {
    return (
      <span className={className || "text-gray-400"}>
        Resume
      </span>
    );
  }

  // Button variant - single download for current track
  if (variant === 'button') {
    return (
      <ResumeDownloadLink 
        trackKey={track} 
        trackName={trackNames[track] || 'Software Engineer'} 
        className={className || "px-4 py-2 bg-brand-primary text-black font-bold rounded-lg hover:bg-white transition flex items-center gap-2 justify-center"}
      />
    );
  }

  // Link variant - single download for current track (legacy)
  if (variant === 'link') {
    return (
      <ResumeDownloadLink 
        trackKey={track} 
        trackName={trackNames[track] || 'Software Engineer'} 
        className={className || "hover:text-white transition flex items-center gap-1"}
        showIcon={false}
      />
    );
  }

  // Dropdown variant - shows all track options
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-white transition py-4 text-gray-300"
      >
        Resume
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full left-0 w-52 bg-gray-900 border border-gray-800 rounded-lg shadow-xl py-2 transition-all duration-200 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-2'
        }`}
      >
        <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800 mb-1">
          Download Resume
        </div>
        {allTracks.map((t) => (
          <ResumeDownloadLink 
            key={t.key}
            trackKey={t.key} 
            trackName={t.name}
            className={`block px-4 py-2 hover:bg-gray-800 hover:text-brand-primary transition cursor-pointer text-gray-300 ${
              track === t.key ? 'text-brand-primary bg-gray-800/50' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
