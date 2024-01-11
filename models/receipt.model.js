const mongoose = require('mongoose');

const Receipt = new mongoose.Schema({
    type: String,
    date: Date,
    amount: Number,
    job_id: {
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    }
});

module.exports = mongoose.model('Receipt', Receipt);