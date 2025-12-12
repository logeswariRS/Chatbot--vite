import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Confetti from './components/Confetti';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [currentConversationId, setCurrentConversationId] = useLocalStorage('currentConversationId', null);
  const [isLoading, setIsLoading] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [personality, setPersonality] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('personality');
      return stored || 'friendly';
    }
    return 'friendly';
  });
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebarOpen') !== 'false';
    }
    return true;
  });

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode);
      localStorage.setItem('personality', personality);
      localStorage.setItem('sidebarOpen', sidebarOpen);
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, personality, sidebarOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + K: Focus search (if sidebar is open)
      if (ctrlKey && e.key === 'k') {
        e.preventDefault();
        setSidebarOpen(true);
        setTimeout(() => {
          const searchInput = document.querySelector('input[placeholder*="Search conversations"]');
          if (searchInput) searchInput.focus();
        }, 100);
      }

      // Ctrl/Cmd + N: New chat
      if (ctrlKey && e.key === 'n') {
        e.preventDefault();
        createNewConversation();
      }

      // Ctrl/Cmd + /: Toggle shortcuts
      if (ctrlKey && e.key === '/') {
        e.preventDefault();
        // This will be handled by Sidebar component
      }

      // Esc: Close sidebar
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleImportConversations = (importedData) => {
    if (Array.isArray(importedData)) {
      setConversations(prev => [...importedData, ...prev]);
      setConfettiTrigger(prev => prev + 1);
    } else if (importedData.conversations) {
      setConversations(prev => [...importedData.conversations, ...prev]);
      setConfettiTrigger(prev => prev + 1);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onDeleteConversation={deleteConversation}
        onNewChat={createNewConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        darkMode={darkMode}
        onImport={handleImportConversations}
      />
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
        onConfetti={() => setConfettiTrigger(prev => prev + 1)}
      />
      <Confetti trigger={confettiTrigger} />
      <main className={`container mx-auto px-4 py-6 max-w-6xl transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-80' : ''
      }`}>
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

