const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

beforeEach(async () => {
    await Blog.deleteMany()

    const blog1 = new Blog(initialBlogs[0])
    const blog2 = new Blog(initialBlogs[1])

    await blog1.save()
    await blog2.save()
})

test('blogs returns json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog has id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
})

test('add blog', async () => {
    const newBlog = {
        title: 'Test Title 3',
        author: 'Test Author3',
        url: 'http://url3.com',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

// test('empty blog not added', async () => {
//     const newBlog = {}
//
//     await api.post('/api/blogs')
//         .send(newBlog)
//         .expect(400)
//
//     const response = await api.get('/api/blogs')
//     const blogs = response.body.map(response => response.content)
//     expect(blogs).toHaveLength(initialBlogs.length)
// })

afterAll(() => mongoose.connection.close())