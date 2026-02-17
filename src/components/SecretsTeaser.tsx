import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SecretsTeaser() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full flex flex-col justify-center items-center max-w-4xl py-12 animate-fade-in-up">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gradient-to-br from-purple-900/20 via-gray-900/40 to-brand-primary/10 p-4 md:p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">🎮</span>
                        <span className="text-lg md:text-xl font-bold text-white">This Portfolio Has Secrets!</span>
                    </div>
                    <div className="text-purple-400 group-hover:text-purple-300 transition">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                </div>
            </button>
            
            {/* Collapsible Content */}
            <div 
                className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-gradient-to-br from-purple-900/20 via-gray-900/40 to-brand-primary/10 p-6 md:p-8 rounded-2xl border border-purple-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-primary/10 blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <p className="text-gray-400 text-base leading-relaxed mb-6">
                            Explore the site to discover <span className="text-purple-400 font-semibold">hidden easter eggs</span>, answer <span className="text-brand-secondary font-semibold">quizzes</span>, and earn <span className="text-brand-primary font-semibold">points</span> you can spend in the shop. Check the HUD in the top-right corner to track your progress!
                        </p>
                        
                        <div className="flex gap-6 justify-center text-2xl">
                            <span title="Find secrets" className="hover:scale-125 transition cursor-default">🔍</span>
                            <span title="Answer quizzes" className="hover:scale-125 transition cursor-default">❓</span>
                            <span title="Earn points" className="hover:scale-125 transition cursor-default">⭐</span>
                            <span title="Unlock rewards" className="hover:scale-125 transition cursor-default">🎁</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
