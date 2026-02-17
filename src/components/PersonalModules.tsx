import React from 'react';
import { Server, Gamepad2, Terminal, Film, Music, BookOpen, Wrench, Fish, Heart } from 'lucide-react';

interface InterestCategory {
    icon: React.ElementType;
    title: string;
    color: string;
    items: {
        name: string;
        note?: string;
    }[];
    intro?: string;
}

const interests: InterestCategory[] = [
    {
        icon: Gamepad2,
        title: "🎮 Video Games",
        color: "purple-500",
        intro: "Gaming has always been a huge part of my life — from late-night couch co-op sessions to deep dives into strategy and survival games. Here are some favorites:",
        items: [
            { name: "Minecraft", note: "My go-to creative outlet. I've hosted servers since 2016 and still play regularly." },
            { name: "Team Fortress 2", note: "800+ hours. Scout main. Still waiting for the heavy update." },
            { name: "Lethal Company", note: "Perfect for chaotic game nights with friends." },
            { name: "Stellaris", note: "For when I want to accidentally stay up until 4am." },
            { name: "Super Smash Bros Ultimate", note: "Kirby and Yoshi main." },
            { name: "Zelda: Tears of the Kingdom", note: "100+ hours building ridiculous contraptions." },
        ]
    },
    {
        icon: Heart,
        title: "🕹️ Nostalgic Favorites",
        color: "rose-500",
        intro: "These games shaped my childhood and still hold a special place in my heart:",
        items: [
            { name: "Yoshi's Island (SNES)", note: "The art style and music are timeless. My first platformer." },
            { name: "Mario & Luigi: Bowser's Inside Story", note: "The best RPG on the DS, fight me." },
            { name: "Kirby Super Star Ultra", note: "Replayed this more times than I can count." },
            { name: "Super Mario Galaxy", note: "The orchestral soundtrack still gives me chills." },
        ]
    },
    {
        icon: Film,
        title: "🎬 Shows & Animation",
        color: "blue-500",
        intro: "I lean heavily toward animation, comedy, and the occasional mind-bending sci-fi:",
        items: [
            { name: "The Amazing Digital Circus", note: "The animation quality and humor are incredible." },
            { name: "Hazbin Hotel / Helluva Boss", note: "A24 picked it up for a reason." },
            { name: "Gravity Falls", note: "Rewatched 3 times. Still finding hidden details." },
            { name: "American Psycho", note: "Let's see Paul Allen's card." },
            { name: "The Thing", note: "Peak practical effects horror." },
            { name: "Konosuba", note: "The perfect blend of comedy and fantasy." },
        ]
    },
    {
        icon: Music,
        title: "🎵 Music",
        color: "cyan-500",
        intro: "My playlists are all over the place — I love discovering new genres:",
        items: [
            { name: "Vocaloid", note: "Especially Hatsune Miku and DECO*27. Absolute bangers." },
            { name: "Video Game OSTs", note: "Undertale, Celeste, Zelda — great focus music." },
            { name: "Lo-fi / Chillhop", note: "The coding playlist staple." },
            { name: "J-Pop / City Pop", note: "Discovered through YouTube rabbit holes." },
        ]
    },
    {
        icon: Server,
        title: "🖥️ Homelab & Self-Hosting",
        color: "brand-primary",
        intro: "I run a small homelab because I enjoy tinkering and owning my data:",
        items: [
            { name: "Minecraft Servers", note: "Hosted Paper/Fabric servers since high school." },
            { name: "Plex / Jellyfin", note: "For legally obtained media, of course." },
            { name: "Home Assistant", note: "Smart home automations and dashboards." },
            { name: "Pi-hole + Unbound", note: "Network-wide ad blocking + recursive DNS." },
            { name: "Docker Everything", note: "If it can run in a container, it will." },
        ]
    },
    {
        icon: Wrench,
        title: "🔧 Hardware & Modding",
        color: "orange-500",
        intro: "I love taking things apart to understand how they work:",
        items: [
            { name: "Console Modding", note: "Softmodded my 3DS, Wii, and DSi." },
            { name: "PC Building", note: "Built my current rig and helped friends with theirs." },
            { name: "Retro Hardware", note: "Own a working GameCube, Wii, and DSi." },
        ]
    },
    {
        icon: Terminal,
        title: "🐧 Operating Systems",
        color: "green-500",
        intro: "I spend way too much time customizing my desktop environment:",
        items: [
            { name: "Fedora (Daily Driver)", note: "Stable, modern, and just works." },
            { name: "Kali Linux", note: "CTF challenges and security research." },
            { name: "macOS", note: "Great for development, not for gaming." },
        ]
    },
    {
        icon: BookOpen,
        title: "📚 Reading",
        color: "amber-500",
        intro: "I don't read as much as I'd like, but when I do:",
        items: [
            { name: "There Is No Antimemetics Division", note: "SCP Foundation horror at its finest." },
            { name: "The Laws of Human Nature", note: "Understanding what drives people." },
            { name: "Models", note: "Practical self-improvement." },
            { name: "Atomic Habits", note: "Small changes, big results." },
            { name: "The Power of Now", note: "Mindfulness and presence." },
        ]
    },
    {
        icon: Fish,
        title: "🎣 Offline Hobbies",
        color: "teal-500",
        intro: "Sometimes I do touch grass:",
        items: [
            { name: "Fishing", note: "Relaxing way to spend a morning." },
            { name: "Cooking", note: "Can make a mean pasta. Still learning the rest." },
            { name: "Plushie Collecting 🧸", note: "They make great desk companions." },
            { name: "Walking / Hiking", note: "Best way to clear my head after debugging." },
        ]
    },
];

