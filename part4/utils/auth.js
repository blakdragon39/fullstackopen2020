const jwt = require('jsonwebtoken')

const User = require('../models/user')

const getUserFrom = request => {
    const token = request.get('authorization')
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        throw new TokenError()
    }

    return User.findById(decodedToken.id)
}

class TokenError extends Error {
    constructor() {
        super('Token missing or invalid')
        name = 'TokenError'
    }
}

module.exports = getUserFrom