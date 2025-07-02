import React from 'react';

const NoteItem = ({ note, onSelect }) => {
    return (
        <div 
            onClick={onSelect}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
        >
            <h3 className="text-lg font-bold text-white truncate">{note.title}</h3>
            <p className="text-gray-400 my-2 text-sm truncate">{note.snippet}</p>
            {note.tags && note.tags.length > 0 && (
                <div className="flex gap-2 mt-3">
                    {note.tags.map(tag => (
                        <span key={tag} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoteItem;