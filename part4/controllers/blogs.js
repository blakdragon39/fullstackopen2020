const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
    res.json(savedBlog)
})

blogRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndRemove(req.params.id)
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