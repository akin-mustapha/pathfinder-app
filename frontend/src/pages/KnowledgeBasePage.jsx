import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Tag, Link as LinkIcon, Loader2, AlertTriangle, Save, X, BookOpen } from 'lucide-react';
import NoteListPanel from '../components/knowledgeBase/NoteListPanel';
import NoteDetailView from '../components/knowledgeBase/NoteDetailView';
import NoteEditorView from '../components/knowledgeBase/NoteEditorView';

const KnowledgeBasePage = () => {
    const { articleId } = useParams();
    const isEditing = useLocation().pathname.endsWith('/edit');
    const isCreating = useLocation().pathname.endsWith('/new');
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    useEffect(() => { /* Fetch list of articles */ setIsLoadingList(false); setArticles([{id: 'kb-1', title: 'React Hooks Deep Dive', snippet: 'useState is for...'}]); }, []);
    useEffect(() => {
        if (articleId && !isCreating) {
            setIsLoadingDetail(true);
            setSelectedArticle({ id: articleId, title: 'React Hooks Deep Dive', content: '# Hooks are cool' });
            setIsLoadingDetail(false);
        } else { setSelectedArticle(null); }
    }, [articleId, isCreating]);
    const handleSave = async (data) => { navigate(`/kb/${isEditing ? articleId : 'kb-new'}`); };
    const handleDelete = async (id) => { if (window.confirm('Are you sure?')) navigate('/kb'); };
    const renderMainPanel = () => {
        if (isCreating || isEditing) return <NoteEditorView existingArticle={selectedArticle} onSave={handleSave} onCancel={() => navigate(isEditing ? `/kb/${articleId}` : '/kb')} />;
        if (isLoadingDetail) return <div className="flex justify-center items-center h-full"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;
        if (articleId && selectedArticle) return <NoteDetailView article={selectedArticle} onEdit={() => navigate(`/kb/${articleId}/edit`)} onDelete={handleDelete} />;
        return <div className="flex flex-col justify-center items-center h-full text-center text-text-muted"><BookOpen size={64} /><h2 className="mt-4 text-2xl font-semibold">Welcome to the Knowledge Base</h2><p>Select or create an article to get started.</p></div>;
    };
    return (
        <div className="flex h-full gap-4"><NoteListPanel articles={articles} selectedArticleId={articleId} isLoading={isLoadingList} onNewArticle={() => navigate('/kb/new')} /><main className="layout-main !p-0">{renderMainPanel()}</main></div>
    );
};
export default KnowledgeBasePage;