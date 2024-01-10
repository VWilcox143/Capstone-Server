const router = require('express').Router();
const Expense = require('../models/task.model');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');


//! Create

//! Get One by ID

//! Get all

router.get('/', validateSession, async (req, res) => {
    try {

        const allExpenses = await Expense.find();

        allExpenses.length > 0 ? 
            res.status(200).json({
                result: allExpenses
            }) :
            res.status(404).json({
                result: `No expenses found`
            });

    } catch (err) {
        errorResponse(res, err)
    }
});

//! Update by ID

router.patch('/:id', async (req, res) => {
    try {
        const filter = {
            _id: req.params.id,
            owner_id: req.user._id
        }
       
        const info = req.body;
        const returnOption = {new: true}; 
        const updated = await Expense.findOneAndUpdate(filter, info, returnOption);
        res.status(200).json({
            result: updated
        });

    } catch (err) {
        errorResponse(res, err)
    }
});

//! Delete by ID