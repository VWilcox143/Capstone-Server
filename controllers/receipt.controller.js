const router = require('express').Router();
const {Receipt, Task} = require('../models');
const { errorHandling, successHandling, incompleteHandling} = require('../helpers');
const validateSession = require('../middleware/validateSession');

//!Create
router.post('/:task', validateSession, async (req, res) => {
    try{
        const {type, date, amount} = req.body;

        const {task} = req.params;

        const taskCheck = await Task.find({_id: task})

        if(!taskCheck) throw new Error('Task not available');

        const receipt = new Receipt({
            type,
            date,
            amount,
            task_id: task
        })

        const newReceipt = await receipt.save();

        const forTask = {
            id: newReceipt._id,
            type: newReceipt.type,
            date: newReceipt.date,
            amount: newReceipt.amount
        }

        await Task.findOneAndUpdate(
            {_id: task},
            {$push: {receipts: forTask}}
        )
        newReceipt ? 
        successHandling(res, `Receipt Created: ${newReceipt}`) :
        incompleteHandling(res);
    } catch (err) {
        errorHandling(res, err)
    }
})
//! Get all 

//! Get all by date

//! Get all by type

//! Update One

//!Delete one

module.exports = router;