const routes = require('express').Router()
const middleware = require('../../middleware/verifyRequest')

module.exports = () => {
    routes.use('/user', middleware.verifyRequest, require('./users')())
    routes.use('/auth', require('./authentication')())
    return routes
}