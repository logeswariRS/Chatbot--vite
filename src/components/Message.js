import React from 'react';
import { Bot, User, Heart, Copy, Trash2 } from 'lucide-react';

const Message = ({ message, onDelete, onLike, onCopy }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ring-2 ring-purple-300">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
        <div
          className={`chat-bubble ${
            isUser ? 'user-bubble' : 'bot-bubble'
          } ${isUser ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'}`}
        >
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
          {message.meta && !isUser && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                {message.meta.keywords && message.meta.keywords.length > 0 && (
                  <span>Keywords: {message.meta.keywords.slice(0, 3).join(', ')}</span>
                )}
                {message.meta.confidence && (
                  <span>• {message.meta.confidence}</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={`flex items-center space-x-2 mt-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => onLike(message.id)}
            className={`p-1.5 rounded-full transition-colors ${
              message.liked
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Like"
          >
            <Heart className={`w-4 h-4 ${message.liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onCopy(message.content)}
            className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4" />
          </button>
          {isUser && (
            <button
              onClick={() => onDelete(message.id)}
              className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center ring-2 ring-blue-300">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default Message;
