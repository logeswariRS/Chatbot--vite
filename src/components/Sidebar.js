import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Search, 
  X, 
  Trash2, 
  Settings, 
  Keyboard,
  BarChart3,
  FileText,
  Download,
  Upload,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  isOpen,
  onToggle,
  darkMode,
  onExportAll,
  onImport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase();
    return conversations.filter(conv => 
      conv.title?.toLowerCase().includes(query) ||
      conv.messages?.some(msg => msg.content.toLowerCase().includes(query))
    );
  }, [conversations, searchQuery]);

  const stats = useMemo(() => {
    const totalMessages = conversations.reduce((acc, conv) => acc + (conv.messages?.length || 0), 0);
    const totalWords = conversations.reduce((acc, conv) => 
      acc + (conv.messages?.reduce((sum, msg) => sum + msg.content.split(' ').length, 0) || 0), 0
    , 0);
    return {
      totalConversations: conversations.length,
      totalMessages,
      totalWords,
      avgMessagesPerConv: conversations.length > 0 ? Math.round(totalMessages / conversations.length) : 0
    };
  }, [conversations]);

  const handleExportAll = () => {
    const data = JSON.stringify(conversations, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-conversations-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (onExportAll) onExportAll();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (onImport) onImport(imported);
          } catch (error) {
            alert('Failed to import conversations. Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const keyboardShortcuts = [
    { key: 'Ctrl/Cmd + K', desc: 'Focus search' },
    { key: 'Ctrl/Cmd + N', desc: 'New chat' },
    { key: 'Ctrl/Cmd + /', desc: 'Show shortcuts' },
    { key: 'Esc', desc: 'Close sidebar' },
    { key: 'Ctrl/Cmd + Enter', desc: 'Send message' },
    { key: 'Ctrl/Cmd + E', desc: 'Export chat' },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed left-4 top-20 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : ''
        }`}
        title="Toggle Sidebar"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r-2 border-gray-200 dark:border-gray-700 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversations
              </h2>
              <button
                onClick={onToggle}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                title="Close Sidebar"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/90 dark:bg-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex gap-2 flex-wrap">
            <button
              onClick={onNewChat}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-md"
            >
              + New Chat
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-semibold transition-all duration-200"
              title="Statistics"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-semibold transition-all duration-200"
              title="Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-semibold transition-all duration-200"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Panel */}
          {showStats && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h3 className="font-bold text-sm mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400">Conversations</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.totalConversations}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400">Messages</div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.totalMessages}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400">Words</div>
                  <div className="text-lg font-bold text-pink-600 dark:text-pink-400">{stats.totalWords.toLocaleString()}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400">Avg/Conv</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{stats.avgMessagesPerConv}</div>
                </div>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Panel */}
          {showShortcuts && (
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h3 className="font-bold text-sm mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Keyboard className="w-4 h-4" />
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-xs">
                {keyboardShortcuts.map((shortcut, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">{shortcut.desc}</span>
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono text-xs">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h3 className="font-bold text-sm mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Data Management
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handleExportAll}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-semibold transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Export All Conversations
                </button>
                <button
                  onClick={handleImport}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 text-sm font-semibold transition-all duration-200"
                >
                  <Upload className="w-4 h-4" />
                  Import Conversations
                </button>
              </div>
            </div>
          )}

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                      currentConversationId === conv.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm truncate ${
                          currentConversationId === conv.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {conv.title || 'Untitled Conversation'}
                        </div>
                        <div className={`text-xs mt-1 truncate ${
                          currentConversationId === conv.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {conv.messages?.length || 0} messages
                        </div>
                        {conv.messages && conv.messages.length > 0 && (
                          <div className={`text-xs mt-1 truncate ${
                            currentConversationId === conv.id ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {conv.messages[conv.messages.length - 1]?.content?.substring(0, 50)}...
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Delete this conversation?')) {
                            onDeleteConversation(conv.id);
                          }
                        }}
                        className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500 hover:text-white transition-all duration-200 ${
                          currentConversationId === conv.id ? 'text-white/70 hover:text-white' : 'text-gray-400'
                        }`}
                        title="Delete Conversation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;

