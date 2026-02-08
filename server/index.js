const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Task = require('./models/Task');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Add detailed logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kanban';
console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        try { fs.appendFileSync('server_err.txt', `${new Date().toISOString()} - DB Connection Error: ${err.message}\n`); } catch (e) { }
        console.error('Please check your IP whitelist in MongoDB Atlas or your network connection.');
        // Continue running server even if DB fails, but endpoints will specific errors
    });

// Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ order: 1 });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: err.message, error: 'Database error' });
    }
});

// Create a task
app.post('/tasks', async (req, res) => {
    try {
        console.log('Received POST /tasks', req.body);
        const { title, status, order } = req.body;

        if (!req.body) {
            throw new Error('Request body is missing');
        }

        const task = new Task({
            title,
            status,
            order,
        });

        const newTask = await task.save();
        console.log('Task saved successfully:', newTask._id);
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error in POST /tasks:', err);
        try {
            fs.appendFileSync('server_err.txt', `${new Date().toISOString()} - POST /tasks Error: ${err.message}\n${err.stack}\n`);
        } catch (fileErr) {
            console.error('Failed to write to error log:', fileErr);
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message, error: 'Validation Error' });
        }
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
});

// Update a task (move or rename)
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.body.title != null) {
            task.title = req.body.title;
        }
        if (req.body.status != null) {
            task.status = req.body.status;
        }
        if (req.body.order != null) {
            task.order = req.body.order;
        }

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: err.message });
    }
});


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    fs.writeFileSync('server_status.txt', `Running on port ${PORT} at ${new Date().toISOString()}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        // Ideally user should kill the other process, but we exit here
        process.exit(1);
    } else {
        console.error('Server error:', e);
    }
});

// Handle uncaught exceptions so server doesn't crash silently
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Force Keep-Alive
setInterval(() => { }, 10000);
