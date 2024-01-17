const mongoose = require('mongoose');

const Receipt = new mongoose.Schema({
    type: String,
    date: String,
    amount: Number,
    task_id: {
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    }
});

module.exports = mongoose.model('Receipt', Receipt);