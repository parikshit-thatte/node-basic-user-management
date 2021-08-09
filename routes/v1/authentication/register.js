const userService = require('../../../services/user')

module.exports = () => {
    return (req, res) => {
        const requestData = req.body

        const name = requestData.name
        const email = requestData.email
        const mobile = requestData.mobile
        const password = requestData.password
        const filename = req.file.originalname

        const hashedPassword = userService.generateHashedPassword(password);

        const id = userService.insertNewUser(name, email, mobile, hashedPassword, filename);

        res.status(200).json({
            success: true,
            message: "New user created with name : " + name + " & id : " + id,
            profilePicture: req.file.originalname
        })
    }
}