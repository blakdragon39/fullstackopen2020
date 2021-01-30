const jwt = require('jsonwebtoken')

const User = require('../models/user')

const getUserFrom = request => {
    const token = request.get('authorization')

    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        return User.findById(decodedToken.id)
    } else {
        return null
    }
}

module.exports = getUserFrom