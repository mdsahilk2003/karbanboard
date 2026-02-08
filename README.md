# 📋 Kanban Board

A beautiful, fully functional Kanban board built with React, TypeScript, and MongoDB. Drag and drop tasks between columns, edit titles inline, and persist data to the cloud.

![Kanban Board](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

- 🎯 **Drag & Drop** - Move tasks between Todo, In Progress, and Done columns
- ✏️ **Inline Editing** - Double-click any task to edit its title
- 🗑️ **Delete Tasks** - Remove tasks with a single click
- 💾 **Cloud Persistence** - All data saved to MongoDB Atlas
- 📱 **Responsive Design** - Works beautifully on mobile and desktop
- 🎨 **Modern UI** - Clean, gradient-based design with smooth animations

## 🚀 Live Demo

**[View Live App](https://your-app.vercel.app)** *(Update this after deployment)*

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **@dnd-kit** - Drag and drop functionality
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **Vercel Serverless Functions** - API hosting

## 📦 Project Structure

```
canbonBoard/
├── api/                    # Serverless API functions
│   ├── index.js           # Main API handler
│   └── package.json       # API dependencies
├── client/                # Frontend application
│   ├── src/
│   │   ├── App.tsx        # Main app component
│   │   ├── KanbanBoard.tsx # Kanban board logic
│   │   ├── TaskCard.tsx   # Individual task component
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.ts
├── server/                # Local development server
│   ├── index.js
│   └── models/Task.js
├── vercel.json           # Vercel configuration
├── deploy.ps1            # Deployment script (Windows)
└── DEPLOYMENT_STEPS.md   # Deployment guide
```

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure environment variables**
   
   Create `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the application**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

5. **Open browser**
   
   Navigate to `http://localhost:3000`

## 🌐 Deployment to Vercel

### Quick Deploy

1. **Run the deployment script:**
   ```powershell
   .\deploy.ps1
   ```

2. **Or manually:**
   - Create GitHub repository
   - Push code: `git push origin main`
   - Import to Vercel: https://vercel.com/new
   - Add `MONGO_URI` environment variable
   - Deploy!

For detailed instructions, see [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md)

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 🎨 Customization

### Change Colors

Edit `client/src/index.css`:
```css
:root {
    --color-primary: #your-color;
    --color-secondary: #your-color;
}
```

### Add New Columns

Edit `client/src/KanbanBoard.tsx`:
```typescript
const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
    { id: 'archived', title: 'Archived' }, // New column
];
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Contact

Created by **Your Name** - [Your Email/Website]

---

**⭐ Star this repo if you found it helpful!**
