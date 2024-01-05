const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expiresIn = {expiresIn: "1 day"};
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
router.post('/login', async(req, res) => {
    try {
        
        //1. Capture data provided by user (req.body)
        const { email, password } = req.body; // this requests the email and password from the body request.
        //2. Check database to see if email supplied email exists
        const user = await User.findOne({email: email}); //* a mongoDB method that accepts a query as an argument. Returns an instance of a document that matches
        // console.log(user);
        if(!user) throw new Error('Email or Password does not match');
        //3. If email exists, consider if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        // true/false value
        //* compare(string, hashed value)
        if(!passwordMatch) throw new Error('Email or Password does not match');
        //4. After verified, provide a jwt(token)
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: 60 * 60 * 24})
        //5. Response status returned.
        res.status (200).json({
            message: "Successful",
            user, token
        })
        
    } catch (err) {
       res.status(500).json({
            ERROR: err.message
       }) 
    }
})


module.exports = router;