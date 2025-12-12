// Extended Comprehensive Knowledge Base for Advanced AI Responses

export const extendedKnowledge = {
  // Programming - Detailed
  programming: {
    javascript: {
      basics: `JavaScript is a high-level, interpreted programming language that's one of the core technologies of the web. Here's a comprehensive overview:

**Key Features:**
- **Dynamic Typing**: Variables can hold any type of value
- **Prototype-based**: Uses prototypes instead of classes (though ES6+ supports classes)
- **First-class Functions**: Functions are treated as objects
- **Event-driven**: Great for interactive web applications

**Common Patterns:**

\`\`\`javascript
// ES6+ Arrow Functions
const greet = (name) => \`Hello, \${name}!\`;

// Async/Await for asynchronous operations
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Array Methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Destructuring
const { name, age } = person;
const [first, second] = array;

// Spread Operator
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProperty: value };
\`\`\`

**Best Practices:**
- Use \`const\` by default, \`let\` when reassignment is needed
- Avoid \`var\` (function-scoped, can cause issues)
- Use arrow functions for callbacks
- Leverage async/await over promises when possible
- Use template literals for string interpolation

What specific JavaScript topic would you like to explore deeper?`,
      
      advanced: `**Advanced JavaScript Concepts:**

**Closures:**
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

**Promises and Async Patterns:**
\`\`\`javascript
// Promise chain
fetch('/api/data')
  .then(response => response.json())
  .then(data => processData(data))
  .catch(error => handleError(error));

// Async/await (preferred)
async function processData() {
  const data = await fetch('/api/data').then(r => r.json());
  return processData(data);
}
\`\`\`

**Higher-Order Functions:**
\`\`\`javascript
// Functions that take or return functions
const multiplyBy = (factor) => (number) => number * factor;
const double = multiplyBy(2);
console.log(double(5)); // 10
\`\`\`

**Modules (ES6):**
\`\`\`javascript
// Export
export const PI = 3.14159;
export function calculateArea(radius) {
  return PI * radius * radius;
}

// Import
import { PI, calculateArea } from './math.js';
\`\`\``,
      
      frameworks: `**Popular JavaScript Frameworks:**

**React:**
- Component-based UI library
- Virtual DOM for performance
- Hooks for state management
- JSX syntax

**Vue.js:**
- Progressive framework
- Easy to learn
- Great documentation
- Two-way data binding

**Angular:**
- Full-featured framework
- TypeScript-based
- Dependency injection
- Strong typing

**Node.js:**
- JavaScript runtime for server-side
- Event-driven, non-blocking I/O
- NPM ecosystem
- Great for APIs and real-time apps`
    },
    
    python: {
      basics: `Python is a versatile, high-level programming language known for its simplicity and readability. Here's a comprehensive guide:

**Key Features:**
- **Readable Syntax**: Code reads like English
- **Dynamic Typing**: No need to declare variable types
- **Interpreted**: Runs directly without compilation
- **Multi-paradigm**: Supports OOP, functional, and procedural programming

**Core Concepts:**

\`\`\`python
# Variables and Types
name = "Python"
age = 30
price = 19.99
is_active = True

# Lists (arrays)
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
fruits[0]  # "apple"

# Dictionaries (objects)
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Functions
def greet(name):
    return f"Hello, {name}!"

# List Comprehensions (powerful!)
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# Lambda Functions
multiply = lambda x, y: x * y
\`\`\`

**Common Use Cases:**
- Web Development (Django, Flask)
- Data Science & Machine Learning
- Automation & Scripting
- API Development
- Scientific Computing

What Python topic interests you?`,
      
      advanced: `**Advanced Python Concepts:**

**Decorators:**
\`\`\`python
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Function took {end - start} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(2)
\`\`\`

**Generators:**
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Memory efficient - generates on demand
for num in fibonacci():
    if num > 1000:
        break
    print(num)
\`\`\`

**Context Managers:**
\`\`\`python
with open('file.txt', 'r') as f:
    content = f.read()
# File automatically closed
\`\`\`

**Exception Handling:**
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Always executes")
\`\`\``
    },
    
    react: {
      basics: `React is a powerful JavaScript library for building user interfaces. Here's a comprehensive guide:

**Core Concepts:**

**Components:**
\`\`\`jsx
// Functional Component (Modern)
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow Function
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;
\`\`\`

**Hooks:**
\`\`\`jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

**Props and State:**
- **Props**: Data passed from parent to child (read-only)
- **State**: Component's internal data (can change)

**Key Hooks:**
- \`useState\`: Manage component state
- \`useEffect\`: Handle side effects
- \`useContext\`: Access context values
- \`useReducer\`: Complex state management
- \`useMemo\`: Memoize expensive calculations
- \`useCallback\`: Memoize functions

What React topic would you like to explore?`,
      
      advanced: `**Advanced React Patterns:**

**Custom Hooks:**
\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}
\`\`\`

**Context API:**
\`\`\`jsx
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
\`\`\`

**Performance Optimization:**
- React.memo for component memoization
- useMemo for expensive calculations
- useCallback for function memoization
- Code splitting with React.lazy`
    }
  },

  // Science - Detailed
  science: {
    physics: {
      basics: `Physics is the study of matter, motion, energy, and the fundamental forces of nature. Here's a comprehensive overview:

**Classical Mechanics:**
- **Newton's Laws of Motion:**
  1. An object at rest stays at rest unless acted upon
  2. F = ma (Force = mass × acceleration)
  3. For every action, there's an equal and opposite reaction

- **Energy:**
  - Kinetic Energy: KE = ½mv²
  - Potential Energy: PE = mgh
  - Conservation: Energy cannot be created or destroyed

**Thermodynamics:**
- **Laws:**
  1. Energy is conserved
  2. Entropy always increases
  3. Absolute zero is unattainable

**Electromagnetism:**
- Electric fields and magnetic fields
- Maxwell's equations describe electromagnetic waves
- Light is an electromagnetic wave

**Modern Physics:**
- **Quantum Mechanics**: Behavior of particles at atomic scale
- **Relativity**: Einstein's theories of special and general relativity
- **Particle Physics**: Study of fundamental particles

What physics topic would you like to explore?`,
      
      quantum: `**Quantum Mechanics:**

**Key Principles:**
- **Wave-Particle Duality**: Particles exhibit both wave and particle properties
- **Uncertainty Principle**: Can't know position and momentum simultaneously
- **Superposition**: Particles exist in multiple states until observed
- **Entanglement**: Particles can be correlated across distances

**Applications:**
- Quantum computing
- Quantum cryptography
- Medical imaging (MRI)
- Lasers and semiconductors

**Famous Experiments:**
- Double-slit experiment
- Schrödinger's cat thought experiment
- Bell's theorem`
    },
    
    chemistry: {
      basics: `Chemistry is the study of matter, its properties, composition, and changes. Here's a comprehensive guide:

**Atomic Structure:**
- **Atoms**: Basic building blocks of matter
  - Protons (positive charge)
  - Neutrons (neutral)
  - Electrons (negative charge)
- **Elements**: Pure substances made of one type of atom
- **Periodic Table**: Organizes elements by atomic number and properties

**Chemical Bonds:**
- **Ionic Bonds**: Transfer of electrons (NaCl)
- **Covalent Bonds**: Sharing of electrons (H₂O)
- **Metallic Bonds**: Sea of electrons (metals)

**Chemical Reactions:**
\`\`\`
2H₂ + O₂ → 2H₂O (Combustion)
NaCl + AgNO₃ → NaNO₃ + AgCl (Precipitation)
\`\`\`

**States of Matter:**
- Solid: Fixed shape and volume
- Liquid: Fixed volume, variable shape
- Gas: Variable shape and volume
- Plasma: Ionized gas (stars, lightning)

**Organic Chemistry:**
- Study of carbon-containing compounds
- Basis of life (proteins, DNA, carbohydrates)
- Petroleum and pharmaceuticals

What chemistry topic interests you?`,
      
      organic: `**Organic Chemistry:**

**Functional Groups:**
- **Alkanes**: Single bonds (CH₄ - methane)
- **Alkenes**: Double bonds (C₂H₄ - ethene)
- **Alcohols**: OH group (C₂H₅OH - ethanol)
- **Carboxylic Acids**: COOH group (CH₃COOH - acetic acid)

**Biomolecules:**
- **Proteins**: Made of amino acids
- **Carbohydrates**: Sugars and starches
- **Lipids**: Fats and oils
- **Nucleic Acids**: DNA and RNA`
    },
    
    biology: {
      basics: `Biology is the study of living organisms and their interactions. Here's a comprehensive overview:

**Cell Biology:**
- **Cell Theory**: All living things are made of cells
- **Cell Types:**
  - Prokaryotic: No nucleus (bacteria)
  - Eukaryotic: Has nucleus (plants, animals, fungi)

**Cell Structure:**
- **Nucleus**: Contains DNA
- **Mitochondria**: Powerhouse (energy production)
- **Ribosomes**: Protein synthesis
- **Cell Membrane**: Controls what enters/exits

**Genetics:**
- **DNA**: Genetic code (double helix)
- **Genes**: Segments of DNA coding for traits
- **Chromosomes**: Organized DNA structures
- **Mendelian Inheritance**: Dominant/recessive traits

**Evolution:**
- **Natural Selection**: Survival of the fittest
- **Adaptation**: Traits that help survival
- **Speciation**: Formation of new species
- **Evidence**: Fossils, DNA, anatomy

**Ecology:**
- **Ecosystems**: Communities of organisms
- **Food Chains**: Energy flow
- **Biomes**: Major ecosystem types
- **Biodiversity**: Variety of life

What biological topic would you like to explore?`,
      
      genetics: `**Genetics Deep Dive:**

**DNA Structure:**
- Double helix (Watson & Crick, 1953)
- Base pairs: A-T, G-C
- Contains genetic instructions

**Gene Expression:**
- **Transcription**: DNA → RNA
- **Translation**: RNA → Protein
- **Central Dogma**: DNA → RNA → Protein

**Genetic Engineering:**
- CRISPR-Cas9 gene editing
- GMOs (Genetically Modified Organisms)
- Gene therapy
- Cloning

**Human Genetics:**
- 23 pairs of chromosomes
- ~20,000-25,000 genes
- Genetic disorders
- Inheritance patterns`
    }
  },

  // Technology & Computing
  technology: {
    ai: {
      basics: `**Artificial Intelligence (AI) - Comprehensive Guide:**

**What is AI?**
AI is the simulation of human intelligence by machines, enabling them to learn, reason, and make decisions.

**Types of AI:**
- **Narrow AI**: Specialized tasks (chess, image recognition)
- **General AI**: Human-like intelligence (not yet achieved)
- **Machine Learning**: AI that learns from data
- **Deep Learning**: Neural networks with multiple layers

**Machine Learning Types:**
- **Supervised Learning**: Learning from labeled data
- **Unsupervised Learning**: Finding patterns in unlabeled data
- **Reinforcement Learning**: Learning through rewards/punishments

**Applications:**
- Natural Language Processing (NLP)
- Computer Vision
- Recommendation Systems
- Autonomous Vehicles
- Medical Diagnosis
- Fraud Detection

**Popular Tools:**
- TensorFlow, PyTorch (frameworks)
- ChatGPT, GPT models (language)
- Computer vision APIs

What AI topic would you like to explore?`,
      
      ml: `**Machine Learning Deep Dive:**

**Algorithms:**
- **Linear Regression**: Predicting continuous values
- **Decision Trees**: Tree-based decisions
- **Neural Networks**: Brain-inspired networks
- **K-Means**: Clustering algorithm
- **SVM**: Support Vector Machines

**Process:**
1. Data Collection
2. Data Preprocessing
3. Model Selection
4. Training
5. Evaluation
6. Deployment

**Key Concepts:**
- **Overfitting**: Model too complex
- **Underfitting**: Model too simple
- **Cross-validation**: Testing model performance
- **Feature Engineering**: Creating better inputs`
    },
    
    web: {
      basics: `**Web Development - Complete Guide:**

**Frontend Technologies:**
- **HTML**: Structure and content
- **CSS**: Styling and layout
- **JavaScript**: Interactivity
- **Frameworks**: React, Vue, Angular

**Backend Technologies:**
- **Server-side Languages**: Node.js, Python, Java, PHP
- **Databases**: MySQL, PostgreSQL, MongoDB
- **APIs**: REST, GraphQL
- **Authentication**: JWT, OAuth

**Full Stack:**
- **MERN**: MongoDB, Express, React, Node.js
- **MEAN**: MongoDB, Express, Angular, Node.js
- **LAMP**: Linux, Apache, MySQL, PHP

**Web Architecture:**
- **Client-Server Model**
- **HTTP/HTTPS Protocols**
- **RESTful APIs**
- **Microservices**

**Best Practices:**
- Responsive design
- Security (HTTPS, input validation)
- Performance optimization
- SEO (Search Engine Optimization)
- Accessibility (WCAG guidelines)

What web development topic interests you?`
    }
  },

  // Mathematics
  mathematics: {
    algebra: `**Algebra - Comprehensive Guide:**

**Basic Concepts:**
- **Variables**: Letters representing unknown values (x, y)
- **Equations**: Mathematical statements with = sign
- **Expressions**: Combinations of numbers and variables

**Linear Equations:**
\`\`\`
y = mx + b (slope-intercept form)
ax + b = 0 (standard form)
\`\`\`

**Quadratic Equations:**
\`\`\`
ax² + bx + c = 0
Solutions: x = (-b ± √(b² - 4ac)) / 2a
\`\`\`

**Polynomials:**
- Degree: Highest power
- Factoring: Breaking into simpler parts
- Operations: Addition, subtraction, multiplication, division

**Systems of Equations:**
- Substitution method
- Elimination method
- Graphing method`,
    
    calculus: `**Calculus - Fundamental Concepts:**

**Differential Calculus:**
- **Derivatives**: Rate of change
  - d/dx(xⁿ) = nxⁿ⁻¹
  - Product rule, quotient rule, chain rule
- **Applications**: Optimization, motion, growth rates

**Integral Calculus:**
- **Integrals**: Accumulation of quantities
  - Antiderivatives
  - Definite vs. Indefinite integrals
- **Applications**: Area under curves, volumes, work

**Fundamental Theorem:**
- Connection between derivatives and integrals
- ∫ f'(x)dx = f(x) + C`
  },

  // Business & Economics
  business: {
    entrepreneurship: `**Entrepreneurship - Complete Guide:**

**Starting a Business:**
1. **Idea Generation**: Solve a problem
2. **Market Research**: Validate demand
3. **Business Plan**: Roadmap for success
4. **Funding**: Bootstrapping, investors, loans
5. **Legal Structure**: LLC, Corporation, Partnership
6. **Marketing**: Reach your audience
7. **Operations**: Day-to-day management

**Key Concepts:**
- **MVP**: Minimum Viable Product
- **Lean Startup**: Build, measure, learn
- **Pivot**: Change direction based on feedback
- **Scalability**: Ability to grow

**Business Models:**
- B2B (Business to Business)
- B2C (Business to Consumer)
- SaaS (Software as a Service)
- Marketplace
- Subscription

**Funding Options:**
- Bootstrapping
- Angel Investors
- Venture Capital
- Crowdfunding
- Bank Loans`,
    
    finance: `**Finance & Investment:**

**Personal Finance:**
- Budgeting: Income vs. Expenses
- Saving: Emergency fund (3-6 months)
- Investing: Stocks, bonds, real estate
- Retirement: 401(k), IRA

**Investment Types:**
- **Stocks**: Ownership in companies
- **Bonds**: Loans to governments/companies
- **Mutual Funds**: Diversified portfolios
- **ETFs**: Exchange-traded funds
- **Real Estate**: Property investment

**Key Metrics:**
- ROI (Return on Investment)
- Compound Interest
- Diversification
- Risk vs. Reward

**Financial Planning:**
- Set financial goals
- Create budget
- Build emergency fund
- Invest for long-term
- Plan for retirement`
  },

  // History
  history: {
    ancient: `**Ancient Civilizations:**

**Mesopotamia (3500-500 BCE):**
- Cradle of civilization
- Writing system (cuneiform)
- Code of Hammurabi
- Ziggurats

**Ancient Egypt (3100-30 BCE):**
- Pyramids and pharaohs
- Hieroglyphics
- Nile River civilization
- Mummification

**Ancient Greece (800-146 BCE):**
- Democracy (Athens)
- Philosophy (Socrates, Plato, Aristotle)
- Olympics
- Architecture and art

**Roman Empire (27 BCE-476 CE):**
- Republic to Empire
- Engineering (roads, aqueducts)
- Law (Twelve Tables)
- Latin language`,
    
    modern: `**Modern History (1500-Present):**

**Renaissance (14th-17th century):**
- Rebirth of art and learning
- Leonardo da Vinci, Michelangelo
- Scientific revolution

**Industrial Revolution (1760-1840):**
- Steam power
- Factory system
- Urbanization
- Economic transformation

**World Wars:**
- **WWI (1914-1918)**: Trench warfare, new weapons
- **WWII (1939-1945)**: Global conflict, Holocaust, atomic bomb

**Cold War (1947-1991):**
- US vs. USSR
- Space Race
- Nuclear arms race
- Proxy wars`
  },

  // Health & Wellness
  health: {
    nutrition: `**Nutrition - Complete Guide:**

**Macronutrients:**
- **Carbohydrates**: Primary energy source (4 cal/g)
  - Simple: Sugars
  - Complex: Starches, fiber
- **Proteins**: Building blocks (4 cal/g)
  - Essential for muscle, enzymes, hormones
- **Fats**: Energy storage (9 cal/g)
  - Saturated, unsaturated, trans fats

**Micronutrients:**
- **Vitamins**: A, B complex, C, D, E, K
- **Minerals**: Calcium, iron, zinc, magnesium

**Healthy Eating:**
- Balanced diet: Variety of foods
- Portion control
- Hydration: 8 glasses water/day
- Limit processed foods
- Fruits and vegetables daily

**Dietary Patterns:**
- Mediterranean diet
- Plant-based
- Keto (low carb)
- Intermittent fasting`,
    
    fitness: `**Fitness & Exercise:**

**Types of Exercise:**
- **Cardio**: Heart health (running, cycling, swimming)
- **Strength Training**: Muscle building (weights, resistance)
- **Flexibility**: Stretching, yoga
- **Balance**: Stability exercises

**Benefits:**
- Improved cardiovascular health
- Stronger muscles and bones
- Better mental health
- Weight management
- Increased energy

**Exercise Guidelines:**
- 150 minutes moderate cardio/week
- 2+ strength training sessions/week
- Include flexibility work
- Start gradually, progress slowly

**Recovery:**
- Rest days important
- Sleep: 7-9 hours
- Proper nutrition
- Hydration`
  }
};

// Helper function to search extended knowledge
export function searchExtendedKnowledge(topic, subtopic = null) {
  const lowerTopic = topic.toLowerCase();
  
  // Programming topics
  if (lowerTopic.includes('javascript') || lowerTopic.includes('js')) {
    if (subtopic?.includes('advanced') || subtopic?.includes('closure') || subtopic?.includes('async')) {
      return extendedKnowledge.programming.javascript.advanced;
    }
    if (subtopic?.includes('framework') || subtopic?.includes('react') || subtopic?.includes('vue')) {
      return extendedKnowledge.programming.javascript.frameworks;
    }
    return extendedKnowledge.programming.javascript.basics;
  }
  
  if (lowerTopic.includes('python') || lowerTopic.includes('py')) {
    if (subtopic?.includes('advanced') || subtopic?.includes('decorator') || subtopic?.includes('generator')) {
      return extendedKnowledge.programming.python.advanced;
    }
    return extendedKnowledge.programming.python.basics;
  }
  
  if (lowerTopic.includes('react')) {
    if (subtopic?.includes('advanced') || subtopic?.includes('hook') || subtopic?.includes('context')) {
      return extendedKnowledge.programming.react.advanced;
    }
    return extendedKnowledge.programming.react.basics;
  }
  
  // Science topics
  if (lowerTopic.includes('physics')) {
    if (subtopic?.includes('quantum')) {
      return extendedKnowledge.science.physics.quantum;
    }
    return extendedKnowledge.science.physics.basics;
  }
  
  if (lowerTopic.includes('chemistry')) {
    if (subtopic?.includes('organic')) {
      return extendedKnowledge.science.chemistry.organic;
    }
    return extendedKnowledge.science.chemistry.basics;
  }
  
  if (lowerTopic.includes('biology')) {
    if (subtopic?.includes('genetic') || subtopic?.includes('dna')) {
      return extendedKnowledge.science.biology.genetics;
    }
    return extendedKnowledge.science.biology.basics;
  }
  
  // Technology
  if (lowerTopic.includes('ai') || lowerTopic.includes('artificial intelligence')) {
    if (subtopic?.includes('machine learning') || subtopic?.includes('ml')) {
      return extendedKnowledge.technology.ai.ml;
    }
    return extendedKnowledge.technology.ai.basics;
  }
  
  if (lowerTopic.includes('web') || lowerTopic.includes('website') || lowerTopic.includes('frontend') || lowerTopic.includes('backend')) {
    return extendedKnowledge.technology.web.basics;
  }
  
  // Mathematics
  if (lowerTopic.includes('algebra') || lowerTopic.includes('equation')) {
    return extendedKnowledge.mathematics.algebra;
  }
  
  if (lowerTopic.includes('calculus') || lowerTopic.includes('derivative') || lowerTopic.includes('integral')) {
    return extendedKnowledge.mathematics.calculus;
  }
  
  // Business
  if (lowerTopic.includes('entrepreneur') || lowerTopic.includes('startup') || lowerTopic.includes('business')) {
    return extendedKnowledge.business.entrepreneurship;
  }
  
  if (lowerTopic.includes('finance') || lowerTopic.includes('investment') || lowerTopic.includes('stock') || lowerTopic.includes('money')) {
    return extendedKnowledge.business.finance;
  }
  
  // History
  if (lowerTopic.includes('ancient') || lowerTopic.includes('egypt') || lowerTopic.includes('greece') || lowerTopic.includes('rome')) {
    return extendedKnowledge.history.ancient;
  }
  
  if (lowerTopic.includes('modern') || lowerTopic.includes('world war') || lowerTopic.includes('renaissance')) {
    return extendedKnowledge.history.modern;
  }
  
  // Health
  if (lowerTopic.includes('nutrition') || lowerTopic.includes('diet') || lowerTopic.includes('food')) {
    return extendedKnowledge.health.nutrition;
  }
  
  if (lowerTopic.includes('fitness') || lowerTopic.includes('exercise') || lowerTopic.includes('workout')) {
    return extendedKnowledge.health.fitness;
  }
  
  return null;
}


