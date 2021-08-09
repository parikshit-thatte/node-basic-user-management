const userService = require('../../../services/user')

module.exports = () => {
    return (req, res) => {
        var jwt = require('jsonwebtoken');

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        const user = userService.getUser(decoded.email);

        const requestData = req.body
        const newPassword = requestData.newPassword
        
        if(user){
            userService.changePassword(user.id, newPassword);

            res.status(200).json({
                success: true,
                message: "Password updated succeccfully!",
                user: userService.getUserById(user.id)
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }



    }
}