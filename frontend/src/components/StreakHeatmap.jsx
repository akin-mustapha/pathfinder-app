import { useState, useEffect, useMemo } from 'react';

const DAYS_IN_WEEK = 7;
const MONTH_LABEL_HEIGHT = 24;
const CELL_SIZE = 16; // px
const CELL_GAP = 4; // px

const StreakHeatmap = () => {
    const [contributions, setContributions] = useState([]);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

    // Generate mock data for 1 year
    useEffect(() => {
        const today = new Date();
        const data = [];
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const count = Math.random() > 0.3 ? 0 : Math.floor(Math.random() * 15) + 1;
            data.push({ date, count });
        }
        setContributions(data.reverse());
    }, []);

    const getColorClass = (count) => {
        if (count === 0) return 'heatmap-cell--0';
        if (count < 4) return 'heatmap-cell--1';
        if (count < 8) return 'heatmap-cell--2';
        if (count < 12) return 'heatmap-cell--3';
        return 'heatmap-cell--4';
    };

    // Tooltip logic
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

    // Calculate grid and month labels
    const { gridCells, monthLabels } = useMemo(() => {
        if (!contributions.length) return { gridCells: [], monthLabels: [] };
        const cells = [];
        const monthLabels = [];
        const startDate = contributions[0].date;
        const startDay = startDate.getDay();
        // Fill empty cells for the first week
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} style={{ width: CELL_SIZE, height: CELL_SIZE }} />);
        }
        let lastMonth = -1;
        contributions.forEach((day, idx) => {
            const week = Math.floor((idx + startDay) / DAYS_IN_WEEK);
            const month = day.date.getMonth();
            if (day.date.getDate() === 1 && month !== lastMonth) {
                monthLabels.push(
                    <span key={month} className="text-xs text-text-muted absolute" style={{ left: `${week * (CELL_SIZE + CELL_GAP)}px`, top: 0 }}>{day.date.toLocaleString('default', { month: 'short' })}</span>
                );
                lastMonth = month;
            }
            cells.push(
                <div
                    key={day.date.toISOString()}
                    className={`heatmap-cell ${getColorClass(day.count)}`}
                    onMouseOver={e => handleMouseOver(e, day)}
                    onMouseOut={handleMouseOut}
                    aria-label={`${day.count} topics on ${day.date.toDateString()}`}
                    style={{ margin: `${CELL_GAP / 2}px` }}
                />
            );
        });
        return { gridCells: cells, monthLabels };
    }, [contributions]);

    return (
        <div className="card w-full max-w-3xl relative" style={{ minHeight: 220 }}>
            <h3 className="text-lg font-semibold mb-4">Learning Streak</h3>
            <div className="flex">
                <div className="flex flex-col justify-around text-xs text-text-muted pr-2 py-1 h-32">
                    <span>Mon</span><span>Wed</span><span>Fri</span>
                </div>
                <div className="flex-grow relative">
                    <div className="relative" style={{ height: MONTH_LABEL_HEIGHT }}>{monthLabels}</div>
                    <div className="grid grid-flow-col grid-rows-7 gap-1" style={{ marginTop: 4 }}>{gridCells}</div>
                </div>
            </div>
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