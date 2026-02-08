const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [1, 'Title cannot be empty'],
    },
    status: {
        type: String,
        default: 'Todo',
    },
    order: {
        type: Number,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
