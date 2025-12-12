# Deployment Guide

This guide will help you deploy your AI Chatbot to various platforms.

## 🚀 Frontend Deployment

### 1. Build for Production

First, create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### 2. Deploy to Vercel (Recommended)

Vercel is perfect for React apps and offers free hosting.

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name
# - Set build command: npm run build
# - Set output directory: build
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set build command: `npm run build`
6. Set output directory: `build`
7. Click "Deploy"

### 3. Deploy to Netlify

Netlify also offers excellent free hosting.

#### Option A: Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### Option B: Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Click "Deploy site"

### 4. Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## 🔧 Backend Deployment

### 1. Deploy to Render

Render offers free Node.js hosting.

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New Web Service"
4. Connect your repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: 3001
8. Click "Create Web Service"

### 2. Deploy to Railway

Railway is another great option for Node.js apps.

1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your repository
6. Add environment variables
7. Deploy

### 3. Deploy to Heroku

```bash
# Install Heroku CLI
# Download from heroku.com

# Login
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set OPENAI_API_KEY=your_key_here

# Deploy
git push heroku main
```

## 🌐 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
```

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=production
```

## 🔒 Security Considerations

### 1. API Key Protection
- Never expose API keys in frontend code
- Always use backend proxy for API calls
- Use environment variables for sensitive data

### 2. CORS Configuration
```javascript
// In your backend
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### 3. Rate Limiting
```javascript
// Install: npm install express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📱 Mobile Deployment

### 1. React Native
The current code can be adapted for React Native with minimal changes.

### 2. Progressive Web App (PWA)
Add a `manifest.json` and service worker for PWA capabilities.

## 🔍 Monitoring & Analytics

### 1. Error Tracking
- Sentry for error monitoring
- LogRocket for session replay

### 2. Performance Monitoring
- Vercel Analytics
- Netlify Analytics
- Google Analytics

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (16+ required)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **API Calls Fail**
   - Verify CORS configuration
   - Check environment variables
   - Ensure backend is running

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check if CSS is being imported

### Debug Commands
```bash
# Check build output
npm run build

# Test production build locally
npx serve -s build

# Check for dependency issues
npm audit

# Update dependencies
npm update
```

## 📚 Additional Resources

- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)

---

**Happy Deploying! 🚀✨**





