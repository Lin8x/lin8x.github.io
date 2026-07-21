import { sortProjectsByDateDesc } from '../utils/projectOrdering';
import type { TrackKey } from './tracks';

type ResumeTargetTrack = Exclude<TrackKey, 'all'>;

export interface ResumeProjectBullet {
  text: string;
  tracks: ResumeTargetTrack[];
}

export interface ResumeProject {
  title: string;
  date: string;
  tags: string[];
  tracks: ResumeTargetTrack[];
  bullets: ResumeProjectBullet[];
  featured: boolean;
  pinned?: boolean;
}

const bullet = (text: string, tracks: ResumeTargetTrack[]): ResumeProjectBullet => ({ text, tracks });

export const allProjects: ResumeProject[] = [
  {
    title: "Active Directory Domain Lab & Group Policy Administration",
    date: "July 2026 – Present",
    tags: ["Active Directory", "Windows Server", "Group Policy", "DNS", "Help Desk", "System Administration", "OU Design", "AGDLP"],
    tracks: ["it", "cloud", "software-engineer"],
    bullets: [
      bullet("Built and administered the `lab.danieljalali.com` Active Directory domain, domain-joined a Windows 10 Pro workstation, and configured the domain controller at `192.168.50.30` as the client DNS server", ["it", "cloud"]),
      bullet("Designed OU, role-group, tier-group, and AGDLP-based security structures to separate users, privileged accounts, devices, policy scopes, and resource access", ["it", "cloud"]),
      bullet("Configured tier-based Group Policy, DNS forwarding, workstation baselines, and troubleshooting workflows using `gpupdate`, `gpresult`, and `whoami` to validate policy application and group membership", ["it", "cloud", "software-engineer"]),
      bullet("Configured Windows DNS to resolve internal Active Directory records while forwarding external lookups upstream so domain clients could reach both domain resources and Internet destinations from one DNS path", ["it", "cloud"]),
      bullet("Linked user GPOs to common parent OUs and applied security filtering through Domain Local groups to control scope without overapplying policies", ["it", "cloud"]),
      bullet("Implemented differentiated user environments for admin, standard, restricted, and guest tiers, including workstation restrictions and NETLOGON-delivered wallpapers for visible policy validation", ["it"]),
      bullet("Built a workstation management model that separated user-policy behavior from computer baselines and reinforced the difference between user-side and computer-side Group Policy processing", ["it", "cloud"]),
    ],
    featured: true,
    pinned: true,
  },
  {
    title: "Homelab Hardware Upgrades & Network Setup",
    date: "May 2026 – Present",
    tags: ["pfSense", "Proxmox", "Hardware Upgrades", "SSD", "RAM", "VLANs", "NAS", "Wi-Fi"],
    tracks: ["cloud", "dataengineer", "software-engineer", "it"],
    bullets: [
      bullet("Designed and administered a pfSense-managed network with VLAN segmentation for backup, compute, storage, services, and wireless clients to improve security boundaries and supportability", ["it", "cloud"]),
      bullet("Centralized routing, DHCP, DNS, VPN, and firewall policy under pfSense to simplify troubleshooting, reduce configuration drift, and maintain a single managed network design", ["it", "cloud", "software-engineer"]),
      bullet("Extended whole-home wireless coverage with a TP-Link Archer BE550 and Deco mesh while preserving the existing routing, DNS, and access-control model", ["it", "cloud"]),
      bullet("Separated storage, backup, public-facing services, and client devices into distinct network zones to reduce unnecessary lateral access across the homelab", ["it", "cloud"]),
      bullet("Used a managed switch and VLAN-aware topology to distribute connectivity across Proxmox, NAS, backup, service, and wireless infrastructure", ["it", "cloud"]),
      bullet("Maintained a single authoritative network core instead of relying on consumer router defaults, making the environment easier to support and reason about", ["it", "cloud"]),
      bullet("Practiced infrastructure troubleshooting across DNS, firewall rules, segmentation, and wireless behavior in a live environment used for hosting, storage, and testing", ["it", "cloud", "software-engineer"]),
    ],
    featured: true,
    pinned: true,
  },
  {
    title: "Multiplayer Hybrid Homelab & AWS Edge Gateway",
    date: "2023 - Present",
    tags: ["AWS", "EC2", "Ubuntu", "Proxmox", "Docker", "Python", "Cloudflare", "Networking"],
    tracks: ["cloud", "software-engineer", "it"],
    bullets: [
      bullet("Designed and supported a hybrid hosting platform for a multiplayer service with 112 concurrent users using an Ubuntu VM in Proxmox behind an AWS EC2 edge gateway", ["cloud", "software-engineer", "it"]),
      bullet("Secured remote administration and origin access with Twingate, Cloudflare DNS, AWS Security Groups, key-only SSH, and fail2ban to reduce direct exposure of the home-lab environment", ["cloud", "it", "software-engineer"]),
      bullet("Automated maintenance, dependency updates, backups, and uptime checks with systemd timers, Python tooling, Proxmox backups, and Uptime Kuma", ["cloud", "software-engineer", "it"]),
      bullet("Used AWS EC2 as a public ingress layer while keeping the origin workload in the homelab, reducing direct exposure of the backend service", ["cloud", "it"]),
      bullet("Configured DNS and endpoint routing so clients reached a stable edge address instead of the origin host directly", ["cloud", "it", "software-engineer"]),
      bullet("Applied defense-in-depth across cloud, host, and origin layers through Security Groups, SSH hardening, local firewalling, and controlled tunnel access", ["cloud", "it"]),
      bullet("Supported reliability for a real user-facing service through scheduled restarts, backup discipline, monitoring, and dependency lifecycle automation", ["cloud", "software-engineer", "it"]),
    ],
    featured: true,
    pinned: true,
  },
  {
    title: "Automatic Patreon Integration",
    date: "July 2024 – Aug 2024",
    tags: ["AWS", "EC2", "Node.js", "MySQL", "OAuth 2.0", "JavaScript", "GitHub Actions"],
    tracks: ["cloud", "software-engineer", "it"],
    bullets: [
      bullet("Built and deployed an AWS-hosted Node.js integration for Patreon tier syncing with OAuth 2.0 authentication and MySQL-backed account data", ["cloud", "software-engineer"]),
      bullet("Automated user-access updates to reduce manual account administration and keep entitlement changes synchronized in near real time", ["software-engineer", "it", "cloud"]),
      bullet("Supported reliable API-driven account management for a live user environment through backend logic, persistence, and deployment workflows", ["software-engineer", "cloud", "it"]),
      bullet("Integrated the Patreon API and JSON responses to evaluate membership status and map account data into application workflows", ["software-engineer", "cloud"]),
      bullet("Implemented secure user login flows with OAuth 2.0 to support authenticated access and account linking", ["software-engineer", "cloud", "it"]),
      bullet("Published synchronized data into a public GitHub repository through GitHub Actions to support automated downstream use", ["software-engineer", "cloud"]),
      bullet("Added application-level data protection measures before publication to improve privacy handling for user-submitted information", ["software-engineer", "cloud"]),
    ],
    featured: true,
  },
  {
    title: "Vendor Data Analysis System",
    date: "Sept 2024 – Dec 2024",
    tags: ["Python", "Selenium", "MySQL", "API Integration", "ETL"],
    tracks: ["dataengineer", "software-engineer", "it"],
    bullets: [
      bullet("Built a Python-based data pipeline to collect, transform, and analyze vendor sales data from multiple sources", ["dataengineer", "software-engineer"]),
      bullet("Automated currency normalization and MySQL data handling to improve reporting consistency and reduce manual cleanup work", ["dataengineer", "software-engineer", "it"]),
      bullet("Supported repeatable ETL workflows for downstream reporting and decision-making with Selenium and API-integrated ingestion steps", ["dataengineer", "software-engineer"]),
      bullet("Reduced manual reporting effort by standardizing ingestion and transformation steps across varying input sources", ["dataengineer", "software-engineer", "it"]),
      bullet("Used Python automation to improve reliability and repeatability in vendor data collection and cleanup", ["dataengineer", "software-engineer"]),
      bullet("Structured transformed data for easier downstream analysis, reporting, and operational review", ["dataengineer", "software-engineer", "it"]),
      bullet("Combined scraping, database handling, and transformation logic into a practical end-to-end ETL workflow", ["dataengineer", "software-engineer"]),
    ],
    featured: true,
  },
  {
    title: "Developer Student Club - Game Dev Lead",
    date: "Oct 2021 – May 2024",
    tags: ["Unity", "C#", "Teaching", "Leadership", "YouTube"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Led Unity workshops and developed curriculum for 30+ students covering C# scripting, optimization, and game systems", ["gamedev", "software-engineer"]),
      bullet("Supported peer learning through hands-on technical guidance, demos, and classroom-style instruction", ["gamedev", "software-engineer"]),
      bullet("Recognized as Developer of the Month for leadership, teaching impact, and consistent community support", ["gamedev", "software-engineer"]),
      bullet("Prepared instructional content that translated technical development topics into approachable lessons for student audiences", ["gamedev", "software-engineer"]),
      bullet("Helped build a learning environment focused on mentorship, peer growth, and practical implementation", ["gamedev", "software-engineer"]),
      bullet("Presented game-development concepts in ways that supported both beginners and more advanced student contributors", ["gamedev", "software-engineer"]),
      bullet("Reinforced technical community engagement by sharing milestones and knowledge across multiple platforms", ["gamedev", "software-engineer"]),
    ],
    featured: true,
  },
  {
    title: "University Tech Club - Product Manager & Director",
    date: "Oct 2022 – Present",
    tags: ["Unity", "C#", "Project Management", "GitHub", "Trello", "Blender"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Directed cross-functional teams of 10 to 20 developers across multiple game releases and event showcases", ["gamedev", "software-engineer"]),
      bullet("Coordinated planning, communication, and delivery across design, engineering, and art contributors", ["gamedev", "software-engineer"]),
      bullet("Helped keep projects on schedule through structured team organization, tooling, and milestone tracking", ["gamedev", "software-engineer"]),
      bullet("Supported delivery under aggressive timelines by organizing work across multiple departments and contributor groups", ["gamedev", "software-engineer"]),
      bullet("Used team tooling such as Trello, GitHub, Unity, Blender, and Visual Studio to keep collaboration aligned", ["gamedev", "software-engineer"]),
      bullet("Played a visible role in preparing projects for major event showcases and public presentation", ["gamedev", "software-engineer"]),
      bullet("Balanced coordination, production, and technical communication in a mixed leadership and execution role", ["gamedev", "software-engineer"]),
    ],
    featured: true,
  },
  {
    title: "Itch.io Horror Game Jam - 2nd Place",
    date: "May 2022",
    tags: ["Unreal Engine 5", "Blueprint", "Horror", "Game Jam", "Itch.io"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Developed a first-person horror game in a two-week jam environment that earned 2nd place out of 57 developers", ["gamedev", "software-engineer"]),
      bullet("Collaborated with leadership and creative stakeholders to deliver a polished playable release under deadline", ["gamedev", "software-engineer"]),
      bullet("Balanced rapid iteration, technical implementation, and presentation quality in a compressed delivery cycle", ["gamedev", "software-engineer"]),
      bullet("Worked effectively within game jam constraints to ship a complete experience on a fixed deadline", ["gamedev", "software-engineer"]),
      bullet("Translated creative direction into working gameplay and presentation improvements during a short production window", ["gamedev", "software-engineer"]),
      bullet("Contributed to a competitive release that stood out among dozens of participating developers", ["gamedev", "software-engineer"]),
      bullet("Demonstrated strong execution under pressure in a team-based rapid-development environment", ["gamedev", "software-engineer"]),
    ],
    featured: true,
  },
  {
    title: "Networking Multiplayer FPS Prototype",
    date: "June 2022 – Sept 2022",
    tags: ["Unreal Engine 5", "Blueprint", "Networking", "Multiplayer", "UI/UX"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Built a multiplayer FPS prototype in Unreal Engine 5 with community server hosting, three game modes, and 32 configurable gameplay options", ["gamedev", "software-engineer"]),
      bullet("Implemented networked gameplay and UI systems to support repeatable testing and player-facing configuration", ["gamedev", "software-engineer"]),
      bullet("Explored multiplayer stability, customization, and session design in a real-time game environment", ["gamedev", "software-engineer"]),
      bullet("Developed gameplay systems intended for repeatable multiplayer sessions and hosted community play", ["gamedev", "software-engineer"]),
      bullet("Worked with Unreal networking concepts while balancing gameplay options, UX, and testing practicality", ["gamedev", "software-engineer"]),
      bullet("Designed configuration-heavy gameplay workflows to support different play styles and scenarios", ["gamedev", "software-engineer"]),
      bullet("Used the prototype to deepen experience with multiplayer systems, menus, and gameplay-state coordination", ["gamedev", "software-engineer"]),
    ],
    featured: true,
  },
  {
    title: "UdonSharp Data Structures Library",
    date: "June 2023 – Aug 2023",
    tags: ["C#", "Unity", "UdonSharp", "VRChat"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Developed a reusable data structures library for UdonSharp to address missing tooling in the VRChat development ecosystem", ["gamedev", "software-engineer"]),
      bullet("Improved maintainability for complex scripting workflows by standardizing core structures and usage patterns", ["gamedev", "software-engineer"]),
      bullet("Supported more scalable Unity and UdonSharp development for future projects through reusable code organization", ["gamedev", "software-engineer"]),
      bullet("Worked around limitations in UdonSharp where many traditional libraries and APIs were unavailable", ["gamedev", "software-engineer"]),
      bullet("Expanded the available tooling for developers building more complex VRChat scripting systems", ["gamedev", "software-engineer"]),
      bullet("Addressed reported bugs and stability issues to improve reliability for real community usage", ["gamedev", "software-engineer"]),
      bullet("Turned a repeated development pain point into a reusable utility layer for future VRChat projects", ["gamedev", "software-engineer"]),
    ],
    featured: true,
  },
  {
    title: "Android Calculator App",
    date: "Sept 2021 – Oct 2021",
    tags: ["Kotlin", "Android Studio", "Google Play Console", "Mobile Development"],
    tracks: ["software-engineer"],
    bullets: [
      bullet("Built and published an Android calculator application in Kotlin with custom calculation logic and iterative feature refinement", ["software-engineer"]),
      bullet("Translated user needs into app behavior and interface improvements through repeated testing and adjustments", ["software-engineer"]),
      bullet("Delivered a complete mobile release through Android Studio and Google Play Console workflows", ["software-engineer"]),
      bullet("Implemented core calculation behavior and app flow as a complete end-to-end mobile project", ["software-engineer"]),
      bullet("Used iterative development to improve usability and feature behavior before release", ["software-engineer"]),
      bullet("Practiced packaging, release management, and publishing steps for a production mobile app", ["software-engineer"]),
      bullet("Strengthened early experience with Kotlin, Android UI behavior, and app deployment workflows", ["software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "Business Emailing Program",
    date: "Oct 2019 – Dec 2019",
    tags: ["Python", "tkinter", "smtplib", "GitHub", "Fernet Encryption"],
    tracks: ["software-engineer"],
    bullets: [
      bullet("Co-developed a Python desktop emailing tool with a GUI to speed file-based business communication workflows", ["software-engineer"]),
      bullet("Integrated SMTP-based delivery and encryption support for more secure usage", ["software-engineer"]),
      bullet("Contributed to a team-built utility focused on practical office productivity", ["software-engineer"]),
      bullet("Helped design a desktop workflow that made repeated email and file-sending tasks easier to complete", ["software-engineer"]),
      bullet("Worked on a GUI-driven tool that combined desktop usability with back-end message delivery logic", ["software-engineer"]),
      bullet("Applied encryption concepts to improve handling of sensitive communication workflows", ["software-engineer"]),
      bullet("Built experience shipping practical software aimed at everyday business use cases", ["software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "Linux Packaging Utility",
    date: "Oct 2019 – Nov 2019",
    tags: ["Linux", "Debian", "Python", "GitHub", "CLI"],
    tracks: ["software-engineer"],
    bullets: [
      bullet("Built a terminal-based Python utility to simplify Linux desktop application setup and Debian package creation", ["software-engineer"]),
      bullet("Reduced manual packaging steps through a more guided workflow", ["software-engineer"]),
      bullet("Supported faster experimentation with Linux software distribution tasks", ["software-engineer"]),
      bullet("Automated parts of the packaging workflow that would otherwise require repetitive manual setup", ["software-engineer"]),
      bullet("Focused on improving developer ergonomics for Linux application preparation and release tasks", ["software-engineer"]),
      bullet("Used CLI-first design to streamline repeatable tooling operations", ["software-engineer"]),
      bullet("Strengthened familiarity with Linux packaging concepts and Debian-oriented distribution workflows", ["software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "Math Master - Educational Game",
    date: "March 2023 – July 2023",
    tags: ["Unity", "C#", "Visual Studio", "GitHub", "Game Design"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Co-developed an educational Unity game for students in grades 4 through 8 with escalating difficulty and a distinct visual style", ["gamedev", "software-engineer"]),
      bullet("Implemented gameplay systems that balanced engagement with learning progression", ["gamedev", "software-engineer"]),
      bullet("Contributed to a team-delivered classroom-friendly experience from concept through playable completion", ["gamedev", "software-engineer"]),
      bullet("Helped translate educational goals into interactive gameplay suitable for younger student audiences", ["gamedev", "software-engineer"]),
      bullet("Balanced presentation, pacing, and systems design to make the project both usable and engaging", ["gamedev", "software-engineer"]),
      bullet("Worked in a team setting to ship a polished learning-focused experience", ["gamedev", "software-engineer"]),
      bullet("Used Unity and C# to support a game project with both design and educational requirements", ["gamedev", "software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "Mobile FPS Game Prototype",
    date: "Oct 2021 – Dec 2021",
    tags: ["Unity", "C#", "Visual Studio", "Mobile Development"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Built a Unity mobile FPS prototype featuring object interaction, inventory systems, enemy AI, and rendering experiments", ["gamedev", "software-engineer"]),
      bullet("Explored gameplay performance and usability on mobile hardware", ["gamedev", "software-engineer"]),
      bullet("Used the project to strengthen rapid prototyping and gameplay systems integration skills", ["gamedev", "software-engineer"]),
      bullet("Implemented multiple interconnected gameplay systems within a mobile-focused prototype environment", ["gamedev", "software-engineer"]),
      bullet("Tested how FPS mechanics, AI, and inventory behavior translated onto mobile devices", ["gamedev", "software-engineer"]),
      bullet("Used the project to build fluency in Unity iteration, testing, and systems-level debugging", ["gamedev", "software-engineer"]),
      bullet("Combined gameplay experimentation with rendering and UX exploration for mobile play", ["gamedev", "software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "Story-Focused FPS Horror Game",
    date: "March 2022 – April 2022",
    tags: ["Unreal Engine 4", "Blueprint", "Game Direction", "Team Leadership"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Directed a story-focused FPS horror project across developers, audio engineers, and artists", ["gamedev", "software-engineer"]),
      bullet("Built 40+ Unreal Engine blueprint systems to support gameplay and progression", ["gamedev", "software-engineer"]),
      bullet("Coordinated creative and technical work across multiple contributors under tight timelines", ["gamedev", "software-engineer"]),
      bullet("Combined project leadership with hands-on implementation in Unreal Engine 4", ["gamedev", "software-engineer"]),
      bullet("Structured development work across multiple disciplines to keep production aligned with the creative vision", ["gamedev", "software-engineer"]),
      bullet("Used blueprint-heavy development to implement gameplay logic quickly without sacrificing project scope", ["gamedev", "software-engineer"]),
      bullet("Managed a team-oriented game project where communication and technical execution both mattered", ["gamedev", "software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "University Tech Club - Full-Stack Member",
    date: "March 2022 – Present",
    tags: ["Unity", "C#", "Android", "Hardware", "Teamwork", "GitHub"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Contributed to team projects spanning software, game development, Android, and hardware-focused work", ["gamedev", "software-engineer"]),
      bullet("Collaborated across disciplines to support delivery of technical projects", ["gamedev", "software-engineer"]),
      bullet("Adapted to different tools, workflows, and technical problem spaces across multiple project types", ["gamedev", "software-engineer"]),
      bullet("Participated in workshop-driven and team-oriented technical projects with varied scopes", ["gamedev", "software-engineer"]),
      bullet("Built flexibility by moving between software, gameplay, mobile, and hands-on hardware tasks", ["gamedev", "software-engineer"]),
      bullet("Supported a collaborative environment where technical contributions were spread across several domains", ["gamedev", "software-engineer"]),
      bullet("Strengthened cross-functional teamwork habits through repeated multi-project involvement", ["gamedev", "software-engineer"]),
    ],
    featured: false,
  },
  {
    title: "5-Day Competitive Game Jam",
    date: "May 2022",
    tags: ["Unity", "C#", "Visual Studio", "Photoshop", "Audacity", "Audio Design"],
    tracks: ["gamedev", "software-engineer"],
    bullets: [
      bullet("Served as front-end developer and audio designer for a five-day game jam project", ["gamedev", "software-engineer"]),
      bullet("Created the full UI and seven audio tracks under a compressed delivery timeline", ["gamedev", "software-engineer"]),
      bullet("Supported a fast-moving team workflow from concept through playable completion", ["gamedev", "software-engineer"]),
      bullet("Balanced visual, UX, and audio responsibilities in a short-form production cycle", ["gamedev", "software-engineer"]),
      bullet("Delivered complete front-end presentation work under heavy time constraints", ["gamedev", "software-engineer"]),
      bullet("Contributed across multiple creative and technical disciplines to help the team finish on time", ["gamedev", "software-engineer"]),
      bullet("Demonstrated versatility by combining implementation work with original audio production", ["gamedev", "software-engineer"]),
    ],
    featured: false,
  },
];

export function getProjectsForTrack(track: string): ResumeProject[] {
  const filteredProjects = allProjects
    .filter((project) => project.tracks.includes(track as ResumeTargetTrack))
    .map((project) => ({
      ...project,
      bullets: project.bullets.filter((item) => item.tracks.includes(track as ResumeTargetTrack)),
    }))
    .filter((project) => project.bullets.length > 0);

  return sortProjectsByDateDesc(filteredProjects);
}
