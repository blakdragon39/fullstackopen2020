const blogRouter = require('express').Router()

const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, displayName: 1 })
    res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
    const user =  req.user

    if (!user) {
        res.status(401).json({ error: 'Invalid user'})
        return
    }

    const blog = new Blog(req.body)
    blog.user = user

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog)
})

blogRouter.delete('/:id', async (req, res, next) => {
    const user = req.user

    if (!user) {
        return res.status(401).json({ error: 'Invalid user'})
    }

    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() !== user.id) {
        return res.status(401).json({ error: 'Delete unauthorized' })
    }

    res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next) => {
    const blog = {
        likes: req.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)
})

module.exports = blogRouter