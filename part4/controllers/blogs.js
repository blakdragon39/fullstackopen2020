const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
    res.status(200).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = blogRouter