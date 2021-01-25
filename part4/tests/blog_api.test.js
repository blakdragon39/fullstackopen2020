const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./blog_test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany()

    const blog1 = new Blog(testHelper.initialBlogs[0])
    const blog2 = new Blog(testHelper.initialBlogs[1])

    await blog1.save()
    await blog2.save()
})

describe('initial blogs', () => {
    test('blogs returns json', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('two blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
    })

    test('blog has ids correct', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        expect(blogs[0].id).toBeDefined()
    })
})

describe('failure states', () => {
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
})

describe('change blogs', () => {
    test('missing likes default to 0', async () => {
        const newBlog = {
            title: 'Test Title 4',
            author: 'Test Author4',
            url: 'http://url4.com'
        }

        const postResponse = await api.post('/api/blogs').send(newBlog)
        const postedBlog = postResponse.body
        expect(postedBlog.likes).toBe(0)
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

        const dbBlogs = await testHelper.getDbBlogs()
        expect(dbBlogs).toHaveLength(testHelper.initialBlogs.length + 1)
    })

    test('delete blog', async () => {
        let blogs = await testHelper.getDbBlogs()

        const deleteResponse = await api.delete(`/api/blogs/${blogs[0].id}`)
        expect(deleteResponse.statusCode).toBe(204)

        blogs = await testHelper.getDbBlogs()
        expect(blogs).toHaveLength(1)
    })

    test('update blog', async () => {
        let blogs = await testHelper.getDbBlogs()

        const newBlog = {
            likes: 989
        }

        const putResponse = await api.put(`/api/blogs/${blogs[0].id}`).send(newBlog)
        expect(putResponse.statusCode).toBe(200)
        expect(putResponse.body.likes).toBe(newBlog.likes)

        blogs = await testHelper.getDbBlogs()

        expect(blogs).toHaveLength(testHelper.initialBlogs.length)
        expect(blogs[0].likes).toBe(newBlog.likes)
    })
})

afterAll(() => mongoose.connection.close())