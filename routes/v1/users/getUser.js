const userService = require('../../../services/user')

module.exports = () => {
    return (req, res) => {
        var jwt = require('jsonwebtoken');

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        const user = userService.getUser(decoded.email);

        res.status(200).json({
            success: true,
            user: user
        })
    }
}