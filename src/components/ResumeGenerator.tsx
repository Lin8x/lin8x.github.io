import { useState, useEffect, useRef } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileDown, Loader2, ChevronDown } from 'lucide-react';
import { PROFESSIONAL_TRACKS, resolveTrackContentKey, getTrackWebsiteHost, type TrackKey } from '../data/tracks';
import { ResumeDocument, type ResumeData, trackNames } from './resume/ResumeDocument';

// Main Component with Download Button
interface ResumeGeneratorProps {
  track?: string;
  variant?: 'button' | 'link' | 'dropdown';
  className?: string;
}

// All tracks for dropdown
const allTracks = PROFESSIONAL_TRACKS.map((track) => ({ key: track.key, name: track.name }));

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
      const contentTrack = resolveTrackContentKey(trackKey as TrackKey);
      const skills = portfolio.getSkillsForTrack(contentTrack);
      const certifications = portfolio.getCertificationsForTrack(contentTrack);
      const courses = portfolio.courseMap[contentTrack] || [];
      const education = portfolio.degrees;
      const projects = projectsModule.getProjectsForTrack(contentTrack);
      const contactInfo = personalModule.contactInfo;
      const website = getTrackWebsiteHost(trackKey as TrackKey);
      const summary =
        personalModule.professionalSummaries[trackKey] ||
        personalModule.professionalSummaries[contentTrack] ||
        personalModule.professionalSummaries['software-engineer'];
      const experience = personalModule.getExperienceForTrack ? 
        personalModule.getExperienceForTrack(contentTrack) : [];
      
      setResumeData({
        track: trackKey,
        skills,
        certifications,
        projects,
        education,
        courses,
        experience,
        contactInfo: {
          ...contactInfo,
          website,
        },
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
