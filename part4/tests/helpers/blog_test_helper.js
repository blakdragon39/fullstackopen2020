const Blog = require('../../models/blog')

const initialBlogs = [
    {
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://url.com',
        likes: 5
    },
    {
        title: 'Test Title 2',
        author: 'Test Author2',
        url: 'http://url2.com',
        likes: 3
    }
]

const getDbBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    getDbBlogs
}