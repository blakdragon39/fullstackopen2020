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
        likes: 3
    }

    const postResponse = await api.post('/api/blogs').send(newBlog)
    const postedBlog = postResponse.body

    expect(postResponse.statusCode).toBe(200)
    expect(postedBlog.title === newBlog.title)
    expect(postedBlog.author === newBlog.author)
    expect(postedBlog.url === newBlog.url)
    expect(postedBlog.likes === newBlog.likes)

    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body).toHaveLength(initialBlogs.length + 1)
})

test('missing likes default to 0', async () => {
    const newBlog = {
        title: 'Test Title 4',
        author: 'Test Author4',
        url: 'http://url4.com',
    }

    const postResponse = await api.post('/api/blogs').send(newBlog)
    const postedBlog = postResponse.body
    expect(postedBlog.likes).toBe(0)
})

test('missing title fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    const newBlog = {
        author: 'Test Author5',
        url: 'http://url5.com',
    }
    const postResponse = await api.post('/api/blogs').send(newBlog)
    expect(postResponse.statusCode).toBe(400)
})

test('missing url fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    const newBlog = {
        title: 'Title 6',
        author: 'Test Author6'
    }
    const postResponse = await api.post('/api/blogs').send(newBlog)
    expect(postResponse.statusCode).toBe(400)
})

afterAll(() => mongoose.connection.close())