import { useState } from 'react';
import { knowledgeBase, detectAdvancedIntent, getContextualResponse } from './knowledgeBase';
import { extendedKnowledge, searchExtendedKnowledge } from './extendedKnowledge';
import { generalKnowledge, generateSmartResponse } from './generalKnowledge';

export function useChatAPI(personality = 'friendly') {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (messages) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      // Get user input and conversation context
      const lastUserMessage = messages[messages.length - 1];
      const userContent = lastUserMessage.content;
      const userContentLower = userContent.toLowerCase();
      const conversationHistory = messages;

      // Enhanced analysis functions
      function extractKeywords(text) {
        const words = text
          .replace(/[.,!?]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 3)
          .slice(0, 8);
        
        // Add topic-specific keywords from knowledge base
        const allKeywords = [...knowledgeBase.programming.keywords, 
                            ...knowledgeBase.science.keywords,
                            ...knowledgeBase.health.keywords,
                            ...knowledgeBase.history.keywords,
                            ...knowledgeBase.business.keywords];
        
        const foundKeywords = words.filter(w => 
          allKeywords.some(kw => w.includes(kw) || kw.includes(w))
        );
        
        return [...new Set([...words, ...foundKeywords])].slice(0, 8);
      }
      
      function detectSentiment(text) {
        const positive = ['good', 'great', 'excellent', 'awesome', 'amazing', 'wonderful', 'fantastic', 'happy', 'love', 'like', 'enjoy', 'thanks', 'thankful', 'grateful', 'pleased', 'satisfied'];
        const negative = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'angry', 'frustrated', 'annoyed', 'problem', 'issue', 'wrong', 'error', 'broken', 'difficult', 'hard'];
        let score = 0;
        for (const word of positive) if (text.includes(word)) score += 1.5;
        for (const word of negative) if (text.includes(word)) score -= 1.5;
        if (score > 2) return 'positive';
        if (score < -2) return 'negative';
        return 'neutral';
      }

      // Use advanced intent detection
      const intent = detectAdvancedIntent(userContent, conversationHistory);
      const keywords = extractKeywords(userContentLower);
      const sentiment = detectSentiment(userContentLower);
      const context = getContextualResponse(intent, personality, conversationHistory);
      
      // Extract subtopic from user input for extended knowledge
      const subtopicKeywords = ['advanced', 'basic', 'beginner', 'intermediate', 'quantum', 'organic', 'genetic', 'framework', 'hook', 'closure', 'async', 'decorator', 'generator', 'machine learning', 'ml'];
      const detectedSubtopic = subtopicKeywords.find(kw => userContentLower.includes(kw));

      let response = '';
      let meta = {
        source: 'Enhanced AI Knowledge Base',
        confidence: Math.floor(85 + Math.random() * 15) + '%',
        extra: '',
        keywords,
        sentiment,
        intent
      };

      // Get response from knowledge base based on intent
      function getResponseFromKnowledgeBase(intent, personality) {
        // FIRST: Try general knowledge for common questions (music, names, hobbies, etc.)
        const smartResponse = generateSmartResponse(userContent, keywords, personality);
        if (smartResponse) {
          return {
            response: smartResponse,
            extra: 'General Knowledge',
            confidence: '90%'
          };
        }
        
        // SECOND: Try extended knowledge base for comprehensive responses
        const userText = userContent.toLowerCase();
        const extendedResponse = searchExtendedKnowledge(userText, detectedSubtopic || null);
        
        if (extendedResponse) {
          // Add personality-specific intro/outro to extended knowledge
          let personalizedResponse = extendedResponse;
          
          if (personality === 'friendly') {
            personalizedResponse = extendedResponse + "\n\nI hope this helps! Feel free to ask if you need more details on any specific part. 😊";
          } else if (personality === 'professional') {
            personalizedResponse = extendedResponse + "\n\nPlease let me know if you need further clarification on any aspect.";
          } else if (personality === 'humorous') {
            personalizedResponse = extendedResponse + "\n\nGot it? Great! Now go impress someone with your newfound knowledge! 😎";
          }
          // concise personality keeps it as-is
          
          return { 
            response: personalizedResponse, 
            extra: 'Comprehensive Knowledge Base',
            confidence: '95%'
          };
        }
        
        // FALLBACK: Use basic knowledge base
        // Programming responses
        if (intent.startsWith('programming_')) {
          const topic = intent.split('_')[1];
          const kb = knowledgeBase.programming.responses[personality];
          if (kb && kb[topic]) {
            return { response: kb[topic], extra: `Programming: ${topic}` };
          }
          return { response: kb.general, extra: 'Programming topic' };
        }
        
        // Science responses
        if (intent.startsWith('science_')) {
          const topic = intent.split('_')[1];
          const kb = knowledgeBase.science.responses[personality];
          if (kb && kb[topic]) {
            return { response: kb[topic], extra: `Science: ${topic}` };
          }
          return { response: kb.general, extra: 'Science topic' };
        }
        
        // Other knowledge base topics
        if (intent === 'health') {
          return { 
            response: knowledgeBase.health.responses[personality].general, 
            extra: 'Health & Wellness' 
          };
        }
        if (intent === 'history') {
          return { 
            response: knowledgeBase.history.responses[personality].general, 
            extra: 'History & Culture' 
          };
        }
        if (intent === 'business') {
          return { 
            response: knowledgeBase.business.responses[personality].general, 
            extra: 'Business & Finance' 
          };
        }
        
        // General knowledge responses
        if (intent.startsWith('general_')) {
          const topic = intent.split('_')[1];
          const kb = knowledgeBase.general.responses[personality];
          if (kb && kb[topic]) {
            return { response: kb[topic], extra: `General: ${topic}` };
          }
        }
        
        return null;
      }

      // Try to get response from knowledge base first
      const kbResponse = getResponseFromKnowledgeBase(intent, personality);
      
      if (kbResponse) {
        response = kbResponse.response;
        meta.extra = kbResponse.extra;
      } else {
        // Fallback to basic templates for simple intents
        const templates = {
          friendly: {
            greeting: "Hello! 😊 How can I assist you today? I'm here to help with any questions or tasks you might have.",
            help: "I'm here to help! 🤗 I can assist with:\n\n- Programming & Technology\n- Science & Mathematics\n- Health & Wellness\n- History & Culture\n- Business & Finance\n- General Knowledge\n\nWhat would you like help with?",
            joke: "Here's a programming joke for you:\n\nWhy do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛😄\n\nWant another one? Just ask!",
            gratitude: "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know or discuss?",
            goodbye: "Goodbye! 👋 It was nice chatting with you. Feel free to come back anytime if you have more questions!",
            how_are_you: "I'm doing great, thank you for asking! 😊 I'm here and ready to help you with whatever you need. How are you doing today?",
            question: "That's an interesting question! I'd be happy to help you explore that topic further. Could you provide more details about what specifically you'd like to know?",
            fallback: "I understand what you're saying. That's a great point to discuss! I can help with various topics like programming, science, health, history, business, and more. What would you like to explore?"
          },
          professional: {
            greeting: "Hello. How may I assist you today?",
            help: "I can provide assistance across multiple domains: technology, science, business, health, and general knowledge. Please specify your area of interest.",
            joke: "Here's a programming joke:\n\nWhy do programmers prefer dark mode? Because light attracts bugs.",
            gratitude: "You're welcome. Let me know if you need further assistance.",
            goodbye: "Goodbye. If you have more questions, feel free to return.",
            how_are_you: "I'm functioning optimally. How may I assist you today?",
            question: "That's a thoughtful question. Please provide more details for a precise answer.",
            fallback: "I acknowledge your point. Please specify what you'd like to discuss further."
          },
          humorous: {
            greeting: "Hey there! 😁 Ready to have some fun with AI? How can I help you today?",
            help: "Need help? No worries, your friendly AI comedian is here! 😂 I can help with programming, science, jokes, and basically anything that doesn't require me to have a physical body! What can I do for you?",
            joke: "Here's a joke for you:\n\nWhy do programmers prefer dark mode?\nBecause light attracts bugs! 🐛🤣\n\nWant more? I've got jokes for days!",
            gratitude: "No problem! Making your day brighter, one answer at a time! 😎",
            goodbye: "See ya! Don't forget to tip your AI! 👋😂",
            how_are_you: "I'm doing fantastic! I don't have feelings, but if I did, I'd be ecstatic! 😄 How about you?",
            question: "Ooo, a question! I love those. Give me more details and I'll try not to make a pun. 😅",
            fallback: "Interesting! Let's chat more, or just tell me a joke! I'm here for the fun AND the knowledge! 🎉"
          },
          concise: {
            greeting: "Hello. How can I help?",
            help: "How can I assist?",
            joke: "Why do programmers prefer dark mode? Bugs.",
            gratitude: "You're welcome.",
            goodbye: "Goodbye.",
            how_are_you: "Good. You?",
            question: "Please clarify your question.",
            fallback: "What else can I help with?"
          }
        };

        const t = templates[personality] || templates.friendly;

        if (intent === 'greeting') {
          // More natural, ChatGPT-like greeting responses
          if (personality === 'friendly') {
            const greetingVariations = [
              "Hello! 😊 How can I assist you today? I'm here to help with any questions or tasks you might have.",
              "Hi there! 👋 Great to meet you! What can I help you with today?",
              "Hello! 👋 I'm here and ready to help. What would you like to know or discuss?",
              "Hey! 😊 Nice to chat with you! How can I assist you today?"
            ];
            response = greetingVariations[Math.floor(Math.random() * greetingVariations.length)];
          } else {
            response = t.greeting;
          }
          meta.extra = 'Greeting detected';
          meta.confidence = '95%'; // High confidence for greetings
        } else if (intent === 'help') {
          response = t.help;
          meta.extra = 'Help intent detected';
        } else if (intent === 'joke') {
          // Get random joke from knowledge base
          const randomJoke = knowledgeBase.jokes[Math.floor(Math.random() * knowledgeBase.jokes.length)];
          if (personality === 'humorous') {
            response = `${randomJoke}\n\nWant another one? I've got more! 😂`;
          } else if (personality === 'professional') {
            response = randomJoke;
          } else if (personality === 'concise') {
            response = randomJoke.split('!')[0] + '!';
          } else {
            response = `${randomJoke}\n\nWant another joke? Just ask! 😄`;
          }
          meta.extra = 'Joke requested';
        } else if (intent === 'gratitude') {
          response = t.gratitude;
          meta.extra = 'Gratitude detected';
        } else if (intent === 'goodbye') {
          response = t.goodbye;
          meta.extra = 'Goodbye intent';
        } else if (intent === 'how_are_you') {
          response = t.how_are_you;
          meta.extra = 'How are you question';
        } else if (intent === 'question') {
          response = t.question;
          meta.extra = 'General question';
        } else {
          response = t.fallback;
          meta.extra = 'General discussion';
        }
      }
      
      // Add contextual follow-up if relevant
      if (context.isFollowUp && conversationHistory.length > 2) {
        response += `\n\nIs there anything else about ${context.previousTopic.replace('_', ' ')} you'd like to know?`;
      }

        // Return both response and meta
        return { content: response, meta };
      } catch (error) {
        console.error('Error in chat API:', error);
        throw new Error('Failed to get response from AI');
      } finally {
        setIsLoading(false);
      }
    };
  // For production use, replace the mock implementation above with this:
  /*
  const sendMessage = async (messages) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error in chat API:', error);
      throw error;
    }
  };
  */

  return {
    sendMessage,
    isLoading
  };
}


