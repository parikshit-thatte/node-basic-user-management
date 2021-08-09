const routes = require('express').Router()

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
    routes.post('/register', upload.single('profilePicture'), require('./register')())
    routes.post('/login', require('./login')())
    return routes
}