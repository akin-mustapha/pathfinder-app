import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const NoteListPanel = ({ notes = [], selectedNoteId, isLoading, onNewNote }) => (
    <aside className="layout-sidebar w-full md:w-1/3 lg:w-1/4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Knowledge Base</h2>
            <button onClick={onNewNote} className="icon-button-default"><PlusCircle size={22} /></button>
        </div>
        <div className="overflow-y-auto">
            {isLoading ? <div className="text-text-muted text-center p-4">Loading...</div> : (Array.isArray(notes) ? notes.map(note => (
                <Link to={`/kb/${note.id}`} key={note.id} className={`block p-3 rounded-lg mb-2 transition-colors ${selectedNoteId === note.id ? 'bg-primary/20' : 'hover:bg-bg-muted'}`}>
                    <h3 className="font-bold text-text-base truncate">{note.title}</h3>
                    <p className="text-sm text-text-muted truncate mt-1">{note.snippet}</p>
                </Link>
            )) : null)}
        </div>
    </aside>
);

export default NoteListPanel;
