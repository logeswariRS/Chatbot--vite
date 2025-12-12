import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, ThumbsUp, Trash2, Edit2, RotateCcw, Check, X } from 'lucide-react';
import QuickActions from './QuickActions';

const Message = ({ message, onDelete, onLike, onCopy, onEdit, onRegenerate, searchQuery, highlightText, onReaction }) => {
  const isUser = message.role === 'user';
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [copiedCodeBlock, setCopiedCodeBlock] = useState(null);
  const [reactions, setReactions] = useState(message.reactions || []);
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeBlock(index);
    setTimeout(() => setCopiedCodeBlock(null), 2000);
  };

  const handleSaveEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit({ ...message, content: editContent });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  // Highlight search query in content
  const renderContent = (content) => {
    if (searchQuery && highlightText) {
      return highlightText(content, searchQuery);
    }
    return content;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full animate-fade-in transition-all duration-200`}>
      <div className={`flex items-end space-x-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''} w-full`}>
        {/* Avatar with ring */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ring-2 transition-all duration-300 hover:scale-110 hover:ring-4 ${
          isUser 
            ? 'ring-blue-400 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse-slow' 
            : 'ring-purple-300 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800'
        }`}>
          {isUser ? (
            <User className="w-6 h-6 text-white drop-shadow-lg" />
          ) : (
            <Bot className="w-6 h-6 text-purple-600 dark:text-purple-300 drop-shadow-lg animate-bounce-slow" />
          )}
        </div>

        {/* Message Content */}
  <div className={`chat-bubble shadow-md group transition-all duration-200 transform hover:scale-[1.03] hover:shadow-lg ${isUser ? 'user-bubble bg-gradient-to-br from-primary-500 to-blue-500 text-white hover:ring-2 hover:ring-blue-300' : 'bot-bubble bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'} relative`}>
          {/* Message actions */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            {isUser ? (
              <>
                <button
                  title="Copy"
                  className="p-2 rounded-lg bg-white/90 hover:bg-blue-100 hover:text-blue-700 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                  onClick={() => onCopy && onCopy(message)}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  title="Edit"
                  className="p-2 rounded-lg bg-white/90 hover:bg-green-100 hover:text-green-700 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  title="Like"
                  className="p-2 rounded-lg bg-white/90 hover:bg-pink-100 hover:text-pink-700 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                  onClick={() => onLike && onLike(message)}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  title="Delete"
                  className="p-2 rounded-lg bg-white/90 hover:bg-red-100 hover:text-red-700 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                  onClick={() => onDelete && onDelete(message)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  title="Copy"
                  className="p-2 rounded-lg bg-white/90 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                  onClick={() => onCopy && onCopy(message)}
                >
                  <Copy className="w-4 h-4" />
                </button>
                {onRegenerate && (
                  <button
                    title="Regenerate"
                    className="p-2 rounded-lg bg-white/90 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                    onClick={() => onRegenerate(message)}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  title="Like"
                  className="p-2 rounded-lg bg-white/90 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-300 focus:outline-none transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                  onClick={() => onLike && onLike(message)}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                {onReaction && (
                  <QuickActions
                    onReaction={(msgId, emoji) => {
                      const newReactions = [...reactions, emoji];
                      setReactions(newReactions);
                      onReaction(msgId, emoji);
                    }}
                    messageId={message.id}
                  />
                )}
              </>
            )}
          </div>
          
          {/* Reactions display */}
          {reactions.length > 0 && (
            <div className="mt-2 flex gap-1 flex-wrap">
              {reactions.map((reaction, idx) => (
                <span
                  key={idx}
                  className="text-lg bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                >
                  {reaction}
                </span>
              ))}
            </div>
          )}
          {isEditing && isUser ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                rows={Math.min(editContent.split('\n').length, 10)}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');
                    const codeIndex = Math.random().toString(36).substring(7);
                    
                    return !inline && match ? (
                      <div className="relative group/codeblock my-2">
                        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover/codeblock:opacity-100 transition-opacity z-10">
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {match[1]}
                          </span>
                          <button
                            onClick={() => handleCopyCode(codeString, codeIndex)}
                            className="p-1.5 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                            title="Copy code"
                          >
                            {copiedCodeBlock === codeIndex ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md !mt-0"
                          showLineNumbers
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                          }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props}>
                        {children}
                      </code>
                    );
                  },
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>;
                },
                li({ children }) {
                  return <li className="text-sm">{children}</li>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                      {children}
                    </blockquote>
                  );
                },
                h1({ children }) {
                  return <h1 className="text-lg font-bold mb-2">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-base font-bold mb-2">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-sm font-bold mb-1">{children}</h3>;
                },
                strong({ children }) {
                  return <strong className="font-semibold">{children}</strong>;
                },
                em({ children }) {
                  return <em className="italic">{children}</em>;
                },
                a({ href, children }) {
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      {children}
                    </a>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          )}
          
          {/* AI Meta Data (only for assistant) */}
          {message.role === 'assistant' && message.meta && (
            <div className="mt-2 text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded px-2 py-1 flex flex-wrap gap-2">
              <span><strong>Source:</strong> {message.meta.source}</span>
              <span><strong>Confidence:</strong> {message.meta.confidence}</span>
              {message.meta.extra && <span><strong>Info:</strong> {message.meta.extra}</span>}
              {message.meta.keywords && message.meta.keywords.length > 0 && (
                <span><strong>Keywords:</strong> {message.meta.keywords.join(', ')}</span>
              )}
              {message.meta.sentiment && (
                <span><strong>Sentiment:</strong> {message.meta.sentiment}</span>
              )}
              {message.meta.intent && (
                <span><strong>Intent:</strong> {message.meta.intent}</span>
              )}
            </div>
          )}
          {/* Timestamp */}
          <div className={`text-[11px] text-gray-400 mt-2 ${isUser ? 'text-right' : 'text-left'} italic tracking-wide`}> 
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;





