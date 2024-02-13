const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    
    Job: {
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
    contact: {
        type: String,
        required: true
    },

    contactEmail: {
        type: String,
        required: true,
        unique: false 
    },
    owner_id: mongoose.Types.ObjectId
    


});

module.exports = mongoose.model('Expense', expenseSchema);