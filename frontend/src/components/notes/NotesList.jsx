import React, { useState, useEffect } from 'react';
import { PlusCircle, Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { notesData as mockNotes } from '../../data/mockData'; // Using mock data for now
import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';
import NoteEditor from './NoteEditor';

const NotesList = () => {
    // --- State Management ---
    const [notes, setNotes] = useState([]);
    const [currentView, setCurrentView] = useState('list'); // 'list', 'viewing', 'editing', 'creating'
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching Simulation ---
    useEffect(() => {
        // Simulating an API call to fetch all notes
        setLoading(true);
        setTimeout(() => {
            setNotes(mockNotes);
            setLoading(false);
        }, 500);
    }, []);

    // --- Event Handlers ---
    const handleSelectNote = (note) => {
        setSelectedNote(note);
        setCurrentView('viewing');
    };

    const handleEditNote = () => {
        setCurrentView('editing');
    };

    const handleDeleteNote = (noteId) => {
        // In a real app, this would be an API call: await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
        setNotes(notes.filter(n => n.id !== noteId));
        setCurrentView('list');
        setSelectedNote(null);
    };

    const handleSaveNote = (noteToSave) => {
        let updatedNotes;
        if (noteToSave.id) {
            // Update existing note
            updatedNotes = notes.map(n => (n.id === noteToSave.id ? noteToSave : n));
        } else {
            // Create new note (with a temporary ID)
            const newNote = { ...noteToSave, id: `n-${Date.now()}` };
            updatedNotes = [newNote, ...notes];
        }
        setNotes(updatedNotes);
        setSelectedNote(noteToSave.id ? noteToSave : updatedNotes[0]);
        setCurrentView('viewing');
    };

    // --- Render Logic ---
    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center items-center h-full"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div>;
        }
        if (error) {
            return <div className="flex justify-center items-center h-full text-red-400"><AlertTriangle className="w-8 h-8 mr-2"/> {error}</div>;
        }

        switch (currentView) {
            case 'viewing':
                return <NoteDetail note={selectedNote} onEdit={handleEditNote} onDelete={handleDeleteNote} />;
            case 'editing':
            case 'creating':
                return <NoteEditor note={selectedNote} onSave={handleSaveNote} onCancel={() => setCurrentView(selectedNote ? 'viewing' : 'list')} />;
            default: // 'list' view
                return (
                    <div className="space-y-4">
                        {notes.map(note => (
                            <NoteItem key={note.id} note={note} onSelect={() => handleSelectNote(note)} />
                        ))}
                    </div>
                );
        }
    };

    return (
        <>
            <header className="mb-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {currentView !== 'list' && (
                        <button onClick={() => setCurrentView('list')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                            <ArrowLeft size={24} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-4xl font-bold">Knowledge Base</h1>
                        <p className="text-gray-400 mt-1">Your personal collection of notes.</p>
                    </div>
                </div>
                {currentView === 'list' && (
                    <button onClick={() => { setSelectedNote(null); setCurrentView('creating'); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        <PlusCircle size={20} /> New Note
                    </button>
                )}
            </header>
            {renderContent()}
        </>
    );
};

export default NotesList;