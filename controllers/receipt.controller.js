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
router.get('/', validateSession, async (req, res) => {
    try {

        const allReceipt = await Receipt.find();

        allReceipt.length > 0 ? 
            res.status(200).json({
                result: allReceipt
            }) :
            res.status(404).json({
                result: `No Receipts found`
            });

    } catch (err) {
        errorHandling(res, err)
    }
});

//! Get all by date
router.get('/date', validateSession, async (req, res) => {
    try {
        
        let { date } = req.query;
        date = date.split('-').join('/');
        console.log(date)
        // let formattedDate = new Date(date)
        // console.log(formattedDate.toISOString())
        const getDate = await Receipt.find({date: date})
        console.log(getDate)

        if(!getDate) throw new Error ('no receipt found');

        getDate.length > 0 ?
        res.status(200).json({
            result: getDate
        }) :
        res.status(404).json({
            result: 'Try another date'
        })

    } catch (err) {
        errorHandling(res, err)
    }
})

//! Get all by type

//! Update One

//!Delete one

module.exports = router;