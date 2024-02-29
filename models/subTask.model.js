const mongoose = require('mongoose');

const SubTask = new mongoose.Schema({
    
    Job: {
        type: String,
        required: true

    },

    date: {
        type: String,
        required: true
    },
    
    hoursWorked: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    task_id: {
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    }
    


});

module.exports = mongoose.model('SubTask', SubTask);