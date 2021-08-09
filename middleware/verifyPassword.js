const userService = require('../services/user')

const verifyPassword = (req, res, next) => {
    const requestData = req.body
    const currentPassword = requestData.currentPassword

    var jwt = require('jsonwebtoken');

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secret');
    const user = userService.getUser(decoded.email);

    const bcrypt = require('bcrypt');
    
    if(bcrypt.compareSync(currentPassword, user.password)){
        next();
    } else {
        res.status(200).json({
            success: false,
            message: "Wrong password!"
        })
    }
}

module.exports = {
    verifyPassword
}