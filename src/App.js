import React, { useState, useEffect, useRef } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [currentConversationId, setCurrentConversationId] = useLocalStorage('currentConversationId', null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [personality, setPersonality] = useState('friendly');

  // Create initial conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      const newConversation = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [
          {
            id: '1',
            role: 'assistant',
            content: 'Hello! I\'m your AI assistant. How can I help you today?',
            timestamp: new Date().toISOString()
          }
        ],
        createdAt: new Date().toISOString()
      };
      setConversations([newConversation]);
      setCurrentConversationId(newConversation.id);
    }
  }, [conversations.length, setConversations, setCurrentConversationId]);

  const currentConversation = conversations.find(conv => conv.id === currentConversationId);

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const deleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (currentConversationId === conversationId) {
      const remainingConversations = conversations.filter(conv => conv.id !== conversationId);
      if (remainingConversations.length > 0) {
        setCurrentConversationId(remainingConversations[0].id);
      } else {
        setCurrentConversationId(null);
      }
    }
  };

  const updateConversationTitle = (conversationId, newTitle) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, title: newTitle }
          : conv
      )
    );
  };

  // Sync dark mode with localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={"min-h-screen " + (darkMode ? 'bg-gray-900' : 'bg-gray-50') + (darkMode ? ' dark' : '')}>
      <Header 
        onCreateNewChat={createNewConversation}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onDeleteConversation={deleteConversation}
        onUpdateTitle={updateConversationTitle}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        personality={personality}
        setPersonality={setPersonality}
      />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {currentConversation && (
          <ChatInterface
            conversation={currentConversation}
            onUpdateConversation={(updatedConversation) => {
              setConversations(prev => 
                prev.map(conv => 
                  conv.id === updatedConversation.id 
                    ? updatedConversation
                    : conv
                )
              );
            }}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            personality={personality}
          />
        )}
      </main>
    </div>
  );
}

export default App;

