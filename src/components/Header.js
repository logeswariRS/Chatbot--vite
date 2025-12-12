import React, { useState, useMemo } from 'react';
import { PlusCircle, Trash2, Moon, Sun } from 'lucide-react';

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
  setPersonality
}) => {
  const currentConversation = useMemo(
    () => conversations.find((c) => c.id === currentConversationId) || null,
    [conversations, currentConversationId]
  );

  const [titleDraft, setTitleDraft] = useState(currentConversation?.title || '');

  React.useEffect(() => {
    setTitleDraft(currentConversation?.title || '');
  }, [currentConversationId, currentConversation?.title]);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center gap-3">
        <div className="text-xl font-semibold flex-1">AI Chatbot</div>

        <div className="flex items-center gap-2">
          <select
            className="border border-primary-300 rounded-lg px-2 py-2 text-sm bg-primary-50 text-primary-700 font-semibold"
            value={personality}
            onChange={e => setPersonality(e.target.value)}
            title="Select AI Personality"
          >
            <option value="friendly">🤗 Friendly</option>
            <option value="professional">💼 Professional</option>
            <option value="humorous">😂 Humorous</option>
            <option value="concise">✂️ Concise</option>
          </select>
          <button
            onClick={() => setDarkMode && setDarkMode((d) => !d)}
            className={"inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm transition-colors " + (darkMode ? 'bg-gray-800 text-yellow-300 border-gray-700 hover:bg-gray-700' : '')}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={currentConversationId || ''}
            onChange={(e) => onSelectConversation(e.target.value)}
         >
            {conversations.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title || 'Untitled'}
              </option>
            ))}
          </select>

          <button
            onClick={onCreateNewChat}
            className="inline-flex items-center gap-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            <PlusCircle className="w-4 h-4" /> New Chat
          </button>

          {currentConversation && (
            <button
              onClick={() => onDeleteConversation(currentConversation.id)}
              className="inline-flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
        </div>
      </div>

      {currentConversation && (
        <div className="container mx-auto px-4 pb-4 max-w-4xl">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={titleDraft}
            placeholder="Conversation title"
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={() => {
              if (titleDraft !== currentConversation.title) {
                onUpdateTitle(currentConversation.id, titleDraft.trim() || 'Untitled');
              }
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;






