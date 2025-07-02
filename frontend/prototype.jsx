import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Book, CheckCircle, FileText, LayoutDashboard, Map, Trello, Notebook, PlusCircle } from 'lucide-react';

// --- Mock Data (Expanded for Full App) ---

const kpiData = {
    totalRoadmaps: 12,
    topicsCompleted: 157,
    notesCreated: 89,
};

const topicStatusData = [
    { name: 'Completed', value: 157, color: '#60a5fa' },
    { name: 'In Progress', value: 45, color: '#3b82f6' },
    { name: 'Not Started', value: 98, color: '#2563eb' },
];

const milestoneTopicData = [
    { name: 'Milestone 1', completed: 10, inProgress: 5, notStarted: 2 },
    { name: 'Milestone 2', completed: 8, inProgress: 8, notStarted: 5 },
    { name: 'Milestone 3', completed: 4, inProgress: 6, notStarted: 10 },
    { name: 'Milestone 4', completed: 12, inProgress: 2, notStarted: 1 },
];

const roadmapsData = [
    { id: 1, title: 'Mastering React & Redux', description: 'From fundamentals to advanced patterns.', progress: 75 },
    { id: 2, title: 'Data Science with Python', description: 'A complete journey into data analysis and machine learning.', progress: 40 },
    { id: 3, title: 'DevOps Essentials', description: 'CI/CD, Docker, and Kubernetes.', progress: 90 },
    { id: 4, title: 'UI/UX Design Principles', description: 'Learn the fundamentals of creating beautiful and intuitive interfaces.', progress: 15 },
];

const kanbanData = {
    'Not Started': [
        { id: 't-1', title: 'Learn about Virtual DOM' },
        { id: 't-2', title: 'State vs. Props' },
        { id: 't-3', title: 'Understand the component lifecycle' },
    ],
    'In Progress': [
        { id: 't-4', title: 'Build a simple todo app with React' },
        { id: 't-5', title: 'Explore conditional rendering' },
    ],
    'Completed': [
        { id: 't-6', title: 'Setup React environment' },
        { id: 't-7', title: 'What is JSX?' },
        { id: 't-8', title: 'Create first functional component' },
        { id: 't-9', title: 'Handling Events' },
    ],
};

const notesData = [
    { id: 'n-1', title: 'React Hooks Deep Dive', snippet: 'useState is for managing local component state...', tags: ['React', 'Hooks'] },
    { id: 'n-2', title: 'Docker Networking Basics', snippet: 'Bridge, host, and overlay networks are the main types...', tags: ['DevOps', 'Docker'] },
    { id: 'n-3', title: 'CSS Flexbox vs. Grid', snippet: 'Flexbox is for one-dimensional layouts, while Grid is for two-dimensional...', tags: ['CSS', 'Frontend'] },
];


// --- Reusable UI Components ---

const KPICard = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105">
        <div className={`p-3 rounded-full`} style={{ backgroundColor: color, color: '#fff' }}>{icon}</div>
        <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-white text-3xl font-bold">{value}</p>
        </div>
    </div>
);

const StreakHeatmap = () => {
    const [contributions, setContributions] = useState([]);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

    useEffect(() => {
        const generateData = () => {
            const data = [];
            const today = new Date();
            for (let i = 0; i < 365; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const count = Math.random() > 0.3 ? 0 : Math.floor(Math.random() * 15) + 1;
                data.push({ date, count });
            }
            return data.reverse();
        };
        setContributions(generateData());
    }, []);

    const getColor = (count) => {
        if (count === 0) return 'bg-gray-700';
        if (count < 4) return 'bg-blue-800';
        if (count < 8) return 'bg-blue-600';
        if (count < 12) return 'bg-blue-400';
        return 'bg-blue-300';
    };

    const handleMouseOver = (e, day) => {
        const rect = e.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            content: `${day.count} topics on ${day.date.toDateString()}`,
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY - 40,
        });
    };

    const handleMouseOut = () => setTooltip({ visible: false, content: '', x: 0, y: 0 });

    const renderGrid = () => {
        const cells = [];
        const startDate = contributions.length > 0 ? contributions[0].date : new Date();
        const startDay = startDate.getDay();
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="w-4 h-4" />);
        }
        contributions.forEach((day) => {
            cells.push(
                <div
                    key={day.date.toISOString()}
                    className={`w-4 h-4 rounded-sm ${getColor(day.count)} transition-transform transform hover:scale-125`}
                    onMouseOver={(e) => handleMouseOver(e, day)}
                    onMouseOut={handleMouseOut}
                />
            );
        });
        return cells;
    };
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthLabels = [];
    if (contributions.length > 0) {
        let lastMonth = -1;
        contributions.forEach((day, index) => {
            const month = day.date.getMonth();
            if (day.date.getDate() === 1 && month !== lastMonth) {
                const weekIndex = Math.floor((index + day.date.getDay()) / 7);
                monthLabels.push(
                    <span key={month} className="text-xs text-gray-400 absolute" style={{ left: `${weekIndex * 1.15}rem` }}>
                        {monthNames[month]}
                    </span>
                );
                lastMonth = month;
            }
        });
    }

    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-white text-lg font-semibold mb-4">Learning Streak</h3>
            <div className="flex">
                 <div className="flex flex-col justify-around text-xs text-gray-400 pr-2 py-1 h-32">
                    <span>Mon</span><span>Wed</span><span>Fri</span>
                </div>
                <div className="flex-grow"><div className="relative h-6 mb-1">{monthLabels}</div><div className="grid grid-flow-col grid-rows-7 gap-1">{renderGrid()}</div></div>
            </div>
            {tooltip.visible && <div className="absolute bg-gray-900 text-white text-sm px-3 py-1 rounded-md shadow-lg pointer-events-none" style={{ left: tooltip.x, top: tooltip.y, zIndex: 50 }}>{tooltip.content}</div>}
            <div className="flex items-center justify-end w-full mt-4 text-xs text-gray-500">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-700 mx-1"></div><div className="w-3 h-3 rounded-sm bg-blue-800 mx-1"></div><div className="w-3 h-3 rounded-sm bg-blue-600 mx-1"></div><div className="w-3 h-3 rounded-sm bg-blue-400 mx-1"></div><div className="w-3 h-3 rounded-sm bg-blue-300 mx-1"></div>
                <span>More</span>
            </div>
        </div>
    );
};

