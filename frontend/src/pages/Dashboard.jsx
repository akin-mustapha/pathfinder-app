import React, { useState, useEffect } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardKPICards from '../components/dashboard/DashboardKPICards';
import DashboardRecentActivity from '../components/dashboard/DashboardRecentActivity';
import DashboardStatusPie from '../components/dashboard/DashboardStatusPie';
import DashboardRoadmapProgress from '../components/dashboard/DashboardRoadmapProgress';
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
            <DashboardHeader />
            <DashboardKPICards kpis={data.kpis} />
            <div className="dashboard-main-grid">
                <div className="dashboard-main-col">
                    <StreakHeatmap />
                    <DashboardRecentActivity data={data.recentActivity} />
                </div>
                <div className="dashboard-side-col">
                    <DashboardStatusPie data={data.topicStatus} />
                    <DashboardRoadmapProgress data={data.roadmapProgress} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;