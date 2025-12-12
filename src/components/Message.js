import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, ThumbsUp, Trash2 } from 'lucide-react';

const Message = ({ message, onDelete, onLike, onCopy }) => {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`flex items-end space-x-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''} w-full`}>
        {/* Avatar with ring */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ring-2 ${isUser ? 'ring-primary-400 bg-gradient-to-br from-primary-500 to-blue-400' : 'ring-gray-300 bg-gray-200'}`}>
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-gray-600" />
          )}
        </div>

        {/* Message Content */}
  <div className={`chat-bubble shadow-md group transition-all duration-200 transform hover:scale-[1.03] hover:shadow-lg ${isUser ? 'user-bubble bg-gradient-to-br from-primary-500 to-blue-500 text-white hover:ring-2 hover:ring-blue-300' : 'bot-bubble bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'} relative`}>
          {/* Message actions for user messages */}
          {isUser && (
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                title="Copy"
                className="p-1 rounded hover:bg-blue-100 hover:text-blue-700 focus:outline-none"
                onClick={() => onCopy && onCopy(message)}
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                title="Like"
                className="p-1 rounded hover:bg-green-100 hover:text-green-700 focus:outline-none"
                onClick={() => onLike && onLike(message)}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                title="Delete"
                className="p-1 rounded hover:bg-red-100 hover:text-red-700 focus:outline-none"
                onClick={() => onDelete && onDelete(message)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
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





