const userService = require('../services/user')

const verifyRequest = (req, res, next) => {
    var jwt = require('jsonwebtoken');

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];

        try {
            const decoded = jwt.verify(token, 'secret');
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Invalid auth token!"
            })
        }
        
        next();

    } else {
        res.status(400).json({
            success: false,
            message: "Authorization token is missing!"
        })
    }
}

module.exports = {
    verifyRequest
}