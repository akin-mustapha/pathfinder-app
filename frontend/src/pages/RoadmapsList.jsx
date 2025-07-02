import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Loader2, AlertTriangle, X } from 'lucide-react';

// ===================================================================================
// CHILD COMPONENT: RoadmapCard
// ===================================================================================
const RoadmapCard = ({ roadmap }) => (
    <Link to={`/roadmaps/${roadmap.id}`} className="block h-full">
        <div className="roadmap-card">
            <div>
                <h3 className="roadmap-card-title">{roadmap.title}</h3>
                <p className="text-text-muted mt-2 mb-4">{roadmap.description}</p>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1 text-sm text-text-muted">
                    <span>Progress</span>
                    <span>{roadmap.progress}%</span>
                </div>
                <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${roadmap.progress}%` }}></div>
                </div>
            </div>
        </div>
    </Link>
);

// ===================================================================================
// CHILD COMPONENT: RoadmapSkeleton
// ===================================================================================
const RoadmapSkeleton = () => (
    <div className="card h-full animate-pulse">
        <div className="h-6 bg-bg-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-bg-muted rounded w-5/6 mb-6"></div>
        <div className="h-2.5 bg-bg-muted rounded-full w-full mt-auto"></div>
    </div>
);

// ===================================================================================
// CHILD COMPONENT: NewRoadmapModal
// ===================================================================================
const NewRoadmapModal = ({ isOpen, onClose, onRoadmapCreated }) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Creating roadmap:", { title, description });
            onRoadmapCreated();
        } catch (error) {
            console.error(error);
            alert('Error: Could not create roadmap.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="card w-full max-w-lg m-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Create New Roadmap</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-text-base transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-text-muted mb-2">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-base" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-text-muted mb-2">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="input-base" required></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                            <span>{isSubmitting ? 'Creating...' : 'Create Roadmap'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ===================================================================================
// MAIN PAGE COMPONENT: RoadmapsList
// ===================================================================================
const RoadmapsList = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRoadmaps = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const mockData = [
                { id: 1, title: 'Mastering React & Redux', description: 'From fundamentals to advanced patterns.', progress: 75 },
                { id: 2, title: 'Data Science with Python', description: 'A complete journey into data analysis.', progress: 40 },
                { id: 3, title: 'DevOps Essentials', description: 'CI/CD, Docker, and Kubernetes.', progress: 90 },
            ];
            await new Promise(resolve => setTimeout(resolve, 1000));
            setRoadmaps(mockData);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    const handleRoadmapCreated = () => {
        setIsModalOpen(false);
        fetchRoadmaps();
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <RoadmapSkeleton key={i} />)}
                </div>
            );
        }

        if (error) {
            return (
                <div className="card items-center justify-center flex flex-col bg-status-danger/20 text-status-danger">
                    <AlertTriangle size={48} className="mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Failed to Load Roadmaps</h2>
                    <p>{error}</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map(roadmap => (
                    <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                ))}
            </div>
        );
    };

    return (
        <>
            <NewRoadmapModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onRoadmapCreated={handleRoadmapCreated}
            />
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">Roadmaps</h1>
                    <p className="text-text-muted mt-1">Your curated learning paths.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                    <PlusCircle size={20} />
                    <span>New Roadmap</span>
                </button>
            </header>
            {renderContent()}
        </>
    );
};

export default RoadmapsList;