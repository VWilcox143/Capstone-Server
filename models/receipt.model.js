const mongoose = require('mongoose');

const Receipt = new mongoose.Schema({

    type:{
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    
    amount: {
        type: Number,
        required: true
    },
    subTask_id: {
        type: mongoose.Types.ObjectId,
        ref: "SubTask"
    },
    
    task_id: {
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    }
});

module.exports = mongoose.model('Receipt', Receipt);