import React, { useState, useEffect } from 'react';
import { 
    PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, 
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { Book, CheckCircle, FileText, AlertTriangle, Loader2 } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import StreakHeatmap from '../components/StreakHeatmap';

// --- MOCK API DATA ---
// This data now includes theme variable names for colors, making it dynamic.
const getMockApiData = () => ({
    kpis: { totalRoadmaps: 12, topicsCompleted: 157, notesCreated: 89 },
    topicStatus: [
        { name: 'Completed', value: 157, color: 'var(--color-text-accent)' },
        { name: 'In Progress', value: 45, color: 'var(--color-primary)' },
        { name: 'Not Started', value: 98, color: 'var(--color-primary-focus)' },
    ],
    recentActivity: [
        { date: 'Mon', topics: 4 }, { date: 'Tue', topics: 6 }, { date: 'Wed', topics: 2 },
        { date: 'Thu', topics: 8 }, { date: 'Fri', topics: 5 }, { date: 'Sat', topics: 12 },
        { date: 'Sun', topics: 7 },
    ],
    roadmapProgress: [
        { title: 'React', progress: 75 },
        { title: 'Data Science', progress: 40 },
        { title: 'DevOps', progress: 90 },
        { title: 'UI/UX', progress: 15 },
    ]
});

const Dashboard = () => {
    // --- State Management ---
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // In a real application, you would make API calls here.
                // For now, we simulate a successful API call.
                await new Promise(resolve => setTimeout(resolve, 1000));
                setData(getMockApiData());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);


    // --- Render Logic ---

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-full bg-status-danger/20 rounded-xl p-4">
                <AlertTriangle className="w-16 h-16 text-status-danger mb-4" />
                <h2 className="text-2xl font-bold text-text-base">Failed to Load Dashboard</h2>
                <p className="text-text-muted mt-2">{error}</p>
            </div>
        );
    }

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-text-muted mt-1">A snapshot of your learning journey.</p>
            </header>
            
            {/* KPI Cards now use the KPICard component which should also be updated to use semantic classes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <KPICard 
                    title="Total Roadmaps" 
                    value={data.kpis.totalRoadmaps} 
                    icon={<Book size={24} />} 
                    color="var(--color-primary)"
                    linkTo="/roadmaps"
                />
                <KPICard 
                    title="Topics Completed" 
                    value={data.kpis.topicsCompleted} 
                    icon={<CheckCircle size={24} />} 
                    color="var(--color-text-accent)"
                    unit="topics"
                    linkTo="/kanban"
                />
                <KPICard 
                    title="Notes Created" 
                    value={data.kpis.notesCreated} 
                    icon={<FileText size={24} />} 
                    color="var(--color-primary-focus)"
                    linkTo="/kb"
                />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* The StreakHeatmap component should be refactored to use the new theme colors */}
                    <StreakHeatmap />
                    
                    <div className="card"> {/* Using semantic .card class */}
                        <h3 className="text-lg font-semibold mb-4">Recent Activity (Last 7 Days)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.recentActivity} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-bg-muted)" />
                                <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} />
                                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-muted)', borderRadius: 'var(--border-radius-base)' }} />
                                <Legend wrapperStyle={{fontSize: "14px"}} />
                                <Line type="monotone" dataKey="topics" name="Topics Completed" stroke="var(--color-text-accent)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                {/* Right Column */}
                <div className="flex flex-col gap-8">
                    <div className="card"> {/* Using semantic .card class */}
                        <h3 className="text-lg font-semibold mb-4">Topic Status Breakdown</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={data.topicStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name">
                                    {data.topicStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-muted)', borderRadius: 'var(--border-radius-base)' }} itemStyle={{ color: 'var(--color-text-base)' }} />
                                <Legend wrapperStyle={{fontSize: "14px"}}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card"> {/* Using semantic .card class */}
                         <h3 className="text-lg font-semibold mb-4">Roadmap Progress</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.roadmapProgress} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-bg-muted)" />
                                <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} domain={[0, 100]} unit="%"/>
                                <YAxis type="category" dataKey="title" stroke="var(--color-text-muted)" fontSize={12} width={80} />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-muted)', borderRadius: 'var(--border-radius-base)' }} cursor={{ fill: 'rgba(var(--color-primary-rgb), 0.1)' }}/>
                                <Bar dataKey="progress" fill="var(--color-primary)" name="Progress" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                         </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;