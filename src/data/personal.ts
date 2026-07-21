import type { TrackKey } from './tracks';

export interface PersonalItem {
    text: string;
    images?: string[];
}

export interface PersonalModule {
    title: string;
    items: PersonalItem[];
}

// ============================================
// PERSONAL INFORMATION - UPDATE YOUR INFO HERE
// ============================================
// Contact & Social Info for Resume
export const contactInfo = {
    name: "Daniel Jalali",
    email: "lin8x.github@gmail.com",        // TODO: Update with your real email
    linkedin: "linkedin.com/in/danieljalali", // TODO: Update with real LinkedIn URL
    github: "github.com/lin8x",   // TODO: Update with real GitHub URL
    website: "danieljalali.com",         // Your portfolio website
    location: "Florida, USA",            // General region only (anonymized)
};

// ============================================
// PROFESSIONAL SUMMARIES (per career track)
// ============================================
export const professionalSummaries: Record<string, string> = {
    'cloud': "Cloud Engineer with hands-on experience designing and operating hybrid infrastructure, AWS services, and self-hosted platforms. Proven track record building secure, scalable systems with a focus on observability, automation, and reliability engineering.",
    'dataengineer': "Data Engineer skilled in building ETL pipelines, data warehousing, and analytics infrastructure. Experience with Python, SQL databases, and data visualization tools. Passionate about transforming raw data into actionable insights.",
    'gamedev': "Game Developer with extensive Unity and Unreal Engine experience. Led teams of 10-20 developers through multiple game releases and game jams. Strong background in C#, Blueprint scripting, and cross-functional project management.",
    'software-engineer': "Software Engineer with diverse experience across cloud infrastructure, data engineering, and game development. Skilled in Python, C#, and modern DevOps practices. Passionate about building robust, user-focused applications.",
    'it': "IT Specialist with hands-on experience in systems administration, infrastructure support, and technical operations. Skilled at improving reliability, maintaining secure environments, and resolving complex platform issues across cloud and on-prem setups.",
};

// ============================================
// ANONYMIZED WORK EXPERIENCE
// Note: Company names, organizations, locations, and schools are HIDDEN
// Only dates and role descriptions are shown
// ============================================
export interface WorkExperience {
    title: string;           // Job title
    organizationType?: string; // Anonymized org context (e.g., Startup, Public Sector, University Lab)
    type: string;            // "internship" | "full-time" | "part-time" | "leadership" | "volunteer"
    startDate: string;       // e.g., "August 2022"
    endDate: string;         // e.g., "September 2024" or "Present"
    bullets: WorkExperienceBullet[]; // Achievement bullet points with target tracks
    tracks: ResumeTargetTrack[];     // Which career tracks this applies to
}

export type ResumeTargetTrack = Exclude<TrackKey, 'all'>;

export interface WorkExperienceBullet {
    text: string;
    tracks: ResumeTargetTrack[];
}

export interface ResumeWorkExperience extends Omit<WorkExperience, 'bullets'> {
    bullets: string[];
}

const wb = (text: string, tracks: ResumeTargetTrack[]): WorkExperienceBullet => ({ text, tracks });

export const workExperience: WorkExperience[] = [
    {
        title: "Student Senior Robotic Lab Assistant",
        organizationType: "University Research Lab",
        type: "part-time",
        startDate: "August 2022",
        endDate: "Present",
        tracks: ["gamedev", "software-engineer", "it"],
        bullets: [
            wb("One of only two Unity developers entrusted with the creation of advanced AR and VR applications for architectural analysis and environmental data capture.", ["gamedev", "software-engineer"]),
            wb("Conducted research on complex APIs including the Lightship AR Development Kit and VPS.", ["gamedev", "software-engineer", "it"]),
            wb("Deployed applications for iOS, Android, and HoloLens VR platforms.", ["gamedev", "software-engineer", "it"]),
            wb("Partnered across departments contributing to management, architectural design, and modeling efforts.", ["gamedev", "software-engineer", "it"]),
            wb("Pioneered AR application development using Lightship — the technology behind Pokémon Go.", ["gamedev", "software-engineer"]),
            wb("Crafted an application offering colorblind effects in VR, optimized for wearable glasses.", ["gamedev", "software-engineer"]),
            wb("Supported cross-functional technical work spanning software delivery, platform deployment, and applied research.", ["software-engineer", "it"]),
            wb("Built experience troubleshooting platform behavior across multiple target devices and deployment environments.", ["software-engineer", "it", "gamedev"])
        ]
    },
    {
        title: "Data Science Intern",
        organizationType: "Enterprise Internship Program",
        type: "internship",
        startDate: "May 2024",
        endDate: "May 2024",
        tracks: ["dataengineer", "software-engineer", "it"],
        bullets: [
            wb("Conducted data analysis using Python with Seaborn and Matplotlib for advanced visualization.", ["dataengineer", "software-engineer"]),
            wb("Developed prediction models to generate insightful reports for data-driven decisions.", ["dataengineer", "software-engineer"]),
            wb("Leveraged Power BI to create interactive dashboards for stakeholder communication.", ["dataengineer", "it"]),
            wb("Implemented version control using Azure DevOps and Git.", ["dataengineer", "software-engineer", "it"]),
            wb("Collaborated with a team of 5 interns on a successful project outcome.", ["dataengineer", "software-engineer", "it"]),
            wb("Presented final outcomes to senior leadership including the CIO.", ["dataengineer", "software-engineer", "it"]),
            wb("Used real-world public-sector data to support reporting and decision-making workflows.", ["dataengineer", "it"]),
            wb("Strengthened communication skills by translating technical findings into stakeholder-facing outputs and presentations.", ["dataengineer", "software-engineer", "it"])
        ]
    },
    {
        title: "Software Engineering Intern",
        organizationType: "Private Software Company",
        type: "internship",
        startDate: "March 2024",
        endDate: "April 2024",
        tracks: ["software-engineer", "cloud", "it"],
        bullets: [
            wb("Managed MySQL database for efficient data storage and retrieval.", ["software-engineer", "cloud"]),
            wb("Created internal automation software using Python, JavaScript, and C#.", ["software-engineer", "cloud"]),
            wb("Collaborated on tools helping a 10-person team manage communities of over 700 people.", ["software-engineer", "it"]),
            wb("Handled more than 300 customer service requests and communicated directly with customers to provide technical support and issue resolution.", ["it"]),
            wb("Supported internal operations by building tooling that reduced repetitive work for developers and staff.", ["software-engineer", "it"]),
            wb("Balanced technical implementation work with customer-facing issue handling in a fast-moving small-company environment.", ["it", "software-engineer"]),
            wb("Worked across database, automation, and support responsibilities during a short internship engagement.", ["software-engineer", "cloud", "it"])
        ]
    },
    {
        title: "Lead UdonSharp Developer",
        organizationType: "Independent VR Studio",
        type: "full-time",
        startDate: "May 2023",
        endDate: "August 2023",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            wb("Collaborated with a 9-member team to design a VR world hosting over 100 attendees.", ["gamedev", "software-engineer"]),
            wb("Developed 12 Unity tools including passcode doors, control panels, and light management systems.", ["gamedev", "software-engineer"]),
            wb("Leveraged Unity, GitHub, Blender, and Visual Studio for development and integration.", ["gamedev", "software-engineer"]),
            wb("Built reusable interaction systems that supported event functionality and user experience inside a live VR environment.", ["gamedev", "software-engineer"]),
            wb("Worked in a collaborative production setting where technical features needed to align with event and community requirements.", ["gamedev", "software-engineer"]),
            wb("Contributed to a complex interactive environment through both systems development and team coordination.", ["gamedev", "software-engineer"])
        ]
    },
    {
        title: "Product Manager & Director",
        organizationType: "Student-Led Engineering Organization",
        type: "leadership",
        startDate: "October 2022",
        endDate: "Present",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            wb("One of three key product managers guiding a team of 20 to release a game within 2 months.", ["gamedev", "software-engineer"]),
            wb("Played a pivotal role in development for a major tech event.", ["gamedev", "software-engineer"]),
            wb("Coordinated meetings using Trello across three departments.", ["gamedev", "software-engineer"]),
            wb("Integrated core tools including Unity, GitHub, Blender, and Visual Studio 2019.", ["gamedev", "software-engineer"]),
            wb("Contributed across multiple technical initiatives spanning software, game development, and hands-on team support.", ["gamedev", "software-engineer"]),
            wb("Built flexibility in collaborative, community-driven development work by supporting varied project needs beyond a single discipline.", ["gamedev", "software-engineer"]),
            wb("Helped maintain project alignment across multiple contributors, deliverables, and stakeholder expectations.", ["gamedev", "software-engineer"]),
            wb("Supported structured communication between departments to keep production on track under a compressed timeline.", ["gamedev", "software-engineer"]),
            wb("Blended planning, coordination, and technical familiarity in a leadership-oriented delivery role.", ["gamedev", "software-engineer"])
        ]
    },
    {
        title: "Product Manager",
        organizationType: "Student-Led Engineering Organization",
        type: "leadership",
        startDate: "October 2022",
        endDate: "Present",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            wb("Led a team of 10 driving game development within a 2-month timeframe.", ["gamedev", "software-engineer"]),
            wb("Instituted Trello across departments for streamlined workflows.", ["gamedev", "software-engineer"]),
            wb("Managed essential development tools including Unity, GitHub, and Blender.", ["gamedev", "software-engineer"]),
            wb("Created workflow structure that improved coordination across design and implementation work.", ["gamedev", "software-engineer"]),
            wb("Supported timely release planning through task organization, tool adoption, and team communication.", ["gamedev", "software-engineer"]),
            wb("Built leadership experience by keeping a multi-person technical effort focused and moving forward.", ["gamedev", "software-engineer"])
        ]
    },
    {
        title: "Sales & Technology Associate",
        organizationType: "Consumer Electronics Retail",
        type: "part-time",
        startDate: "March 2022",
        endDate: "August 2023",
        tracks: ["software-engineer", "it"],
        bullets: [
            wb("Boosted repair sales by 60% through innovative storage backup recommendations.", ["it", "software-engineer"]),
            wb("Enhanced employee retention through strategic introduction of a notebook system.", ["it"]),
            wb("Mastered company software platforms including Lightspeed and NetSuite.", ["it", "software-engineer"]),
            wb("Provided customer-facing technology guidance in a fast-paced retail support environment.", ["it"]),
            wb("Helped customers make practical decisions around backup, device handling, and service options.", ["it"]),
            wb("Adapted quickly to store systems and operational workflows while maintaining strong service quality.", ["it", "software-engineer"]),
            wb("Built early hands-on support experience through direct customer interaction and technology-focused recommendations.", ["it"])
        ]
    },
    {
        title: "Game Development Technology Leader",
        organizationType: "University Developer Community",
        type: "leadership",
        startDate: "October 2021",
        endDate: "Present",
        tracks: ["gamedev"],
        bullets: [
            wb("Instructed classes on game development topics including optimization, animations, and scripting.", ["gamedev"]),
            wb("Honored as 'Developer of the Month' for dedication and progress.", ["gamedev"]),
            wb("Proactively shared milestones across YouTube, personal website, and LinkedIn.", ["gamedev"]),
            wb("Supported peer development through mentorship and repeated knowledge-sharing.", ["gamedev"]),
            wb("Helped grow interest in game-development practices within a student technical community.", ["gamedev"]),
            wb("Built public-facing communication skills alongside technical instruction and peer support.", ["gamedev"])
        ]
    },
    {
        title: "Tutorial Graphic Designer",
        organizationType: "Creative Agency Environment",
        type: "part-time",
        startDate: "February 2022",
        endDate: "May 2022",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            wb("Delivered high-quality designs in shorter timeframes, earning executive commendations.", ["gamedev", "software-engineer"]),
            wb("Collaborated directly with top-tier executives on organizational goals.", ["gamedev", "software-engineer"]),
            wb("Earned additional collaboration opportunities through consistent delivery and strong work quality.", ["gamedev", "software-engineer"]),
            wb("Supported project direction by aligning visual work with team and leadership expectations.", ["gamedev", "software-engineer"]),
            wb("Worked effectively in a design role that required both speed and stakeholder responsiveness.", ["gamedev", "software-engineer"])
        ]
    },
    {
        title: "Cybersecurity Club Founder & President",
        organizationType: "Educational Nonprofit / Club",
        type: "leadership",
        startDate: "August 2018",
        endDate: "August 2021",
        tracks: ["software-engineer", "cloud", "it"],
        bullets: [
            wb("Established a community where tech enthusiasts collaborate on cybersecurity skills.", ["software-engineer", "cloud", "it"]),
            wb("Secured funding by articulating mission to investors and corporate stakeholders.", ["software-engineer", "cloud", "it"]),
            wb("Earned accolades from educators and FBI agents for software-centric sessions.", ["software-engineer", "cloud", "it"]),
            wb("Built the organizational foundation for the club through planning, leadership, and subject-matter coordination.", ["software-engineer", "cloud", "it"]),
            wb("Created a sustained technical learning environment around security and software-focused collaboration.", ["software-engineer", "cloud", "it"]),
            wb("Developed early leadership experience by organizing a technical community from the ground up.", ["software-engineer", "cloud", "it"])
        ]
    },
    {
        title: "Front End Developer & Graphic Designer",
        organizationType: "Creative Development Team",
        type: "part-time",
        startDate: "September 2018",
        endDate: "November 2019",
        tracks: ["software-engineer"],
        bullets: [
            wb("Introduced Python tkinter library resources to streamline application development.", ["software-engineer"]),
            wb("Recognized for graphic design contributions including logos and interfaces.", ["software-engineer"]),
            wb("Coordinated projects through Discord, WhatsApp, and in-person meetups.", ["software-engineer"]),
            wb("Supported team GUI and application-direction needs through both technical and design contributions.", ["software-engineer"]),
            wb("Improved project clarity by facilitating communication between executives and team members.", ["software-engineer"]),
            wb("Contributed to software projects involving messaging, password management, and interface design.", ["software-engineer"]),
            wb("Worked across both front-end and visual-design responsibilities in a small collaborative team.", ["software-engineer"])
        ]
    }
];

