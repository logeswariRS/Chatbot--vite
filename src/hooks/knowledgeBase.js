// Comprehensive Knowledge Base for AI Chatbot

export const knowledgeBase = {
  // Programming & Technology
  programming: {
    keywords: ['javascript', 'python', 'react', 'node', 'code', 'programming', 'function', 'variable', 'array', 'object', 'api', 'database', 'sql', 'html', 'css', 'git', 'github', 'algorithm', 'debug', 'error', 'bug', 'framework', 'library', 'npm', 'package'],
    responses: {
      friendly: {
        javascript: "JavaScript is a versatile programming language! Here's a quick example:\n\n```javascript\n// Arrow function example\nconst greet = (name) => `Hello, ${name}!`;\nconsole.log(greet('World'));\n```\n\nJavaScript is great for web development, especially with React! What specific JavaScript topic interests you?",
        python: "Python is an amazing language! It's known for its simplicity and readability. Here's a simple example:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet('World'))\n```\n\nPython is perfect for data science, web development, and automation! What would you like to learn about Python?",
        react: "React is a powerful JavaScript library for building user interfaces! Here's a basic component:\n\n```jsx\nimport React from 'react';\n\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default Greeting;\n```\n\nReact uses components, hooks, and JSX to create interactive UIs. What React topic would you like to explore?",
        general: "I'd love to help with programming! Whether it's JavaScript, Python, React, or any other language, I can assist with:\n\n- Code examples and syntax\n- Debugging tips\n- Best practices\n- Framework guidance\n- Algorithm explanations\n\nWhat programming topic can I help you with?"
      },
      professional: {
        javascript: "JavaScript is a high-level, interpreted programming language. Key features include:\n\n```javascript\n// ES6+ Features\nconst arrowFunction = (param) => param * 2;\nconst asyncFunction = async () => await fetch('/api');\n```\n\nHow can I assist with your JavaScript development?",
        python: "Python is an interpreted, high-level programming language emphasizing code readability. Example:\n\n```python\n# List comprehension\nsquares = [x**2 for x in range(10)]\n```\n\nWhat Python development question do you have?",
        react: "React is a declarative, component-based JavaScript library. Core concepts include:\n\n- Components and Props\n- State Management\n- Hooks (useState, useEffect)\n- Virtual DOM\n\nWhat React development topic do you need help with?",
        general: "I can provide technical assistance with programming languages, frameworks, and development practices. Please specify your technical question."
      },
      humorous: {
        javascript: "JavaScript - the language that's everywhere! Even your toaster probably runs it! 😂\n\n```javascript\n// The classic\nconsole.log('Hello World!');\n// But wait, there's more!\nconsole.log('Hello', 'World', '!'.repeat(3));\n```\n\nWhat JavaScript mischief are you up to? 🚀",
        python: "Python - so readable, even your cat could understand it! 🐍\n\n```python\n# Python: Making programming fun since 1991\nprint(\"Hello, World!\")\n# No semicolons needed - Python gets you! 😎\n```\n\nWhat Python adventure are we coding today?",
        react: "React - where components are like LEGO blocks, but way cooler! 🧱\n\n```jsx\n// React: Making UIs fun\nfunction App() {\n  return <div>Hello React!</div>;\n}\n```\n\nReady to build something awesome? Let's React! ⚛️",
        general: "Programming is like cooking - sometimes you follow a recipe, sometimes you improvise! 👨‍🍳 What code are we whipping up today?"
      },
      concise: {
        javascript: "JavaScript: Dynamic language for web. Example:\n\n```javascript\nconst greet = name => `Hello, ${name}`;\n```",
        python: "Python: High-level, readable. Example:\n\n```python\ndef greet(name): return f\"Hello, {name}\"\n```",
        react: "React: Component-based UI library. Example:\n\n```jsx\nconst App = () => <div>Hello</div>;\n```",
        general: "What programming topic?"
      }
    }
  },

  // Science & Technology
  science: {
    keywords: ['science', 'physics', 'chemistry', 'biology', 'math', 'mathematics', 'quantum', 'atom', 'molecule', 'gravity', 'energy', 'force', 'evolution', 'cell', 'dna', 'equation', 'formula', 'theorem'],
    responses: {
      friendly: {
        physics: "Physics is fascinating! It's the study of matter, motion, and energy. Key concepts include:\n\n- **Newton's Laws**: Objects at rest stay at rest unless acted upon\n- **Gravity**: The force that attracts objects toward each other\n- **Energy**: Can't be created or destroyed, only transformed\n\nWhat physics topic interests you? 🌌",
        chemistry: "Chemistry is all about atoms and molecules! Here are some basics:\n\n- **Atoms**: The building blocks of matter\n- **Molecules**: Combinations of atoms\n- **Chemical Reactions**: When substances transform\n\nWhat would you like to know about chemistry? ⚗️",
        biology: "Biology is the study of life! Key areas include:\n\n- **Cells**: The basic unit of life\n- **DNA**: The genetic code\n- **Evolution**: How species change over time\n\nWhat biological topic can I help you explore? 🧬",
        general: "Science is amazing! I can help explain concepts in:\n\n- Physics (motion, energy, forces)\n- Chemistry (atoms, reactions)\n- Biology (cells, genetics, evolution)\n- Mathematics (equations, formulas)\n\nWhat scientific topic interests you?"
      },
      professional: {
        physics: "Physics: Study of matter, motion, and energy. Core principles include classical mechanics, thermodynamics, and electromagnetism.",
        chemistry: "Chemistry: Study of matter composition, structure, and properties. Covers atomic theory, molecular bonds, and chemical reactions.",
        biology: "Biology: Study of living organisms. Encompasses cell biology, genetics, evolution, and ecology.",
        general: "I can provide information on physics, chemistry, biology, and mathematics. Please specify your scientific question."
      },
      humorous: {
        physics: "Physics - where everything makes sense until you get to quantum mechanics! 😵‍💫\n\nDid you know? Light is both a particle AND a wave. Mind = blown! 💥\n\nWhat physics mystery are we solving today?",
        chemistry: "Chemistry - mixing things until something cool happens! 🧪\n\nRemember: Don't mix bleach and ammonia unless you want a chemistry lesson you'll never forget! 😅\n\nWhat chemical reaction are we exploring?",
        biology: "Biology - the study of life, and sometimes death! 🦠\n\nFun fact: Your body has more bacterial cells than human cells. You're basically a walking ecosystem! 🦠\n\nWhat life science topic interests you?",
        general: "Science: Where we ask 'why?' until our brains hurt! 🧠 What scientific rabbit hole are we diving into?"
      },
      concise: {
        physics: "Physics: Matter, motion, energy. What topic?",
        chemistry: "Chemistry: Atoms, molecules, reactions. What topic?",
        biology: "Biology: Life, cells, evolution. What topic?",
        general: "Science topic?"
      }
    }
  },

  // Jokes Collection
  jokes: [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "How do you comfort a JavaScript bug? You console it! 😄",
    "Why did the programmer quit his job? He didn't get arrays! 😂",
    "What's a programmer's favorite hangout place? Foo Bar! 🍺",
    "Why do Java developers wear glasses? Because they can't C#! 👓",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
    "Why did the Python programmer not respond to the function call? He was busy with his own problems! 🐍",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
    "Why don't programmers like nature? It has too many bugs! 🐛🌳",
    "What do you call a programmer from Finland? Nerdic! 🇫🇮"
  ],

  // General Knowledge
  general: {
    keywords: ['what', 'how', 'why', 'when', 'where', 'who', 'explain', 'tell me', 'information', 'know', 'learn', 'understand'],
    responses: {
      friendly: {
        what: "I'd be happy to explain! Could you provide more details about what specifically you'd like to know?",
        how: "Great question! Let me help you understand how that works. What would you like to learn about?",
        why: "That's a thoughtful question! Understanding the 'why' behind things is important. What topic are you curious about?",
        general: "I'm here to help! I can provide information on a wide range of topics including:\n\n- Technology and Programming\n- Science and Nature\n- General Knowledge\n- Problem Solving\n\nWhat would you like to explore?"
      },
      professional: {
        what: "Please provide more specific details about your inquiry.",
        how: "I can explain processes and methodologies. What specific topic do you need information on?",
        why: "I can provide explanations and reasoning. Please specify your question.",
        general: "I can assist with information across multiple domains. Please specify your question."
      },
      humorous: {
        what: "What? That's a great question! But I need more details - my crystal ball is in the shop! 🔮\n\nWhat are you curious about?",
        how: "How? Well, that depends! Are we talking about how to make coffee or how the universe works? ☕🌌\n\nWhat 'how' are we exploring?",
        why: "Why? Because! 😄 Just kidding - let's get to the bottom of this mystery! What are you wondering about?",
        general: "Questions, questions, questions! I love it! 🎉 What knowledge are we seeking today?"
      },
      concise: {
        what: "What topic?",
        how: "How what?",
        why: "Why what?",
        general: "What do you need?"
      }
    }
  },

  // Health & Wellness
  health: {
    keywords: ['health', 'fitness', 'exercise', 'diet', 'nutrition', 'wellness', 'medicine', 'doctor', 'sick', 'pain', 'sleep', 'mental', 'stress', 'anxiety'],
    responses: {
      friendly: {
        general: "Health and wellness are important! Here are some general tips:\n\n- **Exercise**: Regular physical activity boosts mood and energy\n- **Nutrition**: Balanced diet with fruits, vegetables, and proteins\n- **Sleep**: 7-9 hours of quality sleep is essential\n- **Mental Health**: Take breaks, practice mindfulness\n\n⚠️ Note: For medical advice, please consult a healthcare professional.\n\nWhat wellness topic can I help with?"
      },
      professional: {
        general: "Health and wellness encompass physical and mental well-being. Key areas include exercise, nutrition, sleep, and stress management.\n\n⚠️ Important: I cannot provide medical diagnosis or treatment. Please consult healthcare professionals for medical concerns."
      },
      humorous: {
        general: "Health? That's the thing we all know we should focus on but... Netflix! 😅\n\nRemember: An apple a day keeps the doctor away, but a donut a day keeps... well, it keeps you happy! 🍩\n\n⚠️ Disclaimer: I'm not a doctor, but I play one on the internet! For real health advice, see a real doctor! 👨‍⚕️"
      },
      concise: {
        general: "Health: Exercise, nutrition, sleep, mental wellness. ⚠️ Consult professionals for medical advice."
      }
    }
  },

  // History & Culture
  history: {
    keywords: ['history', 'historical', 'ancient', 'war', 'civilization', 'culture', 'tradition', 'past', 'timeline', 'event', 'empire', 'king', 'queen'],
    responses: {
      friendly: {
        general: "History is fascinating! It helps us understand how we got to where we are today. Key historical periods include:\n\n- **Ancient Civilizations**: Egypt, Greece, Rome\n- **Middle Ages**: Feudalism, Renaissance\n- **Modern Era**: Industrial Revolution, World Wars\n- **Contemporary**: Recent decades and current events\n\nWhat historical period or event interests you? 📚"
      },
      professional: {
        general: "History encompasses the study of past events, civilizations, and human development across various periods and regions."
      },
      humorous: {
        general: "History - where we learn from mistakes... and then make new ones! 😅\n\nDid you know? The Great Wall of China is so long, you could see it from space! (Actually, that's a myth, but it's still impressive!) 🧱\n\nWhat historical adventure are we exploring?"
      },
      concise: {
        general: "History: Past events, civilizations, human development. What period?"
      }
    }
  },

  // Business & Finance
  business: {
    keywords: ['business', 'finance', 'money', 'economy', 'investment', 'stock', 'market', 'company', 'entrepreneur', 'startup', 'profit', 'revenue', 'budget', 'saving'],
    responses: {
      friendly: {
        general: "Business and finance can be complex! Here are some basics:\n\n- **Business**: Creating value through products or services\n- **Finance**: Managing money, investments, and budgets\n- **Investment**: Putting money into assets for future returns\n- **Budgeting**: Planning income and expenses\n\n💡 Remember: Always do your research and consider consulting financial advisors for investment decisions.\n\nWhat business or finance topic can I help with?"
      },
      professional: {
        general: "Business and finance involve managing resources, making strategic decisions, and understanding economic principles. Key areas include operations, marketing, finance, and strategy."
      },
      humorous: {
        general: "Business and finance - where money makes the world go round! 💰\n\nPro tip: The best time to invest was yesterday. The second best time is... well, after you've done your research! 😄\n\nWhat financial wisdom are we seeking?"
      },
      concise: {
        general: "Business/Finance: Management, investment, strategy. What topic?"
      }
    }
  }
};