export default function PersonalModules() {
    const colorClasses: Record<string, { border: string; text: string; bg: string; hover: string }> = {
        'brand-primary': { border: 'border-brand-primary/30', text: 'text-brand-primary', bg: 'bg-brand-primary/10', hover: 'hover:border-brand-primary/50' },
        'purple-500': { border: 'border-purple-500/30', text: 'text-purple-500', bg: 'bg-purple-500/10', hover: 'hover:border-purple-500/50' },
        'green-500': { border: 'border-green-500/30', text: 'text-green-500', bg: 'bg-green-500/10', hover: 'hover:border-green-500/50' },
        'blue-500': { border: 'border-blue-500/30', text: 'text-blue-500', bg: 'bg-blue-500/10', hover: 'hover:border-blue-500/50' },
        'rose-500': { border: 'border-rose-500/30', text: 'text-rose-500', bg: 'bg-rose-500/10', hover: 'hover:border-rose-500/50' },
        'cyan-500': { border: 'border-cyan-500/30', text: 'text-cyan-500', bg: 'bg-cyan-500/10', hover: 'hover:border-cyan-500/50' },
        'orange-500': { border: 'border-orange-500/30', text: 'text-orange-500', bg: 'bg-orange-500/10', hover: 'hover:border-orange-500/50' },
        'amber-500': { border: 'border-amber-500/30', text: 'text-amber-500', bg: 'bg-amber-500/10', hover: 'hover:border-amber-500/50' },
        'teal-500': { border: 'border-teal-500/30', text: 'text-teal-500', bg: 'bg-teal-500/10', hover: 'hover:border-teal-500/50' },
    };

    return (
        <section className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-gray-900">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Beyond the Code
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Work is a big part of my life, but it's not everything. Here's a peek at what I'm into when I'm not staring at a terminal — spoiler: it often still involves screens. 🎮
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {interests.map((category, idx) => {
                    const Icon = category.icon;
                    const colors = colorClasses[category.color] || colorClasses['brand-primary'];
                    
                    return (
                        <div 
                            key={idx} 
                            className={`bg-gray-900/50 border border-gray-800 ${colors.hover} rounded-2xl p-6 transition-all duration-300 hover:bg-gray-900/80 hover:shadow-lg`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 ${colors.text}`} />
                                </div>
                                <h3 className="font-bold text-white text-lg">{category.title}</h3>
                            </div>
                            
                            {category.intro && (
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                    {category.intro}
                                </p>
                            )}
                            
                            <ul className="space-y-2.5">
                                {category.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-3 group">
                                        <span className={`w-1.5 h-1.5 ${colors.bg} rounded-full mt-[7px] shrink-0 group-hover:scale-125 transition`}></span>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                                            {item.note && (
                                                <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.note}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-12 text-center">
                <p className="text-gray-600 text-sm italic">
                    Always happy to chat about any of these — especially if you have game recommendations! 🎯
                </p>
            </div>
        </section>
    );
}