// Helper: Get work experience for a specific track
export function getExperienceForTrack(track: string): ResumeWorkExperience[] {
    return workExperience
        .filter(exp => exp.tracks.includes(track as ResumeTargetTrack))
        .map(exp => ({
            ...exp,
            bullets: exp.bullets
                .filter(bullet => bullet.tracks.includes(track as ResumeTargetTrack))
                .map(bullet => bullet.text),
        }))
        .filter(exp => exp.bullets.length >= 3)
        .sort((a, b) => {
            // Sort by end date (Present first, then most recent)
            if (a.endDate === 'Present' && b.endDate !== 'Present') return -1;
            if (b.endDate === 'Present' && a.endDate !== 'Present') return 1;
            // Parse dates for comparison
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateB.getTime() - dateA.getTime();
        });
}

export const personalModules: PersonalModule[] = [
    {
        title: "Self-Hosting & Labs",
        items: [
            { text: "Minecraft Server Management", images: ["/images/projects/minecraft-server.png"] },
            { text: "Media Servers (Plex/Jellyfin)" },
            { text: "Home Assistant" },
            { text: "Network-wide Ad Blocking" }
        ]
    },
    {
        title: "Hardware Enthusiast",
        items: [
            { text: "Console Modding (3DS/Wii/DSi)", images: ["/images/projects/3ds-mod.png"] },
            { text: "PC Building" },
            { text: "Repair & Diagnostics" },
            { text: "Retro Gaming (DS, Wii, GameCube, Xbox 360)" }
        ]
    },
    {
        title: "Operating Systems",
        items: [
            { text: "Distro Hopping (Fedora Daily Driver)" },
            { text: "Windows & macOS Power User" },
            { text: "Kali Linux (Security Research)" },
            { text: "Rice/Customization", images: ["/images/projects/unixporn.png"] },
            { text: "Arch Linux Maintenance" }
        ]
    },
    {
        title: "Gaming",
        items: [
            { text: "Minecraft" },
            { text: "Team Fortress 2" },
            { text: "Lethal Company" },
            { text: "Super Smash Bros Ultimate" },
            { text: "Legend of Zelda: Tears of the Kingdom" },
            { text: "Strategy Games (Civilization/Stellaris)" }
        ]
    },
    {
        title: "Favorites & Nostalgia",
        items: [
            { text: "Yoshi's Island" },
            { text: "Mario & Luigi: Bowser's Inside Story" },
            { text: "The Amazing Digital Circus" },
            { text: "Vocaloid (Hatsune Miku)" },
            { text: "Plushie Collector 🧸" }
        ]
    },
    {
        title: "Life Skills & Hobbies",
        items: [
            { text: "Basic Cooking" },
            { text: "Fishing" },
            { text: "Cybersecurity Research" },
            { text: "Reading Sci-Fi" }
        ]
    }
];
