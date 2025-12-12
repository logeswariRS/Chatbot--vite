import React, { useEffect, useRef, useState, useMemo } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatAPI } from '../hooks/useChatAPI';
import Confetti from './Confetti';
import Toast from './Toast';
import { Search, X } from 'lucide-react';

const ChatInterface = ({ conversation, onUpdateConversation, isLoading, setIsLoading, personality }) => {
  const { sendMessage, isLoading: apiLoading } = useChatAPI(personality);
  const containerRef = useRef(null);
  const [input, setInput] = useState('');
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [toast, setToast] = useState(null);
  const [messageSearch, setMessageSearch] = useState('');
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation?.messages?.length, apiLoading]);

  // Keep external loading state in sync with API hook
  useEffect(() => {
    if (typeof setIsLoading === 'function') {
      setIsLoading(apiLoading);
    }
  }, [apiLoading, setIsLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const now = new Date().toISOString();
    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: now
    };

    const updated = {
      ...conversation,
      messages: [...conversation.messages, userMessage]
    };
    onUpdateConversation(updated);
    setInput('');

    try {
      const aiResult = await sendMessage(updated.messages);
      const aiMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: aiResult.content,
        meta: aiResult.meta,
        timestamp: new Date().toISOString()
      };

      onUpdateConversation({
        ...updated,
        messages: [...updated.messages, aiMessage]
      });
      
      // Fun confetti for certain responses
      if (personality === 'humorous' || Math.random() > 0.7) {
        setConfettiTrigger(prev => prev + 1);
      }
    } catch (e) {
      const errorMessage = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, something went wrong while contacting the AI.',
        timestamp: new Date().toISOString()
      };
      onUpdateConversation({
        ...updated,
        messages: [...updated.messages, errorMessage]
      });
    }
  };

  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.keyCode === 13) && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  // Filter messages based on search
  const filteredMessages = useMemo(() => {
    if (!messageSearch.trim()) return conversation.messages;
    const query = messageSearch.toLowerCase();
    return conversation.messages.filter(msg => 
      msg.content.toLowerCase().includes(query)
    );
  }, [conversation.messages, messageSearch]);

  // Scroll to highlighted message
  useEffect(() => {
    if (highlightedMessageId) {
      const element = document.getElementById(`message-${highlightedMessageId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-yellow-400', 'ring-opacity-50');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-yellow-400', 'ring-opacity-50');
          setHighlightedMessageId(null);
        }, 2000);
      }
    }
  }, [highlightedMessageId]);

  // Message actions
  const handleDelete = (msg) => {
    const filtered = conversation.messages.filter(m => m.id !== msg.id);
    onUpdateConversation({ ...conversation, messages: filtered });
    setToast({ message: '🗑️ Message deleted!', type: 'info' });
    setTimeout(() => setToast(null), 3000);
  };
  const handleLike = (msg) => {
    setConfettiTrigger(prev => prev + 1);
    setToast({ message: '❤️ You liked this message!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };
  const handleCopy = (msg) => {
    navigator.clipboard.writeText(msg.content);
    setToast({ message: '📋 Message copied to clipboard!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };
  const handleEdit = (editedMsg) => {
    const updated = {
      ...conversation,
      messages: conversation.messages.map(m => 
        m.id === editedMsg.id ? editedMsg : m
      )
    };
    onUpdateConversation(updated);
    setToast({ message: '✏️ Message edited!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };
  const handleReaction = (messageId, emoji) => {
    const updated = {
      ...conversation,
      messages: conversation.messages.map(m => 
        m.id === messageId 
          ? { ...m, reactions: [...(m.reactions || []), emoji] }
          : m
      )
    };
    onUpdateConversation(updated);
  };

  const handleRegenerate = async (msg) => {
    // Find the user message that prompted this response
    const msgIndex = conversation.messages.findIndex(m => m.id === msg.id);
    if (msgIndex > 0) {
      const userMessage = conversation.messages[msgIndex - 1];
      if (userMessage.role === 'user') {
        // Remove the assistant message and regenerate
        const messagesUpToUser = conversation.messages.slice(0, msgIndex);
        const updated = {
          ...conversation,
          messages: messagesUpToUser
        };
        onUpdateConversation(updated);
        
        try {
          const aiResult = await sendMessage(updated.messages);
          const aiMessage = {
            id: `${Date.now()}-assistant`,
            role: 'assistant',
            content: aiResult.content,
            meta: aiResult.meta,
            timestamp: new Date().toISOString()
          };
          onUpdateConversation({
            ...updated,
            messages: [...updated.messages, aiMessage]
          });
          setToast({ message: '🔄 Response regenerated!', type: 'success' });
          setTimeout(() => setToast(null), 3000);
        } catch (e) {
          setToast({ message: '❌ Failed to regenerate response', type: 'error' });
          setTimeout(() => setToast(null), 3000);
        }
      }
    }
  };

  // Clear chat handler
  const handleClearChat = () => {
    if (window.confirm('🧹 Are you sure you want to clear this chat? This action cannot be undone!')) {
      onUpdateConversation({ ...conversation, messages: [] });
      setToast({ message: 'Chat cleared! 🗑️', type: 'info' });
      setTimeout(() => setToast(null), 3000);
    }
  };
  // Export chat handler with multiple formats
  const handleExportChat = (format = 'json') => {
    let data, mimeType, extension, filename;
    
    if (format === 'json') {
      data = JSON.stringify(conversation.messages, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else if (format === 'markdown') {
      data = conversation.messages.map(msg => {
        const role = msg.role === 'user' ? '**You**' : '**Assistant**';
        const timestamp = new Date(msg.timestamp).toLocaleString();
        return `${role} (${timestamp}):\n${msg.content}\n`;
      }).join('\n---\n\n');
      mimeType = 'text/markdown';
      extension = 'md';
    } else if (format === 'txt') {
      data = conversation.messages.map(msg => {
        const role = msg.role === 'user' ? 'You' : 'Assistant';
        const timestamp = new Date(msg.timestamp).toLocaleString();
        return `[${timestamp}] ${role}: ${msg.content}`;
      }).join('\n\n');
      mimeType = 'text/plain';
      extension = 'txt';
    }
    
    filename = `chat-${conversation.id || 'export'}.${extension}`;
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: `📥 Chat exported as ${format.toUpperCase()}!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <Confetti trigger={confettiTrigger} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/50 dark:from-gray-900/90 dark:via-gray-800/50 dark:to-gray-900/50 rounded-3xl shadow-2xl border-2 border-gray-200/50 dark:border-gray-700/50 max-w-4xl mx-auto my-8 flex flex-col min-h-[75vh] transition-all duration-300 hover:shadow-3xl">
        {/* Message Search */}
        {conversation.messages.length > 0 && (
          <div className="px-6 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={messageSearch}
                onChange={(e) => {
                  setMessageSearch(e.target.value);
                  if (e.target.value && filteredMessages.length > 0) {
                    setHighlightedMessageId(filteredMessages[0].id);
                  }
                }}
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/90 dark:bg-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              {messageSearch && (
                <>
                  <button
                    onClick={() => setMessageSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    {filteredMessages.length} found
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col">
          <div
            ref={containerRef}
            className="p-8 h-[65vh] overflow-y-auto custom-scrollbar flex-1 rounded-t-3xl"
          >
            {conversation.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-6xl mb-4 animate-bounce">👋</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome to the Chat!
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start a conversation and watch the magic happen ✨
                </p>
              </div>
            ) : (
              <MessageList
                messages={messageSearch ? filteredMessages : conversation.messages}
                isLoading={apiLoading}
                onDelete={handleDelete}
                onLike={handleLike}
                onCopy={handleCopy}
                onEdit={handleEdit}
                onRegenerate={handleRegenerate}
                onReaction={handleReaction}
                searchQuery={messageSearch}
              />
            )}
          </div>
        </div>

        {/* Chat actions */}
        {conversation.messages.length > 0 && (
          <div className="flex gap-2 justify-end px-6 pt-3 flex-wrap">
            <button
              onClick={handleClearChat}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300 text-xs font-semibold border border-red-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 transform"
            >
              🧹 Clear Chat
            </button>
            <div className="relative group">
              <button
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 text-xs font-semibold border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 transform"
              >
                📥 Export Chat
              </button>
              <div className="absolute right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 p-1 min-w-[120px]">
                  <button
                    onClick={() => handleExportChat('json')}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                  >
                    📄 JSON
                  </button>
                  <button
                    onClick={() => handleExportChat('markdown')}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                  >
                    📝 Markdown
                  </button>
                  <button
                    onClick={() => handleExportChat('txt')}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                  >
                    📄 Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border-t-2 border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white/90 to-blue-50/30 dark:from-gray-900/90 dark:to-gray-800/30 rounded-b-3xl">
          <MessageInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            onKeyPress={handleKeyPress}
            disabled={apiLoading}
            placeholder={personality === 'humorous' ? 'Type something funny... 😂' : personality === 'professional' ? 'How may I assist you?' : 'Type your message... ✨'}
          />
        </div>
      </div>
    </>
  );
};

export default ChatInterface;






