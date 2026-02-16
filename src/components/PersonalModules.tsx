import React from 'react';
import { Server, Gamepad2, Terminal, Compass, Wrench, BookOpen } from 'lucide-react';

const modules = [
    {
        icon: Server,
        title: "Self-Hosting",
        color: "brand-primary",
        items: ["Minecraft Servers", "Plex & Jellyfin", "Home Assistant", "Pi-hole Ad Blocking"]
    },
    {
        icon: Wrench,
        title: "Hardware",
        color: "purple-500",
        items: ["Console Modding", "PC Building", "Repair & Diagnostics"]
    },
    {
        icon: Terminal,
        title: "Linux Life",
        color: "green-500",
        items: ["Fedora Daily Driver", "Arch Maintenance", "Dotfiles & Ricing", "System Hardening"]
    },
    {
        icon: Gamepad2,
        title: "Gaming",
        color: "blue-500",
        items: ["Civilization VI", "Stellaris", "Strategy & 4X", "Indie Games"]
    },
    {
        icon: Compass,
        title: "Outdoors",
        color: "amber-500",
        items: ["Fishing", "Hiking", "Photography"]
    },
    {
        icon: BookOpen,
        title: "Reading",
        color: "rose-500",
        items: ["Sci-Fi Novels", "Tech Blogs", "Security Research"]
    }
];

export default function PersonalModules() {
    return (
        <section className="w-full max-w-6xl mx-auto py-24 px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-4">
                    <span className="text-brand-primary">///</span> Beyond the Code
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    The interests and hobbies that shape how I think and build.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {modules.map((module, idx) => {
                    const Icon = module.icon;
                    const colorClasses: Record<string, { border: string; text: string; bg: string; glow: string }> = {
                        'brand-primary': { border: 'hover:border-brand-primary/50', text: 'text-brand-primary', bg: 'bg-brand-primary/10', glow: 'group-hover:shadow-brand-primary/20' },
                        'purple-500': { border: 'hover:border-purple-500/50', text: 'text-purple-500', bg: 'bg-purple-500/10', glow: 'group-hover:shadow-purple-500/20' },
                        'green-500': { border: 'hover:border-green-500/50', text: 'text-green-500', bg: 'bg-green-500/10', glow: 'group-hover:shadow-green-500/20' },
                        'blue-500': { border: 'hover:border-blue-500/50', text: 'text-blue-500', bg: 'bg-blue-500/10', glow: 'group-hover:shadow-blue-500/20' },
                        'amber-500': { border: 'hover:border-amber-500/50', text: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'group-hover:shadow-amber-500/20' },
                        'rose-500': { border: 'hover:border-rose-500/50', text: 'text-rose-500', bg: 'bg-rose-500/10', glow: 'group-hover:shadow-rose-500/20' },
                    };
                    const colors = colorClasses[module.color];
                    
                    return (
                        <div 
                            key={idx} 
                            className={`group bg-gray-900/50 border border-gray-800 ${colors.border} rounded-2xl p-5 transition-all duration-300 hover:bg-gray-900 hover:shadow-xl ${colors.glow}`}
                        >
                            {/* Icon */}
                            <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                                <Icon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            
                            {/* Title */}
                            <h3 className={`font-bold text-white mb-3 text-sm`}>{module.title}</h3>
                            
                            {/* Items */}
                            <ul className="space-y-1.5">
                                {module.items.map((item, i) => (
                                    <li key={i} className="text-xs text-gray-500 group-hover:text-gray-400 transition flex items-center gap-2">
                                        <span className={`w-1 h-1 rounded-full ${colors.bg} ${colors.text}`}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
