const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
    const username = req.body.username
    const displayName = req.body.displayName
    const password = req.body.password

    if (password.length < 3) {
        res.status(400).json({ error: 'Password must be at least 3 characters long'})
        return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username: username,
        displayName: displayName,
        passwordHash: passwordHash
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(400).json({ error: 'Username already exists' })
        } else {
            throw err
        }
    }
})

userRouter.get('/', async (req, res, next) => {
    const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, likes: 1 })
    res.json(users)
})

module.exports = userRouter