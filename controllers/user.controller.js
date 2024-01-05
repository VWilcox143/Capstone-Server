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
            firstName: req.body.first, //Too the ternarys out of here
            lastName: req.body.last, 
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,13)
        });

        if(!user.firstName) throw new Error('Please enter your first name'); //Added these errors here
        if(!user.lastName) throw new Error('Please enter your last name')
        
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
router.post('/login', async(req, res) => {
    try {
        //took All the comments out of here, it was distracting. Added "errorhandling methods"
        
        const { email, password } = req.body; 
        
        const user = await User.findOne({email: email});
        
        if(!user) throw new Error('Email or Password does not match');
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if(!passwordMatch) throw new Error('Email or Password does not match');
        
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: 60 * 60 * 24})
        
        const results = {
            message: "Login Successful",
            user, token
        };
        results ?
        successHandling(res, results) :
        incompleteHandling(res)
        
    } catch (err) {
        errorHandling(res, err);
    }
})

//!Update User
router.patch('/:id', validateSession, async (req, res) => {
    try {
    const { id } = req.params;


    const allowedProperties = ['firstName', 'lastName', 'email'];  //Sets an array of properties we named in our user model.


    const filteredInfo = {};
        for (const key in req.body) {
            if (allowedProperties.includes(key)) {
            filteredInfo[key] = req.body[key];                //This filters our user model by the 'allowedProperties' array in order to only allow changes to the things in the array. In other words, 'password' can no longer be changed via patch.
            } else{
            throw new Error(`That change is not authorized.`)
        }
    }



    const updated = await User.findOneAndUpdate({ _id: id }, filteredInfo);

    updated ? successHandling(res, "User updated") : incompleteHandling(res);
    } catch (err) {
    errorHandling(res, err);
    }

});


//! Get All 

router.get('/', async (req, res) =>{
    try {

        const allUsers = await User.find();
        
        // console.log(req.user);
        if(allUsers.length === 0) throw new error

        allUsers.length > 0?
        res.status(200).json({
            result: allUsers,
        }) :
        res.status(404).json({
            result: 'No Users found'
        })
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});

//! Get ONE 
router.get('/find-one/:id', async (req, res) => {
    try {
        
        const { id } = req.params;
        const getUser = await User.findOne({_id: id}); 

        if (!getUser) throw new Error ('no user found');

        res.status(200).json({
            results: getUser
        })
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});


module.exports = router;