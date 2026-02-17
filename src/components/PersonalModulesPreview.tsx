import { Server, Gamepad2, Terminal, Fish } from 'lucide-react';

interface InterestCategory {
    icon: React.ElementType;
    title: string;
    color: string;
    items: string[];
}

// Condensed preview - show only 4 categories with top items
const previewInterests: InterestCategory[] = [
    {
        icon: Gamepad2,
        title: "🎮 Video Games",
        color: "purple-500",
        items: ["Minecraft", "Team Fortress 2", "Stellaris", "Zelda: TOTK"]
    },
    {
        icon: Server,
        title: "🖥️ Homelab",
        color: "brand-primary",
        items: ["Docker Everything", "Plex / Jellyfin", "Home Assistant", "Pi-hole + Unbound"]
    },
    {
        icon: Terminal,
        title: "🐧 Operating Systems",
        color: "green-500",
        items: ["Fedora (Daily Driver)", "Kali Linux", "macOS"]
    },
    {
        icon: Fish,
        title: "🎣 Offline Hobbies",
        color: "teal-500",
        items: ["Fishing", "Cooking", "Walking / Hiking"]
    },
];

export default function PersonalModulesPreview() {
    const colorClasses: Record<string, { border: string; text: string; bg: string; hover: string }> = {
        'brand-primary': { border: 'border-brand-primary/30', text: 'text-brand-primary', bg: 'bg-brand-primary/10', hover: 'hover:border-brand-primary/50' },
        'purple-500': { border: 'border-purple-500/30', text: 'text-purple-500', bg: 'bg-purple-500/10', hover: 'hover:border-purple-500/50' },
        'green-500': { border: 'border-green-500/30', text: 'text-green-500', bg: 'bg-green-500/10', hover: 'hover:border-green-500/50' },
        'teal-500': { border: 'border-teal-500/30', text: 'text-teal-500', bg: 'bg-teal-500/10', hover: 'hover:border-teal-500/50' },
    };

    return (
        <section className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-gray-900">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Beyond the Code
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    A peek at what I'm into when I'm not staring at a terminal.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {previewInterests.map((category, idx) => {
                    const Icon = category.icon;
                    const colors = colorClasses[category.color] || colorClasses['brand-primary'];
                    
                    return (
                        <div 
                            key={idx} 
                            className={`bg-gray-900/50 border border-gray-800 ${colors.hover} rounded-2xl p-5 transition-all duration-300 hover:bg-gray-900/80`}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-4 h-4 ${colors.text}`} />
                                </div>
                                <h3 className="font-bold text-white text-sm">{category.title}</h3>
                            </div>
                            
                            <ul className="space-y-1.5">
                                {category.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-center gap-2 text-gray-400 text-sm">
                                        <span className={`w-1 h-1 ${colors.bg} rounded-full shrink-0`}></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-10 text-center">
                <a 
                    href="/interests" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                >
                    <span>See All Interests</span>
                    <span className="transform group-hover:translate-x-1 transition">→</span>
                </a>
            </div>
        </section>
    );
}
