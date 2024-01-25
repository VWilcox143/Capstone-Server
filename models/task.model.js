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
    mileage: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true
    },

    contactEmail: {
        type: String,
        required: true,
        unique: true
    }
    


});

module.exports = mongoose.model('Expense', expenseSchema);