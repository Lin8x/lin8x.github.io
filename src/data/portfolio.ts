
export interface Skill {
    name: string;
    icon: string;
}

export interface Certification {
    name: string;
    provider: string;
    image: string; // Path to logo/certificate image
    status: 'completed' | 'in-progress';
    url?: string;
    type?: 'certification' | 'course'; // New field to distinguish
}

export interface TrackConfig {
    resume: string;
}

export const trackConfig: Record<string, TrackConfig> = {
    'cloud': { resume: '/resumes/Daniel_Jalali_Resume_Cloud.pdf' },
    'dataengineer': { resume: '/resumes/Daniel_Jalali_Resume_Data.pdf' },
    'gamedev': { resume: '/resumes/Daniel_Jalali_Resume_GameDev.pdf' },
    'software-engineer': { resume: '/resumes/Daniel_Jalali_Resume_SWE.pdf' },
};

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
// 1. SKILLS config
// ----------------------------------------------------------------------
export const skillMap: Record<string, Skill[]> = {
  'cloud': [
    { name: 'AWS', icon: '/images/logos/aws.png' },
    { name: 'Azure', icon: '/images/logos/azure.png' },
    { name: 'Docker', icon: '/images/logos/docker.png' },
    { name: 'Grafana', icon: '/images/logos/grafana.png' },
    { name: 'Azure Files', icon: '/images/logos/azurefiles.png' },
    { name: 'Azure Blob Storage', icon: '/images/logos/azureblobstorage.png' },
    { name: 'Linux', icon: '/images/logos/linux.png' },
    { name: 'Windows Server', icon: '/images/logos/windows.png' },
    { name: 'Git', icon: '/images/logos/git.png' },
    { name: 'Python', icon: '/images/logos/python.png' },
    { name: 'MongoDB', icon: '/images/logos/mongodb.png' },
    { name: 'MySQL', icon: '/images/logos/mysql.png' },
  ],
  'dataengineer': [
    { name: 'Python', icon: '/images/logos/python.png' },
    { name: 'Pandas', icon: '/images/logos/pandas.png' },
    { name: 'NumPy', icon: '/images/logos/numpy.svg' },
    { name: 'Apache Spark', icon: '/images/logos/apachespark.png' },
    { name: 'Azure SQL', icon: '/images/logos/azuresql.png' },
    { name: 'Azure Synapse', icon: '/images/logos/azuresynapseanalytics.png' },
    { name: 'Azure CosmosDB', icon: '/images/logos/azurecosmosdb.png' },
    { name: 'Databricks', icon: '/images/logos/azuredatabricks.png' },
    { name: 'Data Factory', icon: '/images/logos/azuredatafactory.webp' },
    { name: 'PowerBI', icon: '/images/logos/powerbi.png' },
    { name: 'Matplotlib', icon: '/images/logos/matplotlib.png' },
    { name: 'Seaborn', icon: '/images/logos/seaborn.svg' },
    { name: 'PostgreSQL', icon: '/images/logos/postgresql.png' },
    { name: 'Linux', icon: '/images/logos/linux.png' },
    { name: 'Git', icon: '/images/logos/git.png' },
    { name: 'Docker', icon: '/images/logos/docker.png' },
  ],
  'gamedev': [
    { name: 'Unity', icon: '/images/logos/unity.png' },
    { name: 'C#', icon: '/images/logos/csharp.svg' },
    { name: 'Unreal Engine', icon: '/images/logos/unrealengine.svg' },
    { name: 'Blueprints', icon: '/images/logos/blueprints.png' },
    { name: 'Lightship (ARDK)', icon: '/images/logos/lightship.jpeg' },
    { name: 'Blender', icon: '/images/logos/blender.png' },
    { name: 'MRTK', icon: '/images/logos/mrtk.png' },
    { name: 'Dotween', icon: '/images/logos/dotween.png' },
    { name: 'VRCSDK', icon: '/images/logos/vrcsdk.png' },
    { name: 'UdonSharp', icon: '/images/logos/udonsharp.png' },
    { name: 'Git', icon: '/images/logos/git.png' },
    { name: 'VS Code', icon: '/images/logos/vscode.png' },
    { name: 'Android', icon: '/images/logos/android.png' },
    { name: 'iOS', icon: '/images/logos/ios.png' },
  ],
  'software-engineer': [
    { name: 'Python', icon: '/images/logos/python.png' },
    { name: 'C++', icon: '/images/logos/cplusplus.png' },
    { name: 'Git', icon: '/images/logos/git.png' },
    { name: 'Docker', icon: '/images/logos/docker.png' },
    { name: 'Azure', icon: '/images/logos/azure.png' },
    { name: 'Ubuntu', icon: '/images/logos/ubuntu.png' },
    { name: 'Fedora', icon: '/images/logos/fedora.png' },
    { name: 'Debian', icon: '/images/logos/debian.png' },
    { name: 'Kali Linux', icon: '/images/logos/kali.png' },
    { name: 'Selenium', icon: '/images/logos/selenium.png' },
    { name: 'MySQL', icon: '/images/logos/mysql.png' },
    { name: 'PostgreSQL', icon: '/images/logos/postgresql.png' },
    { name: 'Android', icon: '/images/logos/android.png' },
  ]
};

// ----------------------------------------------------------------------
// 2. CERTIFICATIONS config
// ----------------------------------------------------------------------
export const certMap: Record<string, Certification[]> = {
  'cloud': [
    { name: 'Microsoft MTA: Windows OS', provider: 'Microsoft', image: '/images/certs/mta.png', status: 'completed', type: 'certification' },
    { name: 'AWS Certified Cloud Practitioner', provider: 'AWS', image: '/images/certs/aws-cp.png', status: 'in-progress', type: 'certification' },
    { name: 'Ultimate AWS Certified Solutions Architect', provider: 'Udemy', image: '/images/logos/udemy.png', status: 'completed', type: 'course' }
  ],
  'gamedev': [
    { name: 'Unity Certified User: Programmer', provider: 'Unity Technologies', image: '/images/certs/unity-cert.png', status: 'completed', type: 'certification' },
    { name: 'C# Masterclass', provider: 'Udemy', image: '/images/logos/udemy.png', status: 'completed', type: 'course' }
  ],
  'dataengineer': [
    { name: 'Apache Spark with Scala', provider: 'Udemy', image: '/images/logos/udemy.png', status: 'completed', type: 'course' }
  ],
  'software-engineer': [
     { name: 'Clean Code', provider: 'Udemy', image: '/images/logos/udemy.png', status: 'completed', type: 'course' }
  ]
};

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
        institution: "Florida International University",
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
        institution: "Florida International University",
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
