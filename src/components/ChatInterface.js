import React, { useEffect, useRef, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatAPI } from '../hooks/useChatAPI';
import Confetti from './Confetti';
import Toast from './Toast';

const ChatInterface = ({ conversation, onUpdateConversation, isLoading, setIsLoading, personality }) => {
  const { sendMessage, isLoading: apiLoading } = useChatAPI(personality);
  const containerRef = useRef(null);
  const [input, setInput] = useState('');
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [toast, setToast] = useState(null);

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

  // Message actions
  const handleDelete = (msg) => {
    const filtered = conversation.messages.filter(m => m.id !== msg.id);
    onUpdateConversation({ ...conversation, messages: filtered });
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

  // Clear chat handler
  const handleClearChat = () => {
    if (window.confirm('🧹 Are you sure you want to clear this chat? This action cannot be undone!')) {
      onUpdateConversation({ ...conversation, messages: [] });
      setToast({ message: 'Chat cleared! 🗑️', type: 'info' });
      setTimeout(() => setToast(null), 3000);
    }
  };
  // Export chat handler
  const handleExportChat = () => {
    const data = JSON.stringify(conversation.messages, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${conversation.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: '📥 Chat exported successfully!', type: 'success' });
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
                messages={conversation.messages}
                isLoading={apiLoading}
                onDelete={handleDelete}
                onLike={handleLike}
                onCopy={handleCopy}
              />
            )}
          </div>
        </div>

        {/* Chat actions */}
        {conversation.messages.length > 0 && (
          <div className="flex gap-3 justify-end px-6 pt-3">
            <button
              onClick={handleClearChat}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300 text-xs font-semibold border border-red-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 transform"
            >
              🧹 Clear Chat
            </button>
            <button
              onClick={handleExportChat}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 text-xs font-semibold border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 transform"
            >
              📥 Export Chat
            </button>
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






