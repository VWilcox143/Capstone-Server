const router = require('express').Router();
const  Expense  = require('../models/task.model');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');


//! Create
router.post('/:user', validateSession, async (req, res) => {
    try {
        
        const {Job, hoursWorked, randomExpenses, mileage} = req.body

        const task = new Expense({
            Date: req.date.date,
            Job,
            hoursWorked,
            randomExpenses, 
            mileage
        })

        const newTask = await task.save();

        newTask ?
            successHandling(res, newTask) :
            incompleteHandling(res);
    } catch (err) {
        errorHandling(res,err);    
    }
})

//! Get One by ID

//! Get all

//! Update by ID

//! Delete by ID