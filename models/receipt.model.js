const mongoose = require('mongoose');

const Receipt = new mongoose.Schema({
    type: String,
    date: String,
    amount: Number,
    task_id: {
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    },
    subTask_id: {
        type: mongoose.Types.ObjectId,
        ref: "SubTask"
    }
});

module.exports = mongoose.model('Receipt', Receipt);