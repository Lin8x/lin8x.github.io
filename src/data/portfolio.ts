
export interface Skill {
    name: string;
    icon: string;
    tags: string[]; // Which tracks this skill appears on
}

export interface Certification {
    name: string;
    provider: string;
    image: string; // Path to logo/certificate image
    status: 'completed' | 'in-progress';
    url?: string;
    credentialId?: string; // Optional credential/certificate ID
    type: 'certification' | 'course';
    tags: string[]; // Which tracks this cert appears on (e.g., ['cloud', 'dataengineer'])
}

export interface Course {
    name: string;
    university?: string;
}

export interface Degree {
    title: string;
    institution: string;
    year: string;
    relevantCourses: string[]; // List of course names to display for this track
}

// ----------------------------------------------------------------------
// 1. SKILLS config (single source of truth with tags)
// ----------------------------------------------------------------------
export const allSkills: Skill[] = [
  // === CLOUD PLATFORMS ===
  { name: 'AWS', icon: '/images/logos/aws.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'Azure', icon: '/images/logos/azure.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  
  // === AZURE SERVICES ===
  { name: 'Azure SQL', icon: '/images/logos/azuresql.png', tags: ['cloud', 'dataengineer'] },
  { name: 'Azure CosmosDB', icon: '/images/logos/azurecosmosdb.png', tags: ['cloud', 'dataengineer'] },
  { name: 'Azure Files', icon: '/images/logos/azurefiles.png', tags: ['cloud', 'dataengineer'] },
  { name: 'Azure Blob Storage', icon: '/images/logos/azureblobstorage.png', tags: ['cloud', 'dataengineer'] },
  { name: 'Azure Synapse', icon: '/images/logos/azuresynapseanalytics.png', tags: ['dataengineer'] },
  { name: 'Databricks', icon: '/images/logos/azuredatabricks.png', tags: ['dataengineer'] },
  { name: 'Data Factory', icon: '/images/logos/azuredatafactory.webp', tags: ['dataengineer'] },
  { name: 'Azure Data Lake', icon: '/images/logos/azuredatalake.png', tags: ['dataengineer'] },
  
  // === DEVOPS & TOOLS ===
  { name: 'Docker', icon: '/images/logos/docker.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'Git', icon: '/images/logos/git.png', tags: ['cloud', 'dataengineer', 'gamedev', 'software-engineer'] },
  { name: 'Grafana', icon: '/images/logos/grafana.png', tags: ['cloud', 'dataengineer'] },
  
  // === LINUX / OS ===
  { name: 'Ubuntu', icon: '/images/logos/ubuntu.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'Fedora', icon: '/images/logos/fedora.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'Debian', icon: '/images/logos/debian.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'AWS Linux', icon: '/images/logos/aws-linux.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'Kali Linux', icon: '/images/logos/kali-linux.png', tags: ['software-engineer'] },
  { name: 'Windows Server', icon: '/images/logos/windows.png', tags: ['cloud', 'software-engineer'] },
  { name: 'macOS', icon: '/images/logos/macos.png', tags: ['gamedev', 'software-engineer'] },
  
  // === PROGRAMMING LANGUAGES ===
  { name: 'Python', icon: '/images/logos/python.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'C#', icon: '/images/logos/csharp.svg', tags: ['gamedev', 'software-engineer'] },
  { name: 'C++', icon: '/images/logos/cplusplus.png', tags: ['gamedev', 'software-engineer'] },
  
  // === DATABASES ===
  { name: 'MongoDB', icon: '/images/logos/mongodb.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'MySQL', icon: '/images/logos/mysql.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'PostgreSQL', icon: '/images/logos/postgresql.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  { name: 'SQL Server', icon: '/images/logos/sqlserver.png', tags: ['cloud', 'dataengineer', 'software-engineer'] },
  
  // === DATA SCIENCE / ML ===
  { name: 'Pandas', icon: '/images/logos/pandas.png', tags: ['dataengineer'] },
  { name: 'NumPy', icon: '/images/logos/numpy.svg', tags: ['dataengineer'] },
  { name: 'Apache Spark', icon: '/images/logos/apachespark.png', tags: ['dataengineer'] },
  { name: 'PowerBI', icon: '/images/logos/powerbi.png', tags: ['dataengineer'] },
  { name: 'Matplotlib', icon: '/images/logos/matplotlib.png', tags: ['dataengineer'] },
  { name: 'Seaborn', icon: '/images/logos/seaborn.svg', tags: ['dataengineer'] },
  { name: 'Plotly', icon: '/images/logos/plotly.png', tags: ['dataengineer'] },
  { name: 'Scikit-learn', icon: '/images/logos/skitlearn.png', tags: ['dataengineer'] },
  { name: 'PyTorch', icon: '/images/logos/pytorch.png', tags: ['dataengineer'] },
  
  // === GAME DEVELOPMENT ===
  { name: 'Unity', icon: '/images/logos/unity.png', tags: ['gamedev'] },
  { name: 'Unreal Engine', icon: '/images/logos/unrealengine.svg', tags: ['gamedev'] },
  { name: 'Blueprints', icon: '/images/logos/blueprints.png', tags: ['gamedev'] },
  { name: 'Lightship (ARDK)', icon: '/images/logos/lightship.jpeg', tags: ['gamedev'] },
  { name: 'Blender', icon: '/images/logos/blender.png', tags: ['gamedev'] },
  { name: 'MRTK', icon: '/images/logos/mrtk.png', tags: ['gamedev'] },
  { name: 'HoloLens', icon: '/images/logos/hololens.png', tags: ['gamedev'] },
  { name: 'Dotween', icon: '/images/logos/dotween.png', tags: ['gamedev'] },
  { name: 'VRCSDK', icon: '/images/logos/vrcsdk.png', tags: ['gamedev'] },
  { name: 'UdonSharp', icon: '/images/logos/udonsharp.png', tags: ['gamedev'] },
  
  // === MOBILE ===
  { name: 'Android', icon: '/images/logos/android.png', tags: ['gamedev', 'software-engineer'] },
  { name: 'iOS', icon: '/images/logos/ios.png', tags: ['gamedev'] },
  { name: 'Xcode', icon: '/images/logos/xcode.png', tags: ['gamedev'] },
  
  // === TESTING / AUTOMATION ===
  { name: 'Selenium', icon: '/images/logos/selenium.png', tags: ['software-engineer'] },
];

// Helper function to get skills for a specific track
export function getSkillsForTrack(track: string): Skill[] {
  return allSkills.filter(skill => skill.tags.includes(track));
}

// ----------------------------------------------------------------------
// 2. CERTIFICATIONS config (single source of truth with tags)
// ----------------------------------------------------------------------
export const allCertifications: Certification[] = [
  // === OFFICIAL CERTIFICATIONS ===
  { 
    name: 'AWS Certified AI Practitioner', 
    provider: 'Amazon Web Services', 
    image: '/images/certs/ai-practitioner.png', 
    status: 'completed', 
    type: 'certification', 
    url: 'https://www.credly.com/earner/earned/badge/c1e3afb5-38fb-4475-a0cf-b4dc49c0f761',
    credentialId: 'c1e3afb5-38fb-4475-a0cf-b4dc49c0f761',
    tags: ['cloud', 'dataengineer', 'software-engineer']
  },
  { 
    name: 'Azure Data Fundamentals', 
    provider: 'Microsoft', 
    image: '/images/certs/microsoft-certified-fundamentals-badge.png', 
    status: 'completed', 
    type: 'certification', 
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/DanielJalali-3160/8EC56E591D97D935?sharingId=317DD6E71A4EAF6',
    credentialId: '8EC56E591D97D935',
    tags: ['cloud', 'dataengineer', 'software-engineer']
  },
  { 
    name: 'Unity Certified User: Programmer', 
    provider: 'Unity Technologies', 
    image: '/images/certs/unity_cert.png', 
    status: 'completed', 
    type: 'certification', 
    credentialId: '25428506-16d7-4507-8cc2-95bc7d83b3a4',
    url: 'https://www.credly.com/earner/earned/badge/25428506-16d7-4507-8cc2-95bc7d83b3a4',
    tags: ['gamedev', 'cloud', 'dataengineer', 'software-engineer']
  },
  { 
    name: 'MTA: Windows Operating System Fundamentals', 
    provider: 'Microsoft', 
    image: '/images/certs/mta-windows.png', 
    status: 'completed', 
    type: 'certification',
    credentialId: '11b4058d-5168-45e1-9035-1f6c4146ad2a',
    url: 'https://www.credly.com/earner/earned/badge/11b4058d-5168-45e1-9035-1f6c4146ad2a',
    tags: ['cloud', 'software-engineer']
  },
  { 
    name: 'Microsoft Office Specialist: Word (Office 2016)', 
    provider: 'Microsoft', 
    image: '/images/certs/MOS_Word.png', 
    status: 'completed', 
    type: 'certification',
    credentialId: '2b0e12c7-56ff-422f-ae65-a0bfc29628a2',
    url: 'https://www.credly.com/earner/earned/badge/2b0e12c7-56ff-422f-ae65-a0bfc29628a2',
    tags: ['software-engineer']
  },

  // === COURSEWORK ===
  { 
    name: 'Mastering Visual Studio Code (2026)', 
    provider: 'Udemy - Alex Dan', 
    image: '/images/coursework/mastering-visual-studio.jpg', 
    status: 'completed', 
    type: 'course',
    tags: ['cloud', 'dataengineer', 'gamedev', 'software-engineer']
  },
  { 
    name: 'JS Basics for Beginners', 
    provider: 'Udemy - Mosh Hamedani', 
    image: '/images/coursework/javascript.png', 
    status: 'completed', 
    type: 'course',
    tags: ['software-engineer']
  },
  { 
    name: 'The Complete Python Bootcamp From Zero to Hero in Python', 
    provider: 'Udemy - Jose Portilla, Pierian Training', 
    image: '/images/coursework/python-zero-to-hero.jpg', 
    status: 'in-progress', 
    type: 'course',
    tags: ['cloud', 'dataengineer', 'software-engineer']
  },
  { 
    name: 'Python for Data Science and Machine Learning Bootcamp', 
    provider: 'Udemy - Jose Portilla, Pierian Training', 
    image: '/images/coursework/machine-learning.jpg', 
    status: 'completed', 
    type: 'course',
    tags: ['cloud', 'dataengineer', 'software-engineer']
  },
  { 
    name: 'Python Data Structures & Algorithms', 
    provider: 'Udemy - Scott Barrett', 
    image: '/images/coursework/python-data-struct.jpg', 
    status: 'completed', 
    type: 'course',
    tags: ['software-engineer']
  },
  { 
    name: 'Flutter & Dart - The Complete Guide', 
    provider: 'Udemy - Academind by Maximilian Schwarzmüller', 
    image: '/images/coursework/flutter-dart.jpg', 
    status: 'completed', 
    type: 'course',
    tags: ['software-engineer']
  },
  { 
    name: 'The Complete Flutter Development Bootcamp with Dart', 
    provider: 'Udemy - Dr. Angela Yu', 
    image: '/images/coursework/flutter-bootcamp.jpg', 
    status: 'completed', 
    type: 'course',
    tags: ['software-engineer']
  },
];

// Helper function to get certifications for a specific track
export function getCertificationsForTrack(track: string): Certification[] {
  return allCertifications.filter(cert => cert.tags.includes(track));
}

// ----------------------------------------------------------------------
// 3. PRIORITIZED COURSEWORK (Per Track)
// ----------------------------------------------------------------------
// This whitelist determines which relevantCourses from the Degree display on a given track page
export const courseMap: Record<string, Course[]> = {
  'cloud': [
    { name: 'Operating Systems' },
    { name: 'Systems Programing' },
    { name: 'Computer Architecture' },
    { name: 'Database Management' },
    { name: 'Technology in the Global Arena' },
    { name: 'Linux System Administration' }
  ],
  'dataengineer': [
    { name: 'Database Management' },
    { name: 'Data Structures' },
    { name: 'Statistics for Business and Economics' },
    { name: 'Introduction to Probability and Statistics for CS' },
    { name: 'PHI 3681 Ethics, Big Data & Artificial Intelligence' }
  ],
  'gamedev': [
    { name: 'Calculus 1' },
    { name: 'Calculus 2' },
    { name: 'Advanced Windows Programming' },
    { name: 'Computer Architecture' },
    { name: 'Programming II' }
  ],
  'software-engineer': [
    { name: 'Software Engineering I' },
    { name: 'Software Engineering II' },
    { name: 'System Programing' },
    { name: 'Data Structures' },
    { name: 'Operating Systems' },
    { name: 'Advanced Windows Programming' }
  ]
};

// ----------------------------------------------------------------------
// 4. DEGREES config
// ----------------------------------------------------------------------
export const degrees: Degree[] = [
    {
        title: "B.A. in Computer Science",
        institution: "University",
        year: "2023",
        relevantCourses: [
            "Intro to Computing",
            "Intro to Programming",
            "Compt Science for Everyone",
            "Statistics for Business and Economics",
            "Discrete Math",
            "Discrete Structures",
            "Computer Architecture",
            "Programming I",
            "Programming II",
            "Data Structures",
            "Systems Programing",
            "Linux System Administration",
            "Operating Systems",
            "Pre-Calculus: Algebra & Trigonometry",
            "Professional & Technical Writing",
            "Technology in the Global Arena",
            "Software Engineering I",
            "Logic for CS",
            "Digital Forensics",
            "Software Engineering II",
            "Advanced Windows Programming",
            "Database Management",
            "Calculus 1",
            "Calculus 2"
        ] 
    },
    {
        title: "Certificate in Big Data, AI, & Ethics",
        institution: "University",
        year: "2023",
        relevantCourses: [
            "PHI 2100 Introduction to Logic",
            "PHI 4371 Truth and Deception",
            "Introduction to Probability and Statistics for CS",
            "PHI 2600 Introduction to Ethics",
            "PHI 3681 Ethics, Big Data & Artificial Intelligence"
        ]
    }
];
