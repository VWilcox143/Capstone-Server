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
    
    task_id: {
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    }
});

module.exports = mongoose.model('Receipt', Receipt);