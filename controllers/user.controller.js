const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expiresIn = {expiresIn: "1 day"};
const SECRET = process.env.JWT;
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const validateSession = require('../middleware/validateSession');

//! User Signup
router.post('/signup', async(req, res) => {
    try {
        const user = new User({
            firstName: req.body.first ? req.body.first : 'Please enter your first name.',
            lastName: req.body.last ? req.body.last : 'Please enter your first name', 
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,13)
        });

        const newUser = await user.save();

        const token = jwt.sign({id: newUser._id}, SECRET, expiresIn);

        const results = {
            user: newUser,
            message: `${newUser.firstName} ${newUser.lastName} has been registered.`,
            token
        }

        newUser ? 
            successHandling(res, results) :
            incompleteHandling(res);


    } catch (err) {
        errorHandling(res, err);
    }
});
//!User Login


//!Update User


module.exports = router;