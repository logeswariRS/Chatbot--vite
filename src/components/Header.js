import React, { useState, useMemo } from 'react';
import { PlusCircle, Trash2, Moon, Sun, Sparkles, Zap } from 'lucide-react';

const Header = ({
  onCreateNewChat,
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onUpdateTitle,
  darkMode,
  setDarkMode,
  personality,
  setPersonality,
  onConfetti
}) => {
  const currentConversation = useMemo(
    () => conversations.find((c) => c.id === currentConversationId) || null,
    [conversations, currentConversationId]
  );

  const [titleDraft, setTitleDraft] = useState(currentConversation?.title || '');
  const [clickCount, setClickCount] = useState(0);

  React.useEffect(() => {
    setTitleDraft(currentConversation?.title || '');
  }, [currentConversationId, currentConversation?.title]);

  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        if (onConfetti) onConfetti();
        setClickCount(0);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <header className="bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className={`container mx-auto px-4 py-4 max-w-6xl flex items-center gap-3 transition-all duration-300`}>
        <div 
          onClick={handleLogoClick}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200 flex-1 group"
        >
          <Sparkles className="w-6 h-6 text-purple-500 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative">
            AI Chatbot
            <Zap className="absolute -top-1 -right-6 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            className="border-2 border-primary-300 rounded-xl px-3 py-2 text-sm bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer dark:from-gray-800 dark:to-gray-700 dark:border-gray-600 dark:text-gray-200"
            value={personality}
            onChange={e => {
              setPersonality(e.target.value);
              if (onConfetti) onConfetti();
            }}
            title="Select AI Personality"
          >
            <option value="friendly">🤗 Friendly</option>
            <option value="professional">💼 Professional</option>
            <option value="humorous">😂 Humorous</option>
            <option value="concise">✂️ Concise</option>
          </select>
          <button
            onClick={() => {
              if (setDarkMode) setDarkMode((d) => !d);
              if (onConfetti) onConfetti();
            }}
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg transform ${
              darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 border-yellow-300 hover:from-yellow-300 hover:to-orange-300' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-300 border-gray-700 hover:from-gray-700 hover:to-gray-800'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
          </button>
          <button
            onClick={() => {
              onCreateNewChat();
              if (onConfetti) onConfetti();
            }}
            className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform"
            title="New Chat (Ctrl/Cmd + N)"
          >
            <PlusCircle className="w-4 h-4" /> 
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {currentConversation && (
        <div className="container mx-auto px-4 pb-4 max-w-6xl">
          <input
            type="text"
            className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
            value={titleDraft}
            placeholder="💬 Name your conversation..."
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={() => {
              if (titleDraft !== currentConversation.title) {
                onUpdateTitle(currentConversation.id, titleDraft.trim() || 'Untitled');
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;






