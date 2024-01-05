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