const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username: username})
    const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false

    if (!passwordCorrect) {
        return res.status(401).json({ error: 'Invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, id: user._id, username: user.username, displayName: user.displayName})
})

module.exports = loginRouter
