const routes = require('express').Router()
const middleware = require('../../../middleware/verifyPassword')

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/profilePictures')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = () => {
    routes.get('/', require('./getUser')());
    routes.get('/:id', require('./getOtherUser')());
    routes.put('/update', upload.single('profilePicture'), require('./updateUser')());
    routes.put('/changepassword', middleware.verifyPassword, require('./changePassword')());

    return routes
}