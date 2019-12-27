const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskid: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    state: {
        type: String,
        default: 'Pending',
    },
    userid: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;