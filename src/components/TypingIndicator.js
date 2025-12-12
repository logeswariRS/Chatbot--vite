import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  const [funMessages] = useState([
    'AI is thinking... 🤔',
    'Crafting a response... ✨',
    'Processing your words... 🧠',
    'Almost there... 🚀',
    'Brewing some wisdom... ☕',
    'Connecting the dots... 🔗',
    'Spinning up magic... 🎩'
  ]);
  const [currentMessage, setCurrentMessage] = useState(funMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(funMessages[Math.floor(Math.random() * funMessages.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [funMessages]);

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ring-2 ring-purple-300 animate-pulse-slow">
          <Bot className="w-6 h-6 text-white drop-shadow-lg" />
        </div>

        {/* Typing Indicator */}
        <div className="chat-bubble bot-bubble bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-purple-200 dark:border-purple-700">
          <div className="typing-indicator">
            <div className="typing-dot bg-purple-500"></div>
            <div className="typing-dot bg-pink-500"></div>
            <div className="typing-dot bg-blue-500"></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium animate-pulse">
            {currentMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;





