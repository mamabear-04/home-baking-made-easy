import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, ChevronRight, Hash } from 'lucide-react';

const PlaybookPage = () => {
  const [chapters, setChapters] = useState([
    { id: 'chapter-1-legal', title: 'Chapter 1: Legal Foundations', file: '/playbook/chapter-1-legal.md', content: '' },
    { id: 'chapter-2-operations', title: 'Chapter 2: mastering Operations', file: '/playbook/chapter-2-operations.md', content: '' },
  ]);
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(activeChapter.file);
        const text = await response.text();
        setChapters(prev => prev.map(ch => ch.id === activeChapter.id ? { ...ch, content: text } : ch));
      } catch (error) {
        console.error('Error fetching chapter:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [activeChapter]);

  return (
    <div className="min-h-screen bg-warm-flour py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <div className="inline-flex items-center space-x-2 text-crusty-sourdough uppercase tracking-widest text-xs font-bold mb-4">
            <BookOpen size={16} />
            <span>The Aspiring Baker Playbook</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-hearth">From Home Kitchen to Micro-Bakery</h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-2">
              <h3 className="text-sm font-bold text-herb-garden uppercase tracking-wider mb-6">Table of Contents</h3>
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(chapter)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    activeChapter.id === chapter.id 
                      ? 'bg-slate-hearth text-warm-flour shadow-lg' 
                      : 'hover:bg-crusty-sourdough/10 text-slate-hearth'
                  }`}
                >
                  <span className="font-medium text-sm">{chapter.title}</span>
                  <ChevronRight size={16} className={`transition-transform ${activeChapter.id === chapter.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <article className="lg:w-3/4 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-crusty-sourdough/5">
            {loading ? (
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-warm-flour rounded w-1/2"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-warm-flour rounded w-full"></div>
                  <div className="h-4 bg-warm-flour rounded w-5/6"></div>
                  <div className="h-4 bg-warm-flour rounded w-4/6"></div>
                </div>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none 
                prose-headings:font-serif prose-headings:text-slate-hearth
                prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-crusty-sourdough/20 prose-h2:pb-2
                prose-p:text-herb-garden prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-herb-garden prose-li:mb-2
                prose-strong:text-terracotta prose-strong:font-bold
                prose-code:bg-warm-flour prose-code:px-1 prose-code:rounded prose-code:text-terracotta
                ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {chapters.find(ch => ch.id === activeChapter.id)?.content || ''}
                </ReactMarkdown>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default PlaybookPage;
