import React, { useState } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

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

  return (
    <>
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

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-gray-900 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col"
          >
            {/* Sticky Header for Close Button */}
            <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none">
                <button 
                onClick={() => setIsOpen(false)}
                className="pointer-events-auto p-2 bg-gray-800 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition shadow-lg border border-gray-600"
                >
                <X size={24} />
                </button>
            </div>

            {image && (
              <div className="-mt-20 w-full h-48 md:h-64 bg-gray-800 relative shrink-0">
                 <img src={image} alt={title} className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
            )}

            <div className="p-8 pt-4">
              <span className="text-sm font-mono text-brand-primary block mb-2">{date}</span>
              <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
              
              <div className="prose prose-invert max-w-none text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

              <div className="flex flex-wrap gap-2 mb-8 border-t border-gray-800 pt-6">
                {tags.map(tag => (
                  <span key={tag} className="text-SM px-3 py-1 bg-gray-800 text-brand-secondary rounded-full border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              {links && (
                <div className="flex gap-4">
                  {links.github && (
                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition border border-gray-700">
                      <Github size={20} />
                      View Code
                    </a>
                  )}
                  {links.demo && (
                    <a href={links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-black font-bold hover:bg-opacity-90 rounded-lg transition">
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
