const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { errorHandling } = require('../helpers');

const validateSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization; 

        const decoded = await jwt.verify(token, process.env.JWT);

        const user = await User.findById(decoded.id);

        if(!user) throw new Error(`User not found`);

        req.user = user;

        return next()
    } catch (err) {
        errorHandling(res, err);
    }
}

module.exports = validateSession;