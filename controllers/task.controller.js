const router = require('express').Router();
const Expense  = require('../models/task.model');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');


//! Create
router.post('/task', validateSession, async (req, res) => {
    try {
        
        const {Job, hoursWorked, randomExpenses, mileage} = req.body

        const task = new Expense({
            Date: new Date(),
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
router.get ('/find-one/:id', validateSession, async(req,res) =>{
    try {

        const { id } = req.params;

        const task = await Expense.findOne({_id: id});

        task ? 
        successHandling(res, task) :
        incompleteHandling(res);

    } catch (err) {
        errorHandling(res,err);
    }
})
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
        errorHandling(res, err)
    }
});

//! Update by ID
router.patch('/:id', validateSession, async (req, res) => {
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
        errorHandling(res, err)
    }
});

//! Delete by ID
router.delete('/:id', validateSession, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteExpense = await Expense.findOneAndDelete({_id: id, owner_id: req.user._id});

        deleteExpense.deletedCount ?
            successHandling(res, "Expense Deleted") :
            incompleteHandling(res) 
        } catch (err) {
            errorHandling(res, err);
        }
});

module.exports = router;

