import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const MessageInput = ({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  disabled, 
  placeholder 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
    }
  };

  return (
    <div className="flex items-end space-x-3">
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border-2 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 ${
            isFocused 
              ? 'border-purple-400 shadow-lg shadow-purple-200/50 dark:shadow-purple-900/20' 
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
          rows="1"
          style={{ minHeight: '52px', maxHeight: '120px' }}
          onInput={(e) => {
            // Auto-resize textarea
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
        />
        {isFocused && (
          <Sparkles className="absolute right-3 top-3 w-5 h-5 text-purple-400 animate-pulse pointer-events-none" />
        )}
      </div>
      
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={`px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-110 disabled:hover:scale-100 ${
          !disabled && value.trim() ? 'animate-pulse-slow' : ''
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageInput;





