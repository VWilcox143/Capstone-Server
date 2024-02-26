const router = require('express').Router();
const {SubTask, Task} = require('../models');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');

//!Create
router.post('/:task', validateSession, async (req, res) => { 
    try{
        const {Job, hoursWorked, mileage} = req.body;

        const {task} = req.params;

        const taskCheck = await Task.find({_id: task})

        if(!taskCheck) throw new Error('Task not available');

        const subTask = new SubTask({
            Job,
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

module.exports = router;