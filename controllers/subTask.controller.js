const router = require('express').Router();
const {SubTask, Task} = require('../models');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');

//!Create
router.post('/:task', validateSession, async (req, res) => { 
    try{
        const {Job, date, hoursWorked, mileage} = req.body;

        const {task} = req.params;

        const taskCheck = await Task.find({_id: task})

        if(!taskCheck) throw new Error('Task not available');

        const subTask = new SubTask({
            Job,
            date,
            hoursWorked,
            mileage,
            task_id: task
        })

        const newSubTask = await subTask.save();

        newSubTask ? 
        successHandling(res, `Entry Created:`) :
        incompleteHandling(res);
    } catch (err) {
        errorHandling(res, err)
    }
})

//! Get all

router.get('/', validateSession, async (req, res) => {
    try {

        const allSubTask = await SubTask.find({ owner_id: req.user._id });

        allSubTask.length > 0 ? 
            res.status(200).json({
                result: allSubTask
            }) :
            res.status(404).json({
                result: `No expenses found`
            });

    } catch (err) {
        errorHandling(res, err)
    }
});

module.exports = router;

//! Get by task
router.get('/:taskId', validateSession, async (req, res) => {
    try {
        
        const { taskId } = req.params

        const getSubTask = await SubTask.find({task_id: taskId})
        console.log(getSubTask)

        if(!getSubTask) throw new Error ('no receipt found');

        getSubTask.length > 0 ?
        res.status(200).json({
            result: getSubTask
        }) :
        res.status(404).json({
            result: 'Try another date'
        })

    } catch (err) {
        errorHandling(res, err)
    }
})


