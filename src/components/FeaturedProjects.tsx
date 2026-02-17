import { Cloud, ExternalLink } from 'lucide-react';

interface FeaturedProject {
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
}

const featuredProjects: FeaturedProject[] = [
    {
        title: "Hybrid Homelab + AWS Edge Gateway",
        description: "Hybrid hosting platform combining home lab compute with AWS edge ingress. Supported 112 concurrent users.",
        image: "/images/projects/minecraft.jpeg",
        tags: ["AWS", "EC2", "Docker", "Proxmox"],
        slug: "minecraft-hybrid-cloud"
    },
    {
        title: "Self-Hosted Homelab Infrastructure",
        description: "Production-grade virtualization server hosting PostgreSQL, MySQL, and Jupyter environments.",
        image: "/images/projects/homelab.png",
        tags: ["Docker", "PostgreSQL", "Grafana", "Ubuntu"],
        slug: "self-hosted-lab"
    },
    {
        title: "Automatic Patreon Integration",
        description: "AWS-hosted Node.js app with OAuth 2.0 for real-time user tier management.",
        image: "/images/projects/patreon-front-page.png",
        tags: ["AWS", "Node.js", "OAuth 2.0", "MySQL"],
        slug: "patreon-integration"
    },
];

export default function FeaturedProjects() {
    return (
        <section className="min-h-[60vh] w-full flex flex-col justify-center items-center max-w-6xl border-t border-gray-900 py-24 animate-fade-in-up">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                        <Cloud className="w-5 h-5 text-brand-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Featured Projects
                    </h2>
                </div>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Highlights from my Cloud Engineering work
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {featuredProjects.map((project, idx) => (
                    <a 
                        key={idx}
                        href={`/cloud?project=${project.slug}`}
                        className="group bg-gray-900/50 border border-gray-800 hover:border-brand-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
                    >
                        {/* Thumbnail */}
                        <div className="relative h-40 bg-gray-800 overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                onError={(e) => {
                                    // Fallback if image doesn't exist
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                                    const fallback = document.createElement('div');
                                    fallback.innerHTML = '<span class="text-4xl">☁️</span>';
                                    target.parentElement!.appendChild(fallback);
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-brand-primary transition line-clamp-1">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                {project.description}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.slice(0, 3).map((tag, tagIdx) => (
                                    <span 
                                        key={tagIdx}
                                        className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-2 py-0.5 text-gray-500 text-xs">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            
            {/* See More Link */}
            <div className="mt-10">
                <a 
                    href="/cloud"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-black font-bold rounded-xl hover:bg-brand-primary/90 transition-all duration-300 group"
                >
                    <span>See All Cloud Projects</span>
                    <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </a>
            </div>
        </section>
    );
}
