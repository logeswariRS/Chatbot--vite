import { useState } from 'react';

export function useChatAPI(personality = 'friendly') {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (messages) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll use a mock response
      // In production, you would replace this with actual API calls
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Mock AI responses based on user input
      const lastUserMessage = messages[messages.length - 1];
      const userContent = lastUserMessage.content;
      const userContentLower = userContent.toLowerCase();

      // Deep analysis: extract keywords, sentiment, and intent
      function extractKeywords(text) {
        return text
          .replace(/[.,!?]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 3)
          .slice(0, 5);
      }
      function detectSentiment(text) {
        const positive = ['good', 'great', 'happy', 'love', 'like', 'enjoy', 'thanks'];
        const negative = ['bad', 'sad', 'hate', 'angry', 'problem', 'issue', 'wrong'];
        let score = 0;
        for (const word of positive) if (text.includes(word)) score++;
        for (const word of negative) if (text.includes(word)) score--;
        if (score > 0) return 'positive';
        if (score < 0) return 'negative';
        return 'neutral';
      }
      function detectIntent(text) {
        if (/\b(help|assist|support)\b/i.test(text)) return 'help';
        if (/\b(joke|funny)\b/i.test(text)) return 'joke';
        if (/\b(code|programming|script)\b/i.test(text)) return 'programming';
        if (/\b(weather|forecast)\b/i.test(text)) return 'weather';
        if (/\b(bye|goodbye|see you)\b/i.test(text)) return 'goodbye';
        if (/\b(hello|hi|hey)\b/i.test(text)) return 'greeting';
        if (/\b(thank|thanks)\b/i.test(text)) return 'gratitude';
        if (text.includes('?')) return 'question';
        return 'statement';
      }

      const keywords = extractKeywords(userContentLower);
      const sentiment = detectSentiment(userContentLower);
      const intent = detectIntent(userContent);

      let response = '';
      let meta = {
        source: 'AI Knowledge Base',
        confidence: Math.floor(80 + Math.random() * 20) + '%',
        extra: '',
        keywords,
        sentiment,
        intent
      };

        // Response templates by personality
        const templates = {
          friendly: {
            greeting: "Hello! 😊 How can I assist you today? I'm here to help with any questions or tasks you might have.",
            help: "I'm here to help! 🤗 I can assist with:\n\n- Answering questions\n- Providing information\n- Helping with tasks\n- Having conversations\n\nWhat would you like help with?",
            programming: "I'd be happy to help with programming! Here's a simple example:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World')); // Output: Hello, World!\n```\n\nWhat specific programming question do you have?",
            weather: "I can't check real-time weather data, but I can help you understand weather concepts or find weather APIs for your projects! ☀️🌧️",
            joke: "Here's a programming joke for you:\n\nWhy do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛😄",
            gratitude: "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know or discuss?",
            goodbye: "Goodbye! 👋 It was nice chatting with you. Feel free to come back anytime if you have more questions!",
            question: "That's an interesting question! I'd be happy to help you explore that topic further. Could you provide more details about what specifically you'd like to know?",
            fallback: "I understand what you're saying. That's a great point to discuss! What would you like to explore or learn more about?"
          },
          professional: {
            greeting: "Hello. How may I assist you today?",
            help: "I'm here to provide professional assistance. Please specify your request.",
            programming: "Certainly. Here is a programming example:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World')); // Output: Hello, World!\n```\n\nPlease clarify your programming question.",
            weather: "I am unable to access real-time weather data, but I can explain weather concepts or suggest APIs.",
            joke: "Here's a programming joke:\n\nWhy do programmers prefer dark mode? Because light attracts bugs.",
            gratitude: "You're welcome. Let me know if you need further assistance.",
            goodbye: "Goodbye. If you have more questions, feel free to return.",
            question: "That's a thoughtful question. Please provide more details for a precise answer.",
            fallback: "I acknowledge your point. Please specify what you'd like to discuss further."
          },
          humorous: {
            greeting: "Hey there! 😁 Ready to have some fun with AI? How can I help you today?",
            help: "Need help? No worries, your friendly AI comedian is here! 😂 What can I do for you?",
            programming: "Programming, eh? Let's code like it's stand-up night!\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World')); // Output: Hello, World!\n```\n\nGot a bug? Let's squash it together! 🐞",
            weather: "Weather? I can't check it, but I can make it rain... jokes! ☔😆",
            joke: "Here's a joke for you:\n\nWhy do programmers prefer dark mode?\nBecause light attracts bugs! 🐛🤣",
            gratitude: "No problem! Making your day brighter, one answer at a time! 😎",
            goodbye: "See ya! Don't forget to tip your AI! 👋😂",
            question: "Ooo, a question! I love those. Give me more details and I'll try not to make a pun. 😅",
            fallback: "Interesting! Let's chat more, or just tell me a joke!"
          },
          concise: {
            greeting: "Hello. How can I help?",
            help: "How can I assist?",
            programming: "Here's a code example:\n\n```javascript\nfunction greet(name) { return `Hello, ${name}!`; }\nconsole.log(greet('World')); // Output: Hello, World!\n```\nWhat do you need?",
            weather: "Can't access weather data. Try an API.",
            joke: "Why do programmers prefer dark mode? Bugs.",
            gratitude: "You're welcome.",
            goodbye: "Goodbye.",
            question: "Please clarify your question.",
            fallback: "What else can I help with?"
          }
        };

        const t = templates[personality] || templates.friendly;

        if (intent === 'greeting') {
          response = t.greeting;
          meta.extra = 'Greeting detected';
        } else if (intent === 'help') {
          response = t.help;
          meta.extra = 'Help intent detected';
        } else if (intent === 'programming') {
          response = t.programming;
          meta.extra = 'Programming topic';
        } else if (intent === 'weather') {
          response = t.weather;
          meta.extra = 'Weather topic';
        } else if (intent === 'joke') {
          response = t.joke;
          meta.extra = 'Joke requested';
        } else if (intent === 'gratitude') {
          response = t.gratitude;
          meta.extra = 'Gratitude detected';
        } else if (intent === 'goodbye') {
          response = t.goodbye;
          meta.extra = 'Goodbye intent';
        } else if (intent === 'question') {
          response = t.question;
          meta.extra = 'General question';
        } else {
          response = t.fallback;
          meta.extra = 'General discussion';
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


