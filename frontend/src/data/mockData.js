export const kpiData = {
    totalRoadmaps: 12,
    topicsCompleted: 157,
    notesCreated: 89,
};

export const topicStatusData = [
    { name: 'Completed', value: 157, color: '#60a5fa' },
    { name: 'In Progress', value: 45, color: '#3b82f6' },
    { name: 'Not Started', value: 98, color: '#2563eb' },
];

export const milestoneTopicData = [
    { name: 'Milestone 1', completed: 10, inProgress: 5, notStarted: 2 },
    { name: 'Milestone 2', completed: 8, inProgress: 8, notStarted: 5 },
    { name: 'Milestone 3', completed: 4, inProgress: 6, notStarted: 10 },
    { name: 'Milestone 4', completed: 12, inProgress: 2, notStarted: 1 },
];

export const roadmapsData = [
    { id: 1, title: 'Mastering React & Redux', description: 'From fundamentals to advanced patterns.', progress: 75 },
    { id: 2, title: 'Data Science with Python', description: 'A complete journey into data analysis and machine learning.', progress: 40 },
    { id: 3, title: 'DevOps Essentials', description: 'CI/CD, Docker, and Kubernetes.', progress: 90 },
    { id: 4, title: 'UI/UX Design Principles', description: 'Learn the fundamentals of creating beautiful and intuitive interfaces.', progress: 15 },
];

export const kanbanData = {
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

export const notesData = [
    { id: 'n-1', title: 'React Hooks Deep Dive', snippet: 'useState is for managing local component state...', tags: ['React', 'Hooks'] },
    { id: 'n-2', title: 'Docker Networking Basics', snippet: 'Bridge, host, and overlay networks are the main types...', tags: ['DevOps', 'Docker'] },
    { id: 'n-3', title: 'CSS Flexbox vs. Grid', snippet: 'Flexbox is for one-dimensional layouts, while Grid is for two-dimensional...', tags: ['CSS', 'Frontend'] },
];