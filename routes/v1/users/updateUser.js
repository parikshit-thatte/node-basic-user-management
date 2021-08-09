const userService = require('../../../services/user')

module.exports = () => {
    return (req, res) => {
        var jwt = require('jsonwebtoken');

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        const user = userService.getUser(decoded.email);

        const requestData = req.body
        const name = requestData.name
        const email = requestData.email
        const mobile = requestData.mobile
        const newFilename = req.file.originalname
        
        if(user){
            userService.updateUser(user.id, name, email, mobile, newFilename);

            res.status(200).json({
                success: true,
                message: "User updated succeccfully!",
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