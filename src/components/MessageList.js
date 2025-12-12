import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';


const MessageList = ({ messages, isLoading, onDelete, onLike, onCopy, onEdit, onRegenerate, onReaction, searchQuery }) => {
  const highlightText = (text, query) => {
    if (!query || !query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 dark:bg-yellow-600 rounded px-1">{part}</mark>
      ) : part
    );
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} id={`message-${message.id}`}>
          <Message
            message={message}
            onDelete={onDelete}
            onLike={onLike}
            onCopy={onCopy}
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            onReaction={onReaction}
            searchQuery={searchQuery}
            highlightText={highlightText}
          />
        </div>
      ))}
      {isLoading && <TypingIndicator />}
      {messages.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No messages found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default MessageList;





