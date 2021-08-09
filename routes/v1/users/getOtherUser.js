const userService = require('../../../services/user')

module.exports = () => {
    return (req, res) => {
        const id = req.params.id;
        const user = userService.getUserById(id);

        if(user){
            res.status(200).json({
                success: true,
                user: user
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User not found"
            })
        }
    }
}