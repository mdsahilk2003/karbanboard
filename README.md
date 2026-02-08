# Kanban Board

A full-stack Kanban board application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- ✨ Drag and drop tasks between columns (Todo, In Progress, Done)
- 📝 Inline editing of task titles
- ➕ Add new tasks to any column
- 🗑️ Delete tasks
- 💾 Persistent storage with MongoDB
- 🎨 Modern, responsive UI

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- @dnd-kit (drag and drop)
- Axios
- Lucide React (icons)

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- CORS

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mdsahilk2003/Karbon_board.git
cd Karbon_board
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables:
```bash
cd server
cp .env.example .env
# Edit .env and add your MongoDB connection string
```

4. Run the application:

**Development mode:**
```bash
# Terminal 1 - Start server
cd server
npm start

# Terminal 2 - Start client
cd client
npm run dev
```

The client will run on `http://localhost:3000` and the server on `http://localhost:5000`.

## Deployment

### Vercel (Frontend + Backend)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** client
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables in Vercel:
   - `MONGO_URI`: Your MongoDB connection string
5. Deploy!

## License

MIT
