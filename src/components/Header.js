import React, { useState } from 'react';
import { Plus, Moon, Sun, Settings, X, Edit2, Trash2, Check } from 'lucide-react';

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
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleEditStart = (conversation) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title);
  };

  const handleEditSave = (conversationId) => {
    if (editTitle.trim()) {
      onUpdateTitle(conversationId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const personalities = [
    { value: 'friendly', label: 'Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'concise', label: 'Concise' }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 overflow-x-auto">
            <button
              onClick={onCreateNewChat}
              className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>

            <div className="flex space-x-2 overflow-x-auto pb-2 flex-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentConversationId === conversation.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  {editingId === conversation.id ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleEditSave(conversation.id);
                          if (e.key === 'Escape') handleEditCancel();
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                        autoFocus
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditSave(conversation.id);
                        }}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCancel();
                        }}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium truncate max-w-[150px]">
                        {conversation.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStart(conversation);
                        }}
                        className="p-1 hover:bg-white/20 dark:hover:bg-gray-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="p-1 hover:bg-red-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettings && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSettings(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 p-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                      Personality
                    </div>
                    {personalities.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => {
                          setPersonality(p.value);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          personality === p.value
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
