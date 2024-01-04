const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expiresIn = {expiresIN: "1 day"};
const SECRET = process.env.JWT;

//! User Signup
router.post('/signup', async(req, res) => {
    try {
        const user = new User({
            firstName: req.body.first ? req.body.first : 'Please enter your first name.',
            lastName: req.body.last ? req.body.last : 'Please enter your last name',
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,13)
        });

        const newUser = await user.save();

        const token = jwt.sign({id: newUser._id}, SECRET, expiresIn)

        res.status(200).json({
            user: newUser,
            message: `${newUser.firstName} ${newUser.lastName} has been registered.`,
            token
        });


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});
//!User Login



module.exports = router;