const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    date: Date,
    Job: {
        type: String,
        required: true,
        unique: true
    },
    hoursWorked: {
        type: Number,
        required: true
    },
    randomExpenses: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    }


});

module.exports = mongoose.model('Expense', expenseSchema);