// Normalize text to handle typos (like "helo" → "hello")
function normalizeText(text) {
  const lowerText = text.toLowerCase().trim();
  
  // Common typo corrections
  const typoMap = {
    'helo': 'hello',
    'heloo': 'hello',
    'helow': 'hello',
    'hlo': 'hello',
    'hii': 'hi',
    'hie': 'hi',
    'hey': 'hi',
    'hye': 'hi',
    'hay': 'hey', // "hay" is a typo for "hey"
    'haay': 'hey',
    'heyy': 'hey',
    'heyyy': 'hey',
    'how r u': 'how are you',
    'how r you': 'how are you',
    'hw r u': 'how are you',
    'hw are u': 'how are you',
    'how areu': 'how are you',
    'how are u': 'how are you',
    'howareu': 'how are you',
    'how areyou': 'how are you',
    'givw': 'give', // Typo for "give"
    'giv': 'give',
    'gve': 'give',
    'areu': 'are you',
    'are u': 'are you',
    'wat': 'what',
    'wht': 'what',
    'whts': 'whats',
    'wats': 'whats',
    'thnks': 'thanks',
    'thnx': 'thanks',
    'thx': 'thanks',
    'ty': 'thanks',
    'bye': 'goodbye',
    'by': 'bye',
    'cya': 'see you',
    'ttyl': 'talk to you later'
  };
  
  // Check for exact typo matches first
  if (typoMap[lowerText]) {
    return typoMap[lowerText];
  }
  
  // Check for typo patterns in words
  let normalized = lowerText;
  for (const [typo, correct] of Object.entries(typoMap)) {
    if (normalized.includes(typo)) {
      normalized = normalized.replace(typo, correct);
    }
  }
  
  return normalized;
}

