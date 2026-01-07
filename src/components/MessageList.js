import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';


const MessageList = ({ messages, isLoading, onDelete, onLike, onCopy }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onDelete={onDelete}
          onLike={onLike}
          onCopy={onCopy}
        />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default MessageList;





