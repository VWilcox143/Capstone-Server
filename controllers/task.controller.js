const router = require('express').Router();
const Expense = require('../models/task.model');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');


//! Create

//! Get One by ID

//! Get all

//! Update by ID

//! Delete by ID
router.delete('/id', validateSession, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteExpense = await Expense.deleteOne({_id: id, owner_id: req.user._id});

        deleteExpense/deletedCount ?
            successHandling(res, "Expense Deleted") :
            incompleteHandling(res) 
        } catch (err) {
            errorHandling(res, err);
        }
});

module.exports = router;