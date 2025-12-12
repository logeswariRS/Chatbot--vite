import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <Bot className="w-5 h-5 text-gray-600" />
        </div>

        {/* Typing Indicator */}
        <div className="chat-bubble bot-bubble">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <div className="text-xs text-gray-500 mt-2">AI is typing...</div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;





