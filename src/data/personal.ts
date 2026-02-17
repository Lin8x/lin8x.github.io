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
};

// ============================================
// ANONYMIZED WORK EXPERIENCE
// Note: Company names, organizations, locations, and schools are HIDDEN
// Only dates and role descriptions are shown
// ============================================
export interface WorkExperience {
    title: string;           // Job title
    type: string;            // "internship" | "full-time" | "part-time" | "leadership" | "volunteer"
    startDate: string;       // e.g., "August 2022"
    endDate: string;         // e.g., "September 2024" or "Present"
    bullets: string[];       // Achievement bullet points (anonymized)
    tracks: string[];        // Which career tracks this applies to
}

export const workExperience: WorkExperience[] = [
    {
        title: "Student Senior Robotic Lab Assistant",
        type: "part-time",
        startDate: "August 2022",
        endDate: "September 2024",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            "One of only two Unity developers entrusted with the creation of advanced AR and VR applications for architectural analysis and environmental data capture.",
            "Conducted research on complex APIs including the Lightship AR Development Kit and VPS.",
            "Deployed applications for iOS, Android, and HoloLens VR platforms.",
            "Partnered across departments contributing to management, architectural design, and modeling efforts.",
            "Pioneered AR application development using Lightship — the technology behind Pokémon Go.",
            "Crafted an application offering colorblind effects in VR, optimized for wearable glasses."
        ]
    },
    {
        title: "Data Science Intern",
        type: "internship",
        startDate: "May 2024",
        endDate: "May 2024",
        tracks: ["dataengineer", "software-engineer"],
        bullets: [
            "Conducted data analysis using Python with Seaborn and Matplotlib for advanced visualization.",
            "Developed prediction models to generate insightful reports for data-driven decisions.",
            "Leveraged Power BI to create interactive dashboards for stakeholder communication.",
            "Implemented version control using Azure DevOps and Git.",
            "Collaborated with a team of 5 interns on a successful project outcome.",
            "Presented final outcomes to senior leadership including the CIO."
        ]
    },
    {
        title: "Software Engineering Intern",
        type: "internship",
        startDate: "March 2024",
        endDate: "April 2024",
        tracks: ["software-engineer", "cloud"],
        bullets: [
            "Managed MySQL database for efficient data storage and retrieval.",
            "Created internal automation software using Python, JavaScript, and C#.",
            "Collaborated on tools helping a 10-person team manage communities of over 700 people."
        ]
    },
    {
        title: "Lead UdonSharp Developer",
        type: "full-time",
        startDate: "May 2023",
        endDate: "August 2023",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            "Collaborated with a 9-member team to design a VR world hosting over 100 attendees.",
            "Developed 12 Unity tools including passcode doors, control panels, and light management systems.",
            "Leveraged Unity, GitHub, Blender, and Visual Studio for development and integration."
        ]
    },
    {
        title: "Product Manager & Director",
        type: "leadership",
        startDate: "October 2022",
        endDate: "Present",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            "One of three key product managers guiding a team of 20 to release a game within 2 months.",
            "Played a pivotal role in development for a major tech event.",
            "Coordinated meetings using Trello across three departments.",
            "Integrated core tools including Unity, GitHub, Blender, and Visual Studio 2019."
        ]
    },
    {
        title: "Product Manager",
        type: "leadership",
        startDate: "October 2022",
        endDate: "Present",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            "Led a team of 10 driving game development within a 2-month timeframe.",
            "Instituted Trello across departments for streamlined workflows.",
            "Managed essential development tools including Unity, GitHub, and Blender."
        ]
    },
    {
        title: "Sales & Technology Associate",
        type: "part-time",
        startDate: "March 2022",
        endDate: "August 2023",
        tracks: ["software-engineer"],
        bullets: [
            "Boosted repair sales by 60% through innovative storage backup recommendations.",
            "Enhanced employee retention through strategic introduction of a notebook system.",
            "Mastered company software platforms including Lightspeed and NetSuite."
        ]
    },
    {
        title: "Full-Stack Development Member",
        type: "part-time",
        startDate: "March 2022",
        endDate: "Present",
        tracks: ["software-engineer", "gamedev"],
        bullets: [
            "Engaged in projects spanning software, game development, Android platforms, and hardware.",
            "Received commendations from peers and leadership for game development contributions.",
            "Established connections with industry representatives from major tech companies."
        ]
    },
    {
        title: "Game Development Technology Leader",
        type: "leadership",
        startDate: "October 2021",
        endDate: "Present",
        tracks: ["gamedev"],
        bullets: [
            "Instructed classes on game development topics including optimization, animations, and scripting.",
            "Honored as 'Developer of the Month' for dedication and progress.",
            "Proactively shared milestones across YouTube, personal website, and LinkedIn."
        ]
    },
    {
        title: "Tutorial Graphic Designer",
        type: "part-time",
        startDate: "February 2022",
        endDate: "May 2022",
        tracks: ["gamedev", "software-engineer"],
        bullets: [
            "Delivered high-quality designs in shorter timeframes, earning executive commendations.",
            "Collaborated directly with top-tier executives on organizational goals."
        ]
    },
    {
        title: "Cybersecurity Club Founder & President",
        type: "leadership",
        startDate: "August 2018",
        endDate: "August 2021",
        tracks: ["software-engineer", "cloud"],
        bullets: [
            "Established a community where tech enthusiasts collaborate on cybersecurity skills.",
            "Secured funding by articulating mission to investors and corporate stakeholders.",
            "Earned accolades from educators and FBI agents for software-centric sessions."
        ]
    },
    {
        title: "Front End Developer & Graphic Designer",
        type: "part-time",
        startDate: "September 2018",
        endDate: "November 2019",
        tracks: ["software-engineer"],
        bullets: [
            "Introduced Python tkinter library resources to streamline application development.",
            "Recognized for graphic design contributions including logos and interfaces.",
            "Coordinated projects through Discord, WhatsApp, and in-person meetups."
        ]
    }
];

// Helper: Get work experience for a specific track
export function getExperienceForTrack(track: string): WorkExperience[] {
    return workExperience
        .filter(exp => exp.tracks.includes(track))
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
