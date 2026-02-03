export interface PersonalItem {
    text: string;
    images?: string[];
}

export interface PersonalModule {
    title: string;
    items: PersonalItem[];
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
            { text: "Console Modding (3DS/Wii)", images: ["/images/projects/3ds-mod.png"] },
            { text: "PC Building" },
            { text: "Repair & Diagnostics" }
        ]
    },
    {
        title: "Linux & OS",
        items: [
            { text: "Distro Hopping (Fedora Daily Driver)" },
            { text: "System Hardening" },
            { text: "Rice/Customization", images: ["/images/projects/unixporn.png"] },
            { text: "Arch Linux Maintenance" }
        ]
    },
    {
        title: "Hobbies",
        items: [
            { text: "Fishing" },
            { text: "Strategy Games (Civilization/Stellaris)" },
            { text: "Cybersecurity Research" },
            { text: "Reading Sci-Fi" }
        ]
    }
];