// --- Page Components ---

const Dashboard = () => (
    <>
        <header className="mb-8"><h1 className="text-4xl font-bold">Dashboard</h1><p className="text-gray-400 mt-1">A snapshot of your learning journey.</p></header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <KPICard title="Total Roadmaps" value={kpiData.totalRoadmaps} icon={<Book size={24} />} color="#3b82f6" />
            <KPICard title="Topics Completed" value={kpiData.topicsCompleted} icon={<CheckCircle size={24} />} color="#60a5fa" />
            <KPICard title="Notes Created" value={kpiData.notesCreated} icon={<FileText size={24} />} color="#2563eb" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8"><StreakHeatmap /></div>
            <div className="flex flex-col gap-8">
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-white text-lg font-semibold mb-4">Topic Status Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={topicStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name">{topicStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}</Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.75rem' }} itemStyle={{ color: '#f9fafb' }} />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                     <h3 className="text-white text-lg font-semibold mb-4">Milestone Topic Distribution</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={milestoneTopicData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis type="number" stroke="#9ca3af" fontSize={12} /><YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={80} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.75rem' }} labelStyle={{ color: '#f9fafb' }} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                            <Bar dataKey="completed" stackId="a" fill="#60a5fa" name="Completed" /><Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" /><Bar dataKey="notStarted" stackId="a" fill="#2563eb" name="Not Started" radius={[0, 4, 4, 0]}/>
                        </BarChart>
                     </ResponsiveContainer>
                </div>
            </div>
        </div>
    </>
);

const RoadmapsList = () => (
    <>
        <header className="mb-8 flex justify-between items-center">
            <div><h1 className="text-4xl font-bold">Roadmaps</h1><p className="text-gray-400 mt-1">Your curated learning paths.</p></div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"><PlusCircle size={20} /> New Roadmap</button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapsData.map(roadmap => (
                <div key={roadmap.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:border-blue-500 border-2 border-transparent transition-all">
                    <div>
                        <h3 className="text-xl font-bold text-white">{roadmap.title}</h3>
                        <p className="text-gray-400 mt-2 mb-4">{roadmap.description}</p>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1 text-sm text-gray-300"><span>Progress</span><span>{roadmap.progress}%</span></div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${roadmap.progress}%` }}></div></div>
                    </div>
                </div>
            ))}
        </div>
    </>
);

const KanbanBoard = () => {
    const columnColors = {
        'Not Started': 'bg-red-900/50',
        'In Progress': 'bg-yellow-900/50',
        'Completed': 'bg-green-900/50',
    };
    return (
        <>
            <header className="mb-8"><h1 className="text-4xl font-bold">Kanban Board</h1><p className="text-gray-400 mt-1">Track your topic progress visually.</p></header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {Object.entries(kanbanData).map(([columnTitle, tasks]) => (
                    <div key={columnTitle} className={`rounded-xl p-4 ${columnColors[columnTitle]}`}>
                        <h3 className="text-lg font-bold text-white mb-4">{columnTitle}</h3>
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <div key={task.id} className="bg-gray-800 p-4 rounded-lg shadow-md cursor-grab active:cursor-grabbing">
                                    <p className="text-white font-medium">{task.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const NotesList = () => (
    <>
        <header className="mb-8 flex justify-between items-center">
            <div><h1 className="text-4xl font-bold">Knowledge Base</h1><p className="text-gray-400 mt-1">Your personal collection of notes.</p></div>
             <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"><PlusCircle size={20} /> New Note</button>
        </header>
        <div className="space-y-4">
            {notesData.map(note => (
                <div key={note.id} className="bg-gray-800 p-5 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-white">{note.title}</h3>
                    <p className="text-gray-400 my-2">{note.snippet}</p>
                    <div className="flex gap-2 mt-3">{note.tags.map(tag => <span key={tag} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>)}</div>
                </div>
            ))}
        </div>
    </>
);


const Sidebar = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={24} /> },
        { name: 'Roadmaps', icon: <Map size={24} /> },
        { name: 'Kanban Board', icon: <Trello size={24} /> },
        { name: 'Notes', icon: <Notebook size={24} /> },
    ];

    return (
        <aside className="bg-gray-800/50 backdrop-blur-sm w-20 lg:w-64 p-4 lg:p-6 flex flex-col rounded-3xl">
            <div className="flex items-center gap-3 mb-10">
                <Book className="text-blue-400" size={32} />
                <h1 className="text-2xl font-bold text-white hidden lg:block">Pathfinder</h1>
            </div>
            <nav className="flex flex-col gap-3">
                {navItems.map(item => (
                    <button
                        key={item.name}
                        onClick={() => setCurrentPage(item.name)}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            currentPage === item.name ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="font-semibold hidden lg:block">{item.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

// --- Main App Component ---

export default function App() {
    const [currentPage, setCurrentPage] = useState('Dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'Dashboard': return <Dashboard />;
            case 'Roadmaps': return <RoadmapsList />;
            case 'Kanban Board': return <KanbanBoard />;
            case 'Notes': return <NotesList />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans flex p-4 gap-4">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 overflow-y-auto">
                {renderPage()}
            </main>
        </div>
    );
}