// Enhanced intent detection with more categories
export function detectAdvancedIntent(text, conversationHistory = []) {
  // Normalize text first to handle typos
  const normalizedText = normalizeText(text);
  const lowerText = normalizedText.toLowerCase();
  
  // PRIORITY 1: Check for greetings FIRST (highest priority)
  // Check normalized text first (handles typos)
  const greetingWords = ['hello', 'hi', 'hey', 'greetings', 'howdy', 'hola', 'helo', 'heloo', 'helow', 'hlo', 'hii', 'hie', 'hye', 'hay', 'haay', 'heyy', 'heyyy', 'ha', 'he', 'hy', 'ho'];
  const greetingPhrases = ['good morning', 'good afternoon', 'good evening', 'good day', 'hey there', 'hi there'];
  
  // Check if the entire message is just a greeting (most common case)
  const trimmedText = text.trim().toLowerCase();
  const trimmedNormalized = normalizedText.trim();
  
  // FIRST: Direct check for "hay" - most common typo for "hey"
  if (trimmedText === 'hay' || trimmedNormalized === 'hey' || trimmedNormalized === 'hay') {
    return 'greeting';
  }
  
  // Check for 2-letter greetings (ha, hi, he, hy, ho) - treat as greeting
  const twoLetterGreetings = ['ha', 'hi', 'he', 'hy', 'ho'];
  if (twoLetterGreetings.includes(trimmedText) || twoLetterGreetings.includes(trimmedNormalized)) {
    return 'greeting';
  }
  
  // Check for 3-letter greetings (hay, hey, hel, etc.)
  const threeLetterGreetings = ['hay', 'hey', 'hel', 'hlo'];
  if (threeLetterGreetings.includes(trimmedText) || threeLetterGreetings.includes(trimmedNormalized)) {
    return 'greeting';
  }
  
  if ((trimmedText.length >= 2 && trimmedText.length <= 5 && trimmedText.startsWith('h')) || 
      (trimmedNormalized.length >= 2 && trimmedNormalized.length <= 5 && trimmedNormalized.startsWith('h'))) {
    // If it's a short word starting with 'h' followed by vowels, likely a greeting
    // This catches: hay, hey, helo, hlo, hii, etc.
    // Pattern: h + vowel(s) + optional y at end
    if (trimmedText.match(/^h[aeiou]+[y]?$/i) || trimmedNormalized.match(/^h[aeiou]+[y]?$/i)) {
      return 'greeting';
    }
    // Also check for 'hay' specifically (h + a + y) - more explicit
    if (trimmedText.match(/^hay$/i) || trimmedNormalized.match(/^hay$/i) || trimmedNormalized.match(/^hey$/i)) {
      return 'greeting';
    }
  }
  
  // Single word greetings (like "hello", "hi", "helo", "hay")
  if (greetingWords.includes(trimmedText) || greetingWords.includes(trimmedNormalized)) {
    return 'greeting';
  }
  
  // Check for greeting phrases
  if (greetingPhrases.some(phrase => trimmedText.includes(phrase) || trimmedNormalized.includes(phrase))) {
    return 'greeting';
  }
  
  // Check for greeting patterns in the text
  const greetingPatterns = [
    /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening|good day|howdy|hola|hey there|hi there)\b/i,
    /\b(helo|heloo|helow|hlo|hii|hie|hye|hay|haay|heyy|heyyy|ha|he|hy|ho)\b/i, // Common typos and 2-letter greetings
    /^h[aeiouy]+$/i, // Pattern: h followed by vowels (hi, he, ha, hy, hay, etc.)
    /^ha[ey]+$/i, // Pattern: ha followed by e or y (hay, haey, etc.)
  ];
  
  if (greetingPatterns.some(pattern => pattern.test(text) || pattern.test(normalizedText))) {
    return 'greeting';
  }
  
  // PRIORITY 2: Check for "how are you" variations (including typos)
  // First check the exact text for common variations
  const howAreYouExact = ['how are you', 'how areu', 'how are u', 'howareu', 'how areyou', 'how r u', 'how r you', 'hw r u', 'hw are u'];
  if (howAreYouExact.some(phrase => lowerText.includes(phrase) || normalizedText.includes(phrase) || text.toLowerCase().includes(phrase))) {
    return 'how_are_you';
  }
  
  // Then check with patterns
  const howAreYouPatterns = [
    /\b(how are you|how're you|how r u|how r you|hw r u|hw are u|how areu|how are u|howareu|how areyou)\b/i,
    /\b(how's it going|how are things|how do you do|how are you doing)\b/i
  ];
  
  // Check both original and normalized text
  if (howAreYouPatterns.some(pattern => pattern.test(text) || pattern.test(normalizedText) || pattern.test(lowerText))) {
    return 'how_are_you';
  }
  
  // Also check if text contains "how" + "are" + "you" (even with typos) - more flexible
  const textForCheck = lowerText.replace(/\s+/g, ' '); // Normalize spaces
  if (textForCheck.includes('how') && (textForCheck.includes('areu') || textForCheck.includes('are u') || textForCheck.includes('areyou') || textForCheck.includes('are you') || textForCheck.includes('r u') || textForCheck.includes('r you'))) {
    return 'how_are_you';
  }
  
  // Check normalized text too
  const normalizedForCheck = normalizedText.toLowerCase().replace(/\s+/g, ' ');
  if (normalizedForCheck.includes('how') && (normalizedForCheck.includes('are you') || normalizedForCheck.includes('areu') || normalizedForCheck.includes('r u') || normalizedForCheck.includes('r you'))) {
    return 'how_are_you';
  }
  
  // PRIORITY 3: Check for gratitude
  if (/\b(thank|thanks|thank you|thnks|thnx|thx|ty|appreciate|grateful)\b/i.test(lowerText) || 
      /\b(thank|thanks|thank you|thnks|thnx|thx|ty|appreciate|grateful)\b/i.test(normalizedText)) {
    return 'gratitude';
  }
  
  // PRIORITY 4: Check for goodbye
  if (/\b(bye|goodbye|see you|farewell|later|cya|ttyl|by|good night|goodbye)\b/i.test(lowerText) || 
      /\b(bye|goodbye|see you|farewell|later|cya|ttyl|by|good night|goodbye)\b/i.test(normalizedText)) {
    return 'goodbye';
  }
  
  // PRIORITY 5: Check for jokes
  if (/\b(joke|funny|humor|laugh|tell me a joke|make me laugh)\b/i.test(lowerText)) {
    return 'joke';
  }
  
  // PRIORITY 6: Check for help requests
  if (/\b(help|assist|support|guide|can you help|need help)\b/i.test(lowerText)) {
    return 'help';
  }
  
  // PRIORITY 7: Check for specific topics
  if (knowledgeBase.programming.keywords.some(kw => lowerText.includes(kw))) {
    if (lowerText.includes('javascript') || lowerText.includes('js')) return 'programming_javascript';
    if (lowerText.includes('python') || lowerText.includes('py')) return 'programming_python';
    if (lowerText.includes('react')) return 'programming_react';
    return 'programming_general';
  }
  
  if (knowledgeBase.science.keywords.some(kw => lowerText.includes(kw))) {
    if (lowerText.includes('physics') || lowerText.includes('gravity') || lowerText.includes('energy')) return 'science_physics';
    if (lowerText.includes('chemistry') || lowerText.includes('atom') || lowerText.includes('molecule')) return 'science_chemistry';
    if (lowerText.includes('biology') || lowerText.includes('cell') || lowerText.includes('dna')) return 'science_biology';
    return 'science_general';
  }
  
  if (knowledgeBase.health.keywords.some(kw => lowerText.includes(kw))) return 'health';
  if (knowledgeBase.history.keywords.some(kw => lowerText.includes(kw))) return 'history';
  if (knowledgeBase.business.keywords.some(kw => lowerText.includes(kw))) return 'business';
  
  // PRIORITY 8: Check for questions
  if (text.includes('?') || lowerText.includes('what') || lowerText.includes('how') || lowerText.includes('why') || lowerText.includes('when') || lowerText.includes('where') || lowerText.includes('who')) {
    if (lowerText.startsWith('what') || lowerText.includes('what is') || lowerText.includes('what are')) return 'general_what';
    if (lowerText.startsWith('how') || lowerText.includes('how to') || lowerText.includes('how do')) return 'general_how';
    if (lowerText.startsWith('why') || lowerText.includes('why is') || lowerText.includes('why are')) return 'general_why';
    return 'question';
  }
  
  // Default fallback
  return 'statement';
}

// Get contextual response based on conversation history
export function getContextualResponse(intent, personality, conversationHistory = []) {
  const lastFewMessages = conversationHistory.slice(-4).map(m => m.content.toLowerCase()).join(' ');
  
  // Check for follow-up questions
  if (conversationHistory.length > 2) {
    const previousTopic = detectAdvancedIntent(conversationHistory[conversationHistory.length - 2].content, conversationHistory);
    if (previousTopic.startsWith('programming_') || previousTopic.startsWith('science_')) {
      // Continue the conversation on the same topic
      return { isFollowUp: true, previousTopic };
    }
  }
  
  return { isFollowUp: false };
}

