# CrusAIders - AI Innovation Task Force

<div align="center">
  <img src="generated-icon.png" alt="CrusAIders Logo" width="200">
  <p>A modern web platform blending medieval crusader themes with futuristic AI aesthetics</p>
</div>

## 🌟 Overview

CrusAIders is a neo-futuristic web platform for an AI task force that combines medieval crusader symbolism with cutting-edge AI aesthetics. The platform showcases the team, their innovative AI projects, and provides ways to engage with their mission through workshop registrations and idea submissions.

### Key Features

- Interactive neural network animations throughout the site
- Team member profiles with expandable details
- Project showcase with filtering capabilities
- Contact and idea submission forms
- Workshop registration system
- Responsive design optimized for all devices

### Technologies Used

- **Frontend**: React, TypeScript, Framer Motion, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Data Management**: In-memory storage with Drizzle ORM
- **API Integration**: RESTful API endpoints
- **Animations**: Interactive canvas-based neural network visualizations
- **Styling**: Custom theme with neo-futuristic design elements

## 🚀 Getting Started

These instructions will help you set up the project locally and deploy it to a cloud environment.

### Prerequisites

- Node.js 16+ (recommended: v20.x)
- npm 8+ or Yarn 1.22+
- Git

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/crusaiders.git
   cd crusaiders
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will start both the Express backend and the Vite development server concurrently.

4. **View the application**

   Open your browser and navigate to `http://localhost:5000`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# For Production with a database
# DATABASE_URL=your_database_connection_string
```

## 🔧 Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and constants
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main application component
│   ├── index.html         # HTML template
│   └── vite.config.ts     # Vite configuration
├── server/                # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage implementation
│   └── vite.ts            # Vite integration for the server
├── shared/                # Shared code between client and server
│   └── schema.ts          # Data schemas and types
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint for code linting

## 📦 Deployment

### Deploying to Replit

The application is pre-configured for Replit deployment:

1. Fork the project on Replit
2. Click on the "Run" button to start the application
3. Once the app is running, click the "Deploy" button in the Replit UI
4. Follow the deployment steps in the Replit interface

Your application will be available at a `.replit.app` domain.

### Deploying to Vercel

1. **Build Setup**

   Create a `vercel.json` file in the root directory:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "client/package.json",
         "use": "@vercel/static-build",
         "config": { "distDir": "dist" }
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/index.ts"
       },
       {
         "src": "/(.*)",
         "dest": "client/dist/$1"
       }
     ]
   }
   ```

2. **Deploy Command**

   ```bash
   vercel
   ```

### Deploying to Heroku

1. **Create a Procfile**

   ```
   web: npm run start
   ```

2. **Deploy to Heroku**

   ```bash
   # Login to Heroku
   heroku login

   # Create a new Heroku app
   heroku create crusaiders-app

   # Add Heroku as a remote
   git remote add heroku https://git.heroku.com/crusaiders-app.git

   # Push to Heroku
   git push heroku main

   # Open the deployed app
   heroku open
   ```

### Database Configuration for Production

For production deployments, configure a PostgreSQL database:

1. Provision a PostgreSQL database in your cloud environment
2. Set the `DATABASE_URL` environment variable
3. Update the Drizzle configuration in `drizzle.config.ts` if needed

## 🧠 Advanced Features Implementation

### Neural Network Background

The neural network background is implemented using HTML5 Canvas. The animation creates a dynamic network of nodes and connections with simulated data flow, giving a visual representation of AI processing.

To modify the animation parameters:

```typescript
// In client/src/components/NeuralBackground.tsx
<NeuralBackground 
  opacity={0.9}          // Adjust opacity
  color="#00BFFF"        // Change color
  particleDensity={15}   // Modify particle density
/>
```

### Adding Team Members and Projects

The application uses in-memory storage for development. To add new team members or projects:

1. Update the sample data in `server/storage.ts` 
2. Or add API integration by modifying the appropriate service methods

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🔒 Security Considerations

- In production, implement proper user authentication and authorization
- Add rate limiting to API endpoints to prevent abuse
- Consider adding CSRF protection for form submissions
- Use HTTPS for all traffic in production environments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial development

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) - For elegant UI components
- [Replit](https://replit.com/) - For providing development and deployment platform
- Font Awesome - For icons used throughout the application