import { useState, useEffect, useMemo } from 'react';

const StreakHeatmap = () => {
    const [contributionData, setContributionData] = useState(new Map());
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
    const TOTAL_DAYS = 365;

    useEffect(() => { /* Data generation logic remains the same */ }, []);

    // The logic is now in CSS, the function just returns a class name
    const getColorClass = (count) => {
        if (count === 0) return 'heatmap-cell--0';
        if (count < 4) return 'heatmap-cell--1';
        if (count < 8) return 'heatmap-cell--2';
        if (count < 12) return 'heatmap-cell--3';
        return 'heatmap-cell--4';
    };

    const handleMouseOver = (e, day) => { /* Logic remains the same */ };
    const handleMouseOut = () => { /* Logic remains the same */ };

    const { gridCells, monthLabels } = useMemo(() => {
        // ... calculation logic remains the same ...
        // The only change is in the `cells.push` part:
        // cells.push(<div key={...} className={`heatmap-cell ${getColorClass(count)}`} ... />);
        return { gridCells: [], monthLabels: [] }; // Placeholder for brevity
    }, [contributionData]);

    return (
        <div className="card w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-4">Learning Streak</h3>
            {/* ... rest of the JSX structure remains the same, but without styling classes ... */}
            <div className="flex items-center justify-end w-full mt-4 text-xs text-text-muted">
                <span>Less</span>
                <div className="heatmap-cell heatmap-cell--0 mx-1"></div>
                <div className="heatmap-cell heatmap-cell--1 mx-1"></div>
                <div className="heatmap-cell heatmap-cell--2 mx-1"></div>
                <div className="heatmap-cell heatmap-cell--3 mx-1"></div>
                <div className="heatmap-cell heatmap-cell--4 mx-1"></div>
                <span>More</span>
            </div>
            {tooltip.visible && <div className="heatmap-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.content}</div>}
        </div>
    );
};
export default StreakHeatmap;