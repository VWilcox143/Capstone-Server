const router = require('express').Router();
const {Receipt, Task} = require('../models');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
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

        newReceipt ? 
        successHandling(res, `Receipt Created:`) :
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

//! Get by task
router.get('/:taskId', validateSession, async (req, res) => {
    try {
        
        const { taskId } = req.params

        const getReceipts = await Receipt.find({task_id: taskId})
        console.log(getReceipts)

        if(!getReceipts) throw new Error ('no receipt found');

        getReceipts.length > 0 ?
        res.status(200).json({
            result: getReceipts
        }) :
        res.status(404).json({
            result: 'Try another date'
        })

    } catch (err) {
        errorHandling(res, err)
    }
})

//! Get all by type 

router.get('/type/:type', async (req, res) => {
    try {

        const { type } = req.params;
        let buildWord;

        if(type) {
        
            for(let i = 0; i < type.length; i++) {

                if(i === 0) {
                    buildWord = type[i].toUpperCase();
                } else if(type[i-1] === "-" || type[i -1] === " ") {
                    buildWord += type[i].toUpperCase();
                } else {
                    buildWord += type[i].toLowerCase();
                }
            }
        }

        const getType = await Receipt.find({type: buildWord});

        getType.length > 0 ?
            res.status(200).json({
                result: getType
            }) :
            res.status(404).json({
                result: 'Try another type'
            })

    } catch (err) {
        errorHandling(res, err)
    }
});

//! Update One

//! Delete one
router.delete('/:id', validateSession, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteReceipt = await Receipt.findOneAndDelete({_id: id, owner_id: req.user._id});
console.log(deleteReceipt)
        deleteReceipt._id ?
            successHandling(res, "Receipt Deleted") :
            incompleteHandling(res) 
        } catch (err) {
            errorHandling(res, err);
        }
});
module.exports = router;