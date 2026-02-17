// This file exports project data for client-side resume generation
// Data is derived from /src/content/projects/*.md

export interface ResumeProject {
  title: string;
  description: string;
  date: string;
  tags: string[];
  tracks: string[];
  featured: boolean;
}

export const allProjects: ResumeProject[] = [
  {
    title: "Self-Hosted Homelab & Data Infrastructure",
    description: "Rebuilt a Dell OptiPlex into a production-grade virtualization server hosting PostgreSQL, MySQL, and Jupyter environments, saving >$800 in Capex.",
    date: "May 2025 – Present",
    tags: ["Ubuntu Server", "Docker", "PostgreSQL", "MySQL", "Jupyter Lab", "Grafana", "Prometheus", "Tailscale"],
    tracks: ["cloud", "dataengineer", "software-engineer"],
    featured: true,
  },
  {
    title: "Hybrid Homelab + AWS Edge Gateway",
    description: "Designed and operated a hybrid hosting platform for a real-time multiplayer service, combining home lab compute with AWS edge ingress for security and reliability. Supported 112 concurrent users.",
    date: "2023 – Present",
    tags: ["AWS", "EC2", "Ubuntu", "Proxmox", "Docker", "Python", "Cloudflare", "Networking"],
    tracks: ["cloud", "software-engineer"],
    featured: true,
  },
  {
    title: "Automatic Patreon Integration",
    description: "AWS-hosted Node.js application integrating Patreon API with OAuth 2.0 for real-time user tier management and syncing.",
    date: "July 2024 – Aug 2024",
    tags: ["AWS", "EC2", "Node.js", "MySQL", "OAuth 2.0", "JavaScript", "GitHub Actions"],
    tracks: ["cloud", "software-engineer"],
    featured: true,
  },
  {
    title: "Vendor Data Analysis System",
    description: "Comprehensive data pipeline collecting, transforming, and analyzing vendor sales data with automated currency normalization.",
    date: "Sept 2024 – Dec 2024",
    tags: ["Python", "Selenium", "MySQL", "API Integration", "ETL"],
    tracks: ["dataengineer", "software-engineer"],
    featured: true,
  },
  {
    title: "Developer Student Club - Game Dev Lead",
    description: "Led interactive Unity workshops and designed curriculum for 30+ students, teaching C# backend concepts. Honored as Developer of the Month.",
    date: "Oct 2021 – May 2024",
    tags: ["Unity", "C#", "Teaching", "Leadership", "YouTube"],
    tracks: ["gamedev", "software-engineer"],
    featured: true,
  },
  {
    title: "University Tech Club - Product Manager & Director",
    description: "Directed teams of 10-20 developers across multiple game releases, showcased at major events. Managed cross-department coordination.",
    date: "Oct 2022 – Present",
    tags: ["Unity", "C#", "Project Management", "GitHub", "Trello", "Blender"],
    tracks: ["gamedev", "software-engineer"],
    featured: true,
  },
  {
    title: "Itch.io Horror Game Jam - 2nd Place",
    description: "Two-week horror game project that earned 2nd place among 57 developers. Partnered with industry executive to deliver polished first-person horror experience.",
    date: "May 2022",
    tags: ["Unreal Engine 5", "Blueprint", "Horror", "Game Jam", "Itch.io"],
    tracks: ["gamedev", "software-engineer"],
    featured: true,
  },
  {
    title: "Networking Multiplayer FPS Prototype",
    description: "Multiplayer FPS game with community server hosting, 3 game modes, and 32 customizable options built in Unreal Engine 5.",
    date: "June 2022 – Sept 2022",
    tags: ["Unreal Engine 5", "Blueprint", "Networking", "Multiplayer", "UI/UX"],
    tracks: ["gamedev", "software-engineer"],
    featured: true,
  },
  {
    title: "UdonSharp Data Structures Library",
    description: "Pioneering data structures library for UdonSharp, filling a significant tooling void within the VRChat development ecosystem.",
    date: "June 2023 – Aug 2023",
    tags: ["C#", "Unity", "UdonSharp", "VRChat"],
    tracks: ["gamedev", "software-engineer"],
    featured: true,
  },
  {
    title: "Android Calculator App",
    description: "Published Android calculator application built with Kotlin, featuring custom algorithm design and user-driven development.",
    date: "Sept 2021 – Oct 2021",
    tags: ["Kotlin", "Android Studio", "Google Play Console", "Mobile Development"],
    tracks: ["software-engineer"],
    featured: false,
  },
  {
    title: "Business Emailing Program",
    description: "Team-developed Python business emailing solution with GUI, enabling expedited file messaging for enterprise use.",
    date: "Oct 2019 – Dec 2019",
    tags: ["Python", "tkinter", "smtplib", "GitHub", "Fernet Encryption"],
    tracks: ["software-engineer"],
    featured: false,
  },
  {
    title: "Linux Packaging Utility",
    description: "Terminal-based Python tool for creating Linux desktop applications and Debian packages with simplified workflow.",
    date: "Oct 2019 – Nov 2019",
    tags: ["Linux", "Debian", "Python", "GitHub", "CLI"],
    tracks: ["software-engineer"],
    featured: false,
  },
  {
    title: "Math Master - Educational Game",
    description: "Team-developed educational Unity game for students grades 4-8 with escalating difficulty and unique vaporwave aesthetic.",
    date: "March 2023 – July 2023",
    tags: ["Unity", "C#", "Visual Studio", "GitHub", "Game Design"],
    tracks: ["gamedev", "software-engineer"],
    featured: false,
  },
  {
    title: "Mobile FPS Game Prototype",
    description: "Unity mobile game demo featuring object interaction, inventory systems, enemy AI, and rendering exploration.",
    date: "Oct 2021 – Dec 2021",
    tags: ["Unity", "C#", "Visual Studio", "Mobile Development"],
    tracks: ["gamedev", "software-engineer"],
    featured: false,
  },
  {
    title: "Story-Focused FPS Horror Game",
    description: "Directed a multi-team game project with developers, audio engineers, and artists. Built 40+ blueprint programs with complex algorithms.",
    date: "March 2022 – April 2022",
    tags: ["Unreal Engine 4", "Blueprint", "Game Direction", "Team Leadership"],
    tracks: ["gamedev", "software-engineer"],
    featured: false,
  },
  {
    title: "University Tech Club - Full-Stack Member",
    description: "Engaged in multifaceted team projects spanning software, game development, Android platforms, and hardware.",
    date: "March 2022 – Present",
    tags: ["Unity", "C#", "Android", "Hardware", "Teamwork", "GitHub"],
    tracks: ["gamedev", "software-engineer"],
    featured: false,
  },
  {
    title: "5-Day Competitive Game Jam",
    description: "Front-end developer and audio designer for a team game jam project, creating 7 audio tracks and complete UI design.",
    date: "May 2022",
    tags: ["Unity", "C#", "Visual Studio", "Photoshop", "Audacity", "Audio Design"],
    tracks: ["gamedev", "software-engineer"],
    featured: false,
  },
];

// Helper function to get projects for a specific track
export function getProjectsForTrack(track: string): ResumeProject[] {
  return allProjects
    .filter(project => project.tracks.includes(track))
    .sort((a, b) => {
      // Featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
}
