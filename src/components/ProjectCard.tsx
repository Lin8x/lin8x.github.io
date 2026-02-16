import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, ArrowLeft, BookOpen } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  bodyHtml: string;
}

export default function ProjectCard({ title, description, date, tags, image, links, bodyHtml }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Disable background scroll
      document.body.classList.add('overflow-hidden');
      // Scroll to top of the overlay
      const overlay = document.getElementById('project-detail-overlay');
      if (overlay) overlay.scrollTop = 0;

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', onKeyDown);
      
      // Push state for browser back button support
      window.history.pushState({ projectOpen: true }, '');
      
      const handlePopState = () => {
        setIsOpen(false);
      };
      window.addEventListener('popstate', handlePopState);

      return () => {
        document.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('popstate', handlePopState);
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // Go back in history if we pushed a state
    if (window.history.state?.projectOpen) {
      window.history.back();
    }
  };

  return (
    <>
      {/* Card Preview */}
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-brand-primary mb-2 block">{date}</span>
              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition">{title}</h3>
            </div>
            {image && (
              <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden ml-4 flex-shrink-0 border border-gray-700">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          
          <p className="text-gray-400 text-sm mb-6 line-clamp-3">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full border border-gray-700">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-800 text-gray-500 rounded-full border border-gray-700">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Full Page Project Detail View - Rendered via Portal to escape parent constraints */}
      {isOpen && createPortal(
        <div 
          id="project-detail-overlay"
          className="fixed inset-0 z-[1000] bg-black overflow-y-auto overflow-x-hidden animate-in fade-in duration-200"
        >
          {/* Sticky Navigation Bar */}
          <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
              <button 
                onClick={handleClose}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
              >
                <span className="p-2 rounded-lg bg-gray-900 border border-gray-700 group-hover:border-brand-primary transition">
                  <ArrowLeft size={18} />
                </span>
                <span className="hidden sm:inline text-sm">Back to Projects</span>
              </button>
              
              <div className="flex items-center gap-3">
                {links?.github && (
                  <a 
                    href={links.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition border border-gray-700 hover:border-gray-600"
                    title="View Source"
                  >
                    <Github size={18} />
                  </a>
                )}
                {links?.demo && (
                  <a 
                    href={links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-black font-bold hover:bg-opacity-90 rounded-lg transition text-sm"
                  >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </nav>

          {/* Hero Image (if exists) */}
          {image && (
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
            </div>
          )}

          {/* Content Area - GitHub/Markdown Style */}
          <main className={`max-w-4xl mx-auto px-4 md:px-8 pb-24 ${image ? '-mt-20 relative z-10' : 'pt-8'}`}>
            {/* Title Block */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-mono rounded-full border border-brand-primary/30">
                  {date}
                </span>
                {links?.docs && (
                  <a 
                    href={links.docs} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-400 text-xs font-mono rounded-full border border-gray-700 hover:text-white hover:border-gray-600 transition"
                  >
                    <BookOpen size={12} />
                    Docs
                  </a>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">{description}</p>
            </header>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-gray-800">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-sm px-3 py-1.5 bg-gray-900 text-gray-300 rounded-lg border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Markdown Content - Consistent styling */}
            <article 
              className="prose prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: bodyHtml }} 
            />

            {/* Action Links Footer */}
            {links && (links.github || links.demo) && (
              <section className="border-t border-gray-800 pt-10 mb-8">
                <h3 className="text-lg font-bold text-white mb-6">Explore Further</h3>
                <div className="flex flex-wrap gap-4">
                  {links.github && (
                    <a 
                      href={links.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition border border-gray-700 hover:border-gray-600"
                    >
                      <Github size={20} />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {links.demo && (
                    <a 
                      href={links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 px-5 py-3 bg-brand-primary text-black font-bold hover:bg-opacity-90 rounded-xl transition"
                    >
                      <ExternalLink size={20} />
                      <span>Visit Live Demo</span>
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Bottom Close Button */}
            <div className="text-center pt-10 pb-8 border-t border-gray-800">
              <button 
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white rounded-xl transition border border-gray-700"
              >
                <ArrowLeft size={18} />
                Back to Projects
              </button>
            </div>
          </main>
        </div>,
        document.body
      )}
    </>
  );
}
