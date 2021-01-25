const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
    const username = req.body.username
    const displayName = req.body.displayName
    const password = req.body.password

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username: username,
        displayName: displayName,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

userRouter.get('/', async (req, res, next) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter