const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['todo', 'in-progress', 'done'],
    },
    order: {
        type: Number,
        required: true,
    },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err;
    }
};

// Routes
app.get('/api/tasks', async (req, res) => {
    try {
        await connectDB();
        const tasks = await Task.find().sort({ order: 1 });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: err.message, error: 'Database error' });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        await connectDB();
        console.log('Received POST /api/tasks', req.body);
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
        console.error('Error in POST /api/tasks:', err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message, error: 'Validation Error' });
        }
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        await connectDB();
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

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await connectDB();
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: err.message });
    }
});

// Export for Vercel serverless
module.exports = app;
