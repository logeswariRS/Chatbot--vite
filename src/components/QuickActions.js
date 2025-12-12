import React, { useState } from 'react';
import { Smile, ThumbsUp, Heart, Flame, Star, Hand } from 'lucide-react';

const QuickActions = ({ onReaction, messageId }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const reactions = [
    { emoji: '👍', icon: ThumbsUp, label: 'Like' },
    { emoji: '❤️', icon: Heart, label: 'Love' },
    { emoji: '🔥', icon: Flame, label: 'Fire' },
    { emoji: '⭐', icon: Star, label: 'Star' },
    { emoji: '👏', icon: Hand, label: 'Clap' },
    { emoji: '😊', icon: Smile, label: 'Smile' },
  ];

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction.emoji);
    if (onReaction) {
      onReaction(messageId, reaction.emoji);
    }
    setShowPicker(false);
    setTimeout(() => setSelectedReaction(null), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Add reaction"
      >
        <Smile className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
      
      {showPicker && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowPicker(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 p-2 z-20 flex gap-1">
            {reactions.map((reaction, idx) => {
              const Icon = reaction.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleReaction(reaction)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-125 transform"
                  title={reaction.label}
                >
                  <span className="text-xl">{reaction.emoji}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
      
      {selectedReaction && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-2xl">
          {selectedReaction}
        </div>
      )}
    </div>
  );
};

export default QuickActions;

