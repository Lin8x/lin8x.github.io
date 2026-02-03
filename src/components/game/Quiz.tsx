import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { addPoints } from '../../store/gameStore';

interface QuizProps {
    track: string;
}

const QUESTIONS: Record<string, { q: string, options: string[], answer: number, reward: number }[]> = {
    'cloud': [
        {
            q: "In my Self-Hosted Homelab project, which database system did I implement for multi-tenant data engineering?",
            options: ["Oracle DB", "PostgreSQL", "SQLite", "Firebase"],
            answer: 1, 
            reward: 350
        },
        {
            q: "Which AWS service is primarily used for serverless computing events?",
            options: ["EC2", "Lambda", "S3", "RDS"],
            answer: 1,
            reward: 150
        },
        {
            q: "What concept reduces latency by caching content closer to the user?",
            options: ["Edge Computing / CDN", "Load Balancing", "Database Sharding", "Vertical Scaling"],
            answer: 0,
            reward: 200
        },
        {
            q: "In Docker, what file defines the steps to build an image?",
            options: ["docker-compose.yml", "Dockerfile", "package.json", "requirements.txt"],
            answer: 1,
            reward: 100
        },
        {
            q: "Which of these is NOT a core pillar of the AWS Well-Architected Framework?",
            options: ["Operational Excellence", "Security", "Cost Optimization", "Market Share"],
            answer: 3,
            reward: 150
        },
        {
            q: "Which Azure service is best suited for storing massive amounts of unstructured data like images or logs?",
            options: ["Azure SQL", "Azure Blob Storage", "CosmosDB", "Table Storage"],
            answer: 1,
            reward: 250
        }
    ],
    'dataengineer': [
        {
            q: "For the Vendor Data Analysis System, which library did I use to handle multi-regional currency normalization?",
            options: ["forex-python", "numpy", "pandas-money", "stripe-api"],
            answer: 0,
            reward: 350
        },
        {
            q: "Which of the following describes an ETL pipeline?",
            options: ["Extract, Transform, Load", "Edit, Test, Launch", "Encrypt, Transfer, Lock", "Evaluate, Train, Learn"],
            answer: 0,
            reward: 100
        },
        {
            q: "Which SQL command is used to remove a table completely from the database?",
            options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"],
            answer: 2,
            reward: 150
        },
        {
            q: "In Apache Spark, what is the primary data abstraction?",
            options: ["DataFrame / RDD", "LinkedList", "HashMap", "Binary Tree"],
            answer: 0,
            reward: 200
        },
        {
            q: "Which file format is column-oriented and optimized for big data queries?",
            options: ["CSV", "JSON", "Parquet", "XML"],
            answer: 2,
            reward: 200
        },
        {
            q: "In Power BI, which language is primarily used for Data Analysis Expressions?",
            options: ["Python", "DAX", "SQL", "M Query"],
            answer: 1,
            reward: 300
        }
    ],
    'gamedev': [
        {
            q: "For the robot mech fighter game, how large was the cross-functional team I directed?",
            options: ["5 people", "10 people", "20 people", "50 people"],
            answer: 2,
            reward: 350
        },
        {
            q: "In Unity, which method is called once per frame?",
            options: ["Start()", "Awake()", "Update()", "FixedUpdate()"],
            answer: 2,
            reward: 100
        },
        {
            q: "What is the primary language used for scripting in Unity?",
            options: ["C++", "C#", "Java", "Python"],
            answer: 1,
            reward: 50
        },
        {
            q: "Which component is required for an object to be affected by physics in Unity?",
            options: ["Collider", "Rigidbody", "Mesh Renderer", "Transform"],
            answer: 1,
            reward: 100
        },
        {
            q: "Which C# compiler enables complex interactivity in VRChat worlds?",
            options: ["Mono", "IL2CPP", "UdonSharp", "Roslyn"],
            answer: 2,
            reward: 400
        },
        {
            q: "What pattern is commonly used to manage game states like 'Menu', 'Playing', 'Paused'?",
            options: ["Singleton", "State Machine", "Observer", "Factory"],
            answer: 1,
            reward: 150
        }
    ],
    'software-engineer': [
        {
            q: "What encryption method did I use in the Patreon Integration project before publishing data to GitHub?",
            options: ["AES-256", "RSA", "XOR Cipher", "Base64"],
            answer: 2,
            reward: 350
        },
        {
            q: "Which git command is used to stage changes?",
            options: ["git commit", "git push", "git add", "git status"],
            answer: 2,
            reward: 50
        },
        {
            q: "What does REST stand for in web services?",
            options: ["Representational State Transfer", "Remote Execution State Transfer", "Real-time Event Service Tech", "React Express Server Types"],
            answer: 0,
            reward: 150
        },
        {
            q: "Which principle of OOP states that a class should have one and only one reason to change?",
            options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation"],
            answer: 0,
            reward: 200
        },
        {
            q: "Which tool is commonly used for automating web browser interaction for testing?",
            options: ["Selenium", "Postman", "Jenkins", "Ansible"],
            answer: 0,
            reward: 250
        },
        {
            q: "In a React component, what hook is used to handle side effects?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            answer: 1,
            reward: 100
        }
    ]
};

export default function TrackQuiz({ track }: QuizProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'completed'>('idle');
    const [questionIndex, setQuestionIndex] = useState(0);
    
    // Pick a question based on index
    const questions = QUESTIONS[track] || [];
    const question = questions[questionIndex];

    if (!question) return null;

    const handleAnswer = (idx: number) => {
        if (status !== 'idle') return;
        
        setSelected(idx);

        if (idx === question.answer) {
            setStatus('correct');
            addPoints(question.reward, 'Quiz Question Solved');
            
            // Auto advance
            setTimeout(() => {
                handleNext();
            }, 1000);
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

    if (status === 'completed') {
        return (
            <div className="bg-gray-800/50 border border-brand-primary/30 p-6 rounded-xl flex flex-col items-center gap-4 animate-in fade-in">
                <div className="flex items-center gap-4">
                    <CheckCircle className="text-brand-primary" size={32} />
                    <div>
                        <h3 className="text-white font-bold">Knowledge Verified</h3>
                        <p className="text-sm text-gray-400">You have secured data from this sector.</p>
                    </div>
                </div>
                <button 
                    onClick={handleNext}
                    className="text-xs text-gray-500 hover:text-white underline mt-2"
                >
                    Attempt another verification encryption?
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg mt-8">
            <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="text-brand-primary" />
                <h3 className="text-lg font-bold text-white">Bonus Challenge</h3>
                <span className="ml-auto text-xs bg-brand-primary/20 text-brand-primary px-2 py-1 rounded">+{question.reward} XP</span>
            </div>
            
            <p className="text-gray-300 mb-6">{question.q}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={status !== 'idle'}
                        className={`
                            p-3 rounded-lg text-left text-sm font-medium transition
                            ${selected === idx 
                                ? (status === 'correct' ? 'bg-green-500 text-black border-green-500' : status === 'wrong' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-700 text-white')
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700 hover:border-gray-500'
                            }
                        `}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
