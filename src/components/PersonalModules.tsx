import React, { useState } from 'react';
import { personalModules } from '../data/personal';
import { ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

export default function PersonalModules() {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const toggle = (idx: number) => {
        setExpanded(expanded === idx ? null : idx);
    };

    return (
        <section className="min-h-[80vh] w-full flex flex-col justify-center items-center max-w-5xl border-t border-gray-900 py-32 mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Personal Modules</h2>
            
            <div className="w-full flex flex-col gap-4">
                {personalModules.map((module, idx) => {
                    const isOpen = expanded === idx;
                    
                    return (
                        <div key={idx} className={`border rounded-3xl transition-all duration-300 overflow-hidden ${isOpen ? 'bg-gray-900/80 border-brand-primary/50 ring-1 ring-brand-primary/20' : 'bg-gray-900/30 border-gray-800 hover:border-gray-700'}`}>
                            <button 
                                onClick={() => toggle(idx)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <h3 className={`text-2xl font-bold transition ${isOpen ? 'text-brand-primary' : 'text-white'}`}>
                                    {module.title}
                                </h3>
                                {isOpen ? <ChevronUp className="text-brand-primary" /> : <ChevronDown className="text-gray-500" />}
                            </button>

                            {/* Content */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 md:p-8 pt-0 border-t border-gray-800/50">
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {module.items.map((item, i) => (
                                            <li key={i} className="bg-black/20 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition">
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-2 h-2 rounded-full ${item.images ? 'bg-brand-secondary animate-pulse' : 'bg-gray-600'}`}></span>
                                                    <span className="text-gray-300 font-medium">{item.text}</span>
                                                    {item.images && <ImageIcon size={14} className="text-brand-secondary ml-auto opacity-50" />}
                                                </div>

                                                {/* Images Preview */}
                                                {item.images && item.images.length > 0 && (
                                                    <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                                        {item.images.map((img, imgIdx) => (
                                                            <div 
                                                                key={imgIdx} 
                                                                className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-700 hover:border-brand-secondary/50 cursor-pointer shrink-0 transition hover:scale-105"
                                                                onClick={() => setActiveImage(img)}
                                                            >
                                                                <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {activeImage && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveImage(null)}>
                    <img src={activeImage} alt="Fullscreen" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-gray-800" />
                    <button className="absolute top-8 right-8 text-white hover:text-red-500 transition">Close</button>
                    <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm font-mono">Click anywhere to close</p>
                </div>
            )}
        </section>
    );
}
