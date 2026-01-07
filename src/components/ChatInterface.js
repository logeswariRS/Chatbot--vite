import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Toast from './Toast';
import Confetti from './Confetti';
import { useChatAPI } from '../hooks/useChatAPI';
import { Heart, Copy, Trash2 } from 'lucide-react';

const ChatInterface = ({ conversation, onUpdateConversation, isLoading, setIsLoading, personality }) => {
  const [inputValue, setInputValue] = useState('');
  const [toast, setToast] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const messagesEndRef = useRef(null);
  const { sendMessage } = useChatAPI(personality);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...conversation.messages, userMessage];
    const updatedConversation = {
      ...conversation,
      messages: updatedMessages
    };
    onUpdateConversation(updatedConversation);
    setInputValue('');

    setIsLoading(true);
    try {
      const response = await sendMessage(updatedMessages);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content || response,
        meta: response.meta,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      onUpdateConversation({
        ...conversation,
        messages: finalMessages
      });

      // Trigger confetti for certain responses
      if (response.meta?.sentiment === 'positive' || message.toLowerCase().includes('thank')) {
        setConfettiTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setToast({ message: 'Failed to send message. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleDelete = (messageId) => {
    const updatedMessages = conversation.messages.filter(msg => msg.id !== messageId);
    onUpdateConversation({
      ...conversation,
      messages: updatedMessages
    });
    setToast({ message: 'Message deleted', type: 'success' });
  };

  const handleLike = (messageId) => {
    const updatedMessages = conversation.messages.map(msg =>
      msg.id === messageId
        ? { ...msg, liked: !msg.liked }
        : msg
    );
    onUpdateConversation({
      ...conversation,
      messages: updatedMessages
    });
    setToast({ message: 'Message liked!', type: 'success' });
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setToast({ message: 'Copied to clipboard!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to copy', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <Confetti trigger={confettiTrigger} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
        <MessageList
          messages={conversation.messages}
          isLoading={isLoading}
          onDelete={handleDelete}
          onLike={handleLike}
          onCopy={handleCopy}
        />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        placeholder="Type your message..."
      />
    </div>
  );
};

export default ChatInterface;
