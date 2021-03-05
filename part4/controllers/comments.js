const commentsRouter = require('express').Router()

const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.post('/:id/comments', async (req, res, next) => {
    const user = req.user
    const blog = await Blog.findById(req.params.id)

    if (!user) {
        res.status(401).json({ error: 'Invalid user'})
        return
    }

    if (!blog) {
        res.status(401).json({ error: 'Blog not found'})
    }

    const comment = new Comment(req.body)
    comment.blog = blog
    comment.user = user

    const savedComment = await comment.save()

    res.json(savedComment)
})

module.exports = commentsRouter
