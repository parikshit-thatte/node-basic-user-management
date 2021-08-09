const userService = require('../../../services/user')

module.exports = () => {
    return (req, res) => {
        const requestData = req.body

        const email = requestData.email
        const password = requestData.password
        const user = userService.getUser(email);

        if(user){
            const bcrypt = require('bcrypt');
            if(bcrypt.compareSync(password, user.password)){
                var jwt = require('jsonwebtoken');
                var token = jwt.sign({ email: user.email }, 'secret');

                res.status(200).json({
                    success: true,
                    message: "Logged in successfully!",
                    token: token
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: "Wrong username or password"
                })
            }
            
        } else {
            res.status(200).json({
                success: false,
                message: "User does not exist!"
            })
        }
    }
}