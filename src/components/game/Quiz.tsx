import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { addPoints } from '../../store/gameStore';

interface QuizProps {
    track: string;
}

// All questions are specifically about Daniel's projects - NOT general knowledge
const QUESTIONS: Record<string, { q: string, options: string[], answer: number, reward: number, project: string }[]> = {
    'cloud': [
        // Self-Hosted Homelab
        {
            q: "In the Self-Hosted Homelab project, what hardware was rebuilt and upgraded for the virtualization server?",
            options: ["HP ProLiant DL380", "Dell OptiPlex 9020 SFF", "Raspberry Pi 4 Cluster", "Custom Built Server"],
            answer: 1,
            reward: 150,
            project: "Self-Hosted Homelab"
        },
        {
            q: "What ZFS configuration was used for storage in the Self-Hosted Homelab?",
            options: ["Single 4TB SSD", "RAID-5 Array", "Dual 2TB SSD Mirror", "Triple Parity RAIDZ3"],
            answer: 2,
            reward: 200,
            project: "Self-Hosted Homelab"
        },
        {
            q: "Which observability stack was implemented in the Homelab to cut troubleshooting time by 60%?",
            options: ["ELK Stack", "Prometheus + Grafana", "Datadog", "New Relic"],
            answer: 1,
            reward: 150,
            project: "Self-Hosted Homelab"
        },
        // Patreon Integration
        {
            q: "What cloud platform hosts the Patreon Integration project?",
            options: ["Google Cloud Platform", "Azure", "AWS EC2", "DigitalOcean"],
            answer: 2,
            reward: 150,
            project: "Patreon Integration"
        },
        {
            q: "What authentication protocol does the Patreon Integration use for user management?",
            options: ["SAML 2.0", "OpenID Connect", "OAuth 2.0", "Basic Auth"],
            answer: 2,
            reward: 200,
            project: "Patreon Integration"
        },
        {
            q: "What type of processing was implemented to optimize the Patreon Integration backend?",
            options: ["Batch Processing", "Synchronous Processing", "Asynchronous Processing", "Stream Processing"],
            answer: 2,
            reward: 150,
            project: "Patreon Integration"
        }
    ],
    'dataengineer': [
        // Self-Hosted Homelab (Data Engineering aspects)
        {
            q: "What database system was provisioned as a multi-tenant cluster in the Self-Hosted Homelab?",
            options: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
            answer: 2,
            reward: 150,
            project: "Self-Hosted Homelab"
        },
        {
            q: "What deployment approach was used in the Homelab for reproducible database environments?",
            options: ["Bare Metal Install", "Docker + docker-compose", "Kubernetes", "Vagrant VMs"],
            answer: 1,
            reward: 150,
            project: "Self-Hosted Homelab"
        },
        // Vendor Data Analysis
        {
            q: "Which Python library was used for multi-regional currency normalization in the Vendor Data Analysis project?",
            options: ["pandas-money", "numpy", "forex-python", "py-currency"],
            answer: 2,
            reward: 200,
            project: "Vendor Data Analysis"
        },
        {
            q: "What vendor platforms did the Vendor Data Analysis pipeline collect sales data from?",
            options: ["Shopify and WooCommerce", "Patreon and Gumroad", "Etsy and Amazon", "Stripe and PayPal"],
            answer: 1,
            reward: 150,
            project: "Vendor Data Analysis"
        },
        {
            q: "What technology supplemented API data collection when fields were missing in the Vendor Data Analysis project?",
            options: ["Manual Data Entry", "Selenium Web Scraping", "CSV Imports", "GraphQL Queries"],
            answer: 1,
            reward: 200,
            project: "Vendor Data Analysis"
        },
        {
            q: "What database was used to store the transformed vendor sales data?",
            options: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
            answer: 2,
            reward: 150,
            project: "Vendor Data Analysis"
        }
    ],
    'gamedev': [
        // INIT Product Manager - Mech Fighter
        {
            q: "How many people were on the cross-functional team for the Mech Fighter game project?",
            options: ["5 people", "10 people", "20 people", "35 people"],
            answer: 2,
            reward: 150,
            project: "Mech Fighter Game"
        },
        {
            q: "What game engine was used to develop the robot mech fighter game?",
            options: ["Unreal Engine 5", "Unity 2021", "Godot 4", "GameMaker Studio"],
            answer: 1,
            reward: 100,
            project: "Mech Fighter Game"
        },
        {
            q: "How long was the build program for the Mech Fighter game project?",
            options: ["4 weeks", "9 weeks", "16 weeks", "6 months"],
            answer: 1,
            reward: 150,
            project: "Mech Fighter Game"
        },
        // GDSC Game Dev Lead
        {
            q: "How many students per session attended the GDSC Unity workshops?",
            options: ["Up to 10 students", "Up to 20 students", "Up to 30 students", "Up to 50 students"],
            answer: 2,
            reward: 150,
            project: "GDSC Game Dev Lead"
        },
        {
            q: "What was the student retention improvement achieved through the GDSC workshops?",
            options: ["25% increase", "50% increase", "75% increase", "100% increase"],
            answer: 1,
            reward: 200,
            project: "GDSC Game Dev Lead"
        },
        {
            q: "What type of development concepts were taught in the GDSC Unity workshops?",
            options: ["Frontend UI Design", "C# Backend Development", "3D Modeling", "Sound Design"],
            answer: 1,
            reward: 150,
            project: "GDSC Game Dev Lead"
        }
    ],
    'software-engineer': [
        // Patreon Integration
        {
            q: "What runtime/language was used to build the Patreon Integration backend?",
            options: ["Python Flask", "Node.js", "Java Spring", "Go"],
            answer: 1,
            reward: 150,
            project: "Patreon Integration"
        },
        {
            q: "What type of data pipelines were designed for the Patreon Integration's real-time updates?",
            options: ["Batch ETL Jobs", "User Data & Subscription Tier Syncing", "Log Aggregation", "ML Feature Pipelines"],
            answer: 1,
            reward: 200,
            project: "Patreon Integration"
        },
        // Vendor Data Analysis
        {
            q: "What was implemented to ensure clean and reliable data processing in the Vendor Data Analysis project?",
            options: ["Unit Tests", "Custom Python Validation Library", "Schema Validation", "Type Checking"],
            answer: 1,
            reward: 150,
            project: "Vendor Data Analysis"
        },
        // LAPS
        {
            q: "What is the primary focus of the LAPS project?",
            options: ["Web Scraping", "Computer Vision / License Plate Recognition", "Mobile App Development", "Database Optimization"],
            answer: 1,
            reward: 150,
            project: "LAPS"
        },
        // Mech Fighter (Software aspects)
        {
            q: "What version control system was integrated for the Mech Fighter game development?",
            options: ["SVN", "Mercurial", "GitHub", "Perforce"],
            answer: 2,
            reward: 100,
            project: "Mech Fighter Game"
        },
        {
            q: "What project management tool was used alongside GitHub for the Mech Fighter game?",
            options: ["Jira", "Asana", "Trello", "Monday.com"],
            answer: 2,
            reward: 150,
            project: "Mech Fighter Game"
        }
    ]
};

export default function TrackQuiz({ track }: QuizProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'completed'>('idle');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    
    // Pick a question based on index
    const questions = QUESTIONS[track] || [];
    const question = questions[questionIndex];

    if (!question) return null;

    const handleAnswer = (idx: number) => {
        if (status !== 'idle') return;
        
        setSelected(idx);

        if (idx === question.answer) {
            setStatus('correct');
            setTotalEarned(prev => prev + question.reward);
            addPoints(question.reward, `Quiz: ${question.project}`);
            
            // Auto advance
            setTimeout(() => {
                handleNext();
            }, 1200);
        } else {
            setStatus('wrong');
            setTimeout(() => {
                setSelected(null);
                setStatus('idle');
            }, 1000);
        }
    };
    
    // Advance logic
    const handleNext = () => {
        const nextIndex = questionIndex + 1;
        if (nextIndex >= questions.length) {
            setStatus('completed');
        } else {
            setQuestionIndex(nextIndex);
            setStatus('idle');
            setSelected(null);
        }
    };

    const handleRestart = () => {
        setQuestionIndex(0);
        setStatus('idle');
        setSelected(null);
        setTotalEarned(0);
    };

    if (status === 'completed') {
        return (
            <div className="bg-gradient-to-br from-brand-primary/10 to-green-900/20 border border-brand-primary/30 p-8 rounded-2xl flex flex-col items-center gap-4 animate-in fade-in max-w-2xl">
                <Trophy className="text-brand-primary w-16 h-16" />
                <div className="text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">Track Mastery Complete!</h3>
                    <p className="text-gray-400 mb-4">You've demonstrated deep knowledge of these projects.</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 rounded-full">
                        <span className="text-brand-primary font-bold">+{totalEarned} XP</span>
                        <span className="text-gray-500">total earned</span>
                    </div>
                </div>
                <button 
                    onClick={handleRestart}
                    className="text-sm text-gray-500 hover:text-white underline mt-4 transition"
                >
                    Take the quiz again?
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/20 rounded-lg">
                        <HelpCircle className="text-brand-primary w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Project Knowledge Check</h3>
                        <p className="text-xs text-gray-500">Question {questionIndex + 1} of {questions.length}</p>
                    </div>
                </div>
                <span className="text-sm bg-brand-primary/20 text-brand-primary px-3 py-1.5 rounded-full font-bold">
                    +{question.reward} XP
                </span>
            </div>

            {/* Project Badge */}
            <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-400 text-xs font-mono rounded-full border border-gray-700">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                    {question.project}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-700 rounded-full mb-6 overflow-hidden">
                <div 
                    className="h-full bg-brand-primary transition-all duration-500"
                    style={{ width: `${((questionIndex) / questions.length) * 100}%` }}
                />
            </div>
            
            {/* Question */}
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">{question.q}</p>
            
            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
                {question.options.map((opt, idx) => {
                    let buttonClass = 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border-gray-700 hover:border-gray-500';
                    
                    if (selected === idx) {
                        if (status === 'correct') {
                            buttonClass = 'bg-green-500 text-black border-green-500 scale-[1.02]';
                        } else if (status === 'wrong') {
                            buttonClass = 'bg-red-500 text-white border-red-500';
                        }
                    }
                    
                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={status !== 'idle'}
                            className={`
                                p-4 rounded-xl text-left font-medium transition-all duration-200 border
                                ${buttonClass}
                                ${status === 'idle' ? 'cursor-pointer' : 'cursor-default'}
                            `}
                        >
                            <span className="inline-flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gray-900/50 flex items-center justify-center text-sm font-mono text-gray-500">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {opt}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Feedback message */}
            {status === 'correct' && (
                <div className="mt-6 flex items-center gap-2 text-green-400 animate-in slide-in-from-bottom-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Correct! Moving to next question...</span>
                </div>
            )}
            {status === 'wrong' && (
                <div className="mt-6 flex items-center gap-2 text-red-400 animate-in slide-in-from-bottom-2">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Not quite, try again!</span>
                </div>
            )}
        </div>
    );
}
