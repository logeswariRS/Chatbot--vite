import React, { useEffect, useRef, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatAPI } from '../hooks/useChatAPI';

const ChatInterface = ({ conversation, onUpdateConversation, isLoading, setIsLoading, personality }) => {
  const { sendMessage, isLoading: apiLoading } = useChatAPI(personality);
  const containerRef = useRef(null);
  const [input, setInput] = useState('');

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
    // You can implement like logic here (e.g., add a liked property or toast)
    alert('You liked this message!');
  };
  const handleCopy = (msg) => {
    navigator.clipboard.writeText(msg.content);
    alert('Message copied!');
  };

  // Clear chat handler
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this chat?')) {
      onUpdateConversation({ ...conversation, messages: [] });
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
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-3xl mx-auto my-12 flex flex-col min-h-[70vh] transition-all">
      <div className="flex-1 flex flex-col">
        <div
          ref={containerRef}
          className="p-8 h-[60vh] overflow-y-auto custom-scrollbar flex-1 rounded-3xl"
        >
          <MessageList
            messages={conversation.messages}
            isLoading={apiLoading}
            onDelete={handleDelete}
            onLike={handleLike}
            onCopy={handleCopy}
          />
        </div>
      </div>

      {/* Chat actions */}
      <div className="flex gap-3 justify-end px-6 pt-3">
        <button
          onClick={handleClearChat}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300 text-xs font-semibold border border-red-200 shadow-sm hover:shadow-md transition-all"
        >
          Clear Chat
        </button>
        <button
          onClick={handleExportChat}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 text-xs font-semibold border border-blue-200 shadow-sm hover:shadow-md transition-all"
        >
          Export Chat
        </button>
      </div>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 rounded-b-3xl">
        <MessageInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          disabled={apiLoading}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatInterface;






