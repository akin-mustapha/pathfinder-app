import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// --- Import UI Components ---
import { PlusCircle, Edit, Trash2, Tag, Link as LinkIcon, Loader, AlertTriangle, Save, X, BookOpen, ChevronLeft } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ===================================================================================
// CHILD COMPONENT: NoteListPanel (The sidebar list of notes)
// ===================================================================================
const NoteListPanel = ({ notes, selectedNoteId, isLoading, onNewNote }) => (
    <div className="bg-gray-800/50 rounded-2xl w-full md:w-1/3 lg:w-1/4 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4 shrink-0">
            <h2 className="text-xl font-bold text-white">My Notes</h2>
            <button onClick={onNewNote} className="p-2 text-gray-400 hover:text-white transition-colors">
                <PlusCircle size={22} />
            </button>
        </div>
        <div className="overflow-y-auto">
            {isLoading && <div className="text-gray-400 text-center p-4">Loading notes...</div>}
            {!isLoading && notes.map(note => (
                <Link to={`/notes/${note.id}`} key={note.id}
                    className={`block p-3 rounded-lg mb-2 transition-colors ${selectedNoteId === note.id ? 'bg-blue-600/50' : 'hover:bg-gray-700/70'}`}
                >
                    <h3 className="font-bold text-white truncate">{note.title}</h3>
                    <p className="text-sm text-gray-400 truncate mt-1">{note.snippet}</p>
                </Link>
            ))}
        </div>
    </div>
);


// ===================================================================================
// CHILD COMPONENT: NoteDetailView
// ===================================================================================
const NoteDetailView = ({ note, onEdit, onDelete }) => (
    <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">{note.title}</h1>
            <div className="flex gap-2 shrink-0 ml-4">
                <button onClick={() => onEdit(note.id)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"><Edit size={20}/></button>
                <button onClick={() => onDelete(note.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-full transition-colors"><Trash2 size={20}/></button>
            </div>
        </div>
        {note.tags && note.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-6 text-gray-400">
                <Tag size={16} className="shrink-0"/>
                {note.tags.map(tag => <span key={tag} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>)}
            </div>
        )}
        <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
                children={note.content}
                remarkPlugins={[remarkGfm]}
                components={{ code: CodeBlock }}
            />
        </article>
    </div>
);


// ===================================================================================
// CHILD COMPONENT: NoteEditorView
// ===================================================================================
const NoteEditorView = ({ existingNote, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setContent(existingNote.content);
            setTags(existingNote.tags || []);
        } else {
            setTitle('');
            setContent('');
            setTags([]);
        }
    }, [existingNote]);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const noteData = { title, content, tags };
        await onSave(noteData); // Parent component handles API call and navigation
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSave} className="p-6 md:p-8 h-full flex flex-col">
             <header className="flex justify-between items-center mb-6 shrink-0">
                <h1 className="text-3xl font-bold text-white">{existingNote ? 'Edit Note' : 'Create New Note'}</h1>
                <div className="flex items-center gap-4">
                     <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-blue-800">
                        {isSubmitting ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                        {isSubmitting ? 'Saving...' : 'Save Note'}
                    </button>
                </div>
            </header>
             <div className="space-y-6 flex-grow flex flex-col min-h-0">
                <div className="shrink-0">
                    <input
                        type="text" placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none py-2 border-b-2 border-gray-700 focus:border-blue-500" required
                    />
                </div>
                <div data-color-mode="dark" className="flex-grow flex flex-col min-h-0">
                    <MDEditor value={content} onChange={setContent} height="100%" preview="live" />
                </div>
            </div>
        </form>
    );
};


// ===================================================================================
// MAIN PAGE COMPONENT: NotesPage
// ===================================================================================
const NotesPage = () => {
    const { noteId, action } = useParams(); // action can be 'edit'
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    // Fetch the list of all notes
    useEffect(() => {
        // TODO: Replace with real API call to GET /api/notes/by_user/{userId}
        const mockNotes = [
            { id: 'n-1', title: 'React Hooks Deep Dive', snippet: 'useState is for managing local component state...' },
            { id: 'n-2', title: 'Docker Networking Basics', snippet: 'Bridge, host, and overlay networks are the main types...' },
            { id: 'n-3', title: 'CSS Flexbox vs. Grid', snippet: 'Flexbox is for one-dimensional layouts...' },
        ];
        setTimeout(() => {
            setNotes(mockNotes);
            setIsLoadingList(false);
        }, 500);
    }, []);

    // Fetch the detail of the selected note when noteId changes
    useEffect(() => {
        if (noteId && noteId !== 'new') {
            setIsLoadingDetail(true);
            // TODO: Replace with real API call to GET /api/notes/{noteId}
            const mockNoteDetail = {
                id: noteId, title: 'React Hooks Deep Dive', content: '# Understanding React Hooks\n\n- `useState`\n- `useEffect`', tags: ['React', 'Hooks']
            };
            setTimeout(() => {
                setSelectedNote(mockNoteDetail);
                setIsLoadingDetail(false);
            }, 300);
        } else {
            setSelectedNote(null);
        }
    }, [noteId]);

    const handleSaveNote = async (noteData) => {
        // This function handles both creating and updating notes
        const isEditing = noteId && noteId !== 'new';
        console.log(isEditing ? 'Updating' : 'Creating', 'note:', noteData);
        // TODO: Replace with real API call: POST for new, PUT for edit
        await new Promise(res => setTimeout(res, 1000));
        const savedNoteId = isEditing ? noteId : 'n-4'; // a new ID from the backend
        navigate(`/notes/${savedNoteId}`);
    };
    
    const handleNewNote = () => {
        navigate('/notes/new');
    };

    const handleEditNote = (id) => {
        navigate(`/notes/${id}/edit`);
    };

    const handleDeleteNote = async (id) => {
        if(window.confirm('Are you sure you want to delete this note?')) {
            console.log(`Deleting note ${id}...`);
            // TODO: Replace with real API call to DELETE /api/notes/{id}
            navigate('/notes');
        }
    };
    
    const handleCancelEdit = () => {
        navigate(noteId ? `/notes/${noteId}` : '/notes');
    };

    // Determine what to show in the main panel
    const renderMainPanel = () => {
        if (noteId === 'new' || action === 'edit') {
            return <NoteEditorView existingNote={selectedNote} onSave={handleSaveNote} onCancel={handleCancelEdit} />;
        }
        if (isLoadingDetail) {
            return <div className="flex justify-center items-center h-full"><Loader className="animate-spin text-blue-500" size={48} /></div>;
        }
        if (selectedNote) {
            return <NoteDetailView note={selectedNote} onEdit={handleEditNote} onDelete={handleDeleteNote} />;
        }
        return (
            <div className="flex flex-col justify-center items-center h-full text-center text-gray-500">
                <BookOpen size={64} />
                <h2 className="mt-4 text-2xl font-semibold">Select a note</h2>
                <p>Choose a note from the list to view its content, or create a new one.</p>
                <button onClick={handleNewNote} className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    <PlusCircle size={20} /> Create New Note
                </button>
            </div>
        );
    };

    return (
        <div className="flex h-full gap-4">
            <NoteListPanel 
                notes={notes}
                selectedNoteId={noteId}
                isLoading={isLoadingList}
                onNewNote={handleNewNote}
            />
            <main className="flex-1 bg-gray-800/50 rounded-2xl overflow-y-auto">
                {renderMainPanel()}
            </main>
        </div>
    );
};

// --- Helper component for code block syntax highlighting ---
const CodeBlock = ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
        <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            {...props}
        />
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    )
};

export default NotesPage;