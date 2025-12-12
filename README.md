# AI Chatbot - React Application

A modern, feature-rich AI chatbot built with React, featuring a beautiful UI, conversation management, and markdown support.

## ✨ Features

### Core Features
- 🤖 **AI Chat Interface** - Interactive chat with intelligent responses
- 💬 **Conversation Management** - Create, edit, and delete chat sessions
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- ⚡ **Real-time Updates** - Instant message delivery and typing indicators

### Advanced Features
- 📝 **Markdown Support** - Rich text formatting, code highlighting, and links
- 💾 **Local Storage** - Persistent conversation history
- 🔄 **Auto-scroll** - Automatically scrolls to latest messages
- ⌨️ **Keyboard Shortcuts** - Enter to send, Shift+Enter for new lines
- 🎯 **Smart Responses** - Context-aware AI responses based on conversation history

### UI Components
- 🎭 **Chat Bubbles** - Distinct styling for user and AI messages
- 👤 **User Avatars** - Visual representation of message senders
- ⏱️ **Timestamps** - Message timing information
- 🎬 **Typing Indicators** - Animated dots when AI is responding
- 🗑️ **Conversation Tabs** - Easy navigation between chat sessions

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: React Markdown
- **Code Highlighting**: React Syntax Highlighter
- **State Management**: React Hooks + Local Storage

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

### API Integration
The app currently uses mock responses for demonstration. To integrate with real AI APIs:

1. **OpenAI Integration**
   - Uncomment the production code in `src/hooks/useChatAPI.js`
   - Set up your OpenAI API key
   - Create a backend API endpoint at `/api/chat`

2. **Custom AI Provider**
   - Modify the `sendMessage` function in `useChatAPI.js`
   - Update the API endpoint and request format

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ChatInterface.js # Main chat interface
│   ├── Header.js       # Navigation and conversation tabs
│   ├── Message.js      # Individual message component
│   ├── MessageInput.js # Input field and send button
│   ├── MessageList.js  # List of all messages
│   └── TypingIndicator.js # Loading animation
├── hooks/              # Custom React hooks
│   ├── useChatAPI.js   # AI API integration
│   └── useLocalStorage.js # Local storage management
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for custom CSS classes
- Use Tailwind utility classes for component styling

### Components
- Each component is modular and easily customizable
- Props are well-documented for easy modification
- Styling classes can be adjusted without breaking functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

## 🔒 Security Considerations

- **API Keys**: Never expose API keys in frontend code
- **Backend Proxy**: Use a backend service to proxy API calls
- **Rate Limiting**: Implement rate limiting on your backend
- **Input Validation**: Sanitize user inputs before processing

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- OpenAI for inspiring AI integration

## 📞 Support

If you have any questions or need help:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Happy Chatting! 🤖✨**





