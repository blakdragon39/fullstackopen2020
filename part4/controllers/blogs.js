const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(200).json(savedBlog)
})

module.exports = blogRouter