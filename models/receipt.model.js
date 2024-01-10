const mongoose = require('mongoose');

const receipt = new mongoose.Schema({
    type: String,
    date: Date,
    amount: Number,
    job_id: {
        type: mongoose.Types.ObjectId,
        ref: "expenseSchema"
    }
});

module.exports = mongoose.model('Receipt', Receipt);