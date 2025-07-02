import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Tag, Link as LinkIcon, Loader2, AlertTriangle, Save, X, BookOpen } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleListPanel = ({ articles, selectedArticleId, isLoading, onNewArticle }) => (
    <aside className="layout-sidebar w-full md:w-1/3 lg:w-1/4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Knowledge Base</h2>
            <button onClick={onNewArticle} className="icon-button-default"><PlusCircle size={22} /></button>
        </div>
        <div className="overflow-y-auto">
            {isLoading ? <div className="text-text-muted text-center p-4">Loading...</div> : articles.map(article => (
                <Link to={`/kb/${article.id}`} key={article.id} className={`block p-3 rounded-lg mb-2 transition-colors ${selectedArticleId === article.id ? 'bg-primary/20' : 'hover:bg-bg-muted'}`}>
                    <h3 className="font-bold text-text-base truncate">{article.title}</h3>
                    <p className="text-sm text-text-muted truncate mt-1">{article.snippet}</p>
                </Link>
            ))}
        </div>
    </aside>
);

const ArticleDetailView = ({ article, onEdit, onDelete }) => (
    <div className="p-2 md:p-6">
        <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold">{article.title}</h1>
            <div className="flex gap-2 shrink-0 ml-4">
                <button onClick={() => onEdit(article.id)} className="icon-button-default"><Edit size={20}/></button>
                <button onClick={() => onDelete(article.id)} className="icon-button-danger"><Trash2 size={20}/></button>
            </div>
        </div>
        {article.tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-6 text-text-muted"><Tag size={16} className="shrink-0"/>
                {article.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
        )}
        <article className="prose prose-invert prose-lg max-w-none"><ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} /></article>
    </div>
);

const ArticleEditorView = ({ existingArticle, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => { setTitle(existingArticle?.title || ''); setContent(existingArticle?.content || ''); }, [existingArticle]);
    const handleSave = async (e) => { e.preventDefault(); setIsSubmitting(true); await onSave({ title, content }); setIsSubmitting(false); };
    return (
        <form onSubmit={handleSave} className="p-2 md:p-6 h-full flex flex-col gap-4">
            <header className="flex justify-between items-center shrink-0">
                <h1 className="text-3xl font-bold">{existingArticle ? 'Edit Article' : 'Create New Article'}</h1>
                <div className="flex items-center gap-4">
                    <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}<span>{isSubmitting ? 'Saving...' : 'Save'}</span>
                    </button>
                </div>
            </header>
            <input type="text" placeholder="Article Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-base text-2xl font-bold bg-transparent border-x-0 border-t-0 rounded-none !p-2" required />
            <div data-color-mode="dark" className="flex-grow min-h-0"><MDEditor value={content} onChange={setContent} height="100%" /></div>
        </form>
    );
};

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
        if (isCreating || isEditing) return <ArticleEditorView existingArticle={selectedArticle} onSave={handleSave} onCancel={() => navigate(isEditing ? `/kb/${articleId}` : '/kb')} />;
        if (isLoadingDetail) return <div className="flex justify-center items-center h-full"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;
        if (articleId && selectedArticle) return <ArticleDetailView article={selectedArticle} onEdit={() => navigate(`/kb/${articleId}/edit`)} onDelete={handleDelete} />;
        return <div className="flex flex-col justify-center items-center h-full text-center text-text-muted"><BookOpen size={64} /><h2 className="mt-4 text-2xl font-semibold">Welcome to the Knowledge Base</h2><p>Select or create an article to get started.</p></div>;
    };
    return (
        <div className="flex h-full gap-4"><ArticleListPanel articles={articles} selectedArticleId={articleId} isLoading={isLoadingList} onNewArticle={() => navigate('/kb/new')} /><main className="layout-main !p-0">{renderMainPanel()}</main></div>
    );
};
export default KnowledgeBasePage;