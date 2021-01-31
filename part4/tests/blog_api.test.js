const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./helpers/blog_test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

let user
let token

let unusedUser
let unusedToken

beforeAll(async (done) => {
    await User.deleteMany()

    const newUserBody = {
        username: 'username',
        displayName: 'displayName',
        password: 'password'
    }

    const createResponse = await api.post('/api/users').send(newUserBody)
    user = createResponse.body

    const loginBody = {
        username: newUserBody.username,
        password: newUserBody.password
    }

    const loginResponse = await api.post('/api/login').send(loginBody)
    token = loginResponse.body.token

    const unusedUserBody = {
        username: 'unusedUser',
        displayName: 'displayName',
        password: 'password2'
    }

    const unusedCreateResponse = await api.post('/api/users').send(unusedUserBody)
    unusedUser = unusedCreateResponse.body

    const unusedLoginBody = {
        username: unusedUserBody.username,
        password: unusedUserBody.password
    }

    const unusedLoginResponse = await api.post('/api/login').send(unusedLoginBody)
    unusedToken = unusedLoginResponse.body.token

    done()
})

beforeEach(async () => {
    await Blog.deleteMany()

    const blog1 = new Blog(testHelper.initialBlogs[0])
    const blog2 = new Blog(testHelper.initialBlogs[1])

    blog1.user = user.id
    blog2.user = user.id

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
    beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}))

    test('missing title fails', async () => {
        const newBlog = {
            author: 'Test Author5',
            url: 'http://url5.com',
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(400)
    })

    test('missing url fails', async () => {
        const newBlog = {
            title: 'Title 6',
            author: 'Test Author6'
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(400)
    })
})

describe('auth failure states', () => {
    test('post with no auth', async () => {
        await api.post('/api/blogs')
            .send({ title: 'title', author: 'author'})
            .expect(401)
    })

    test('post with wrong auth', async () => {
        await api.post('/api/blogs')
            .send({ title: 'title', author: 'author'})
            .set({ Authorization: 'somethingwrong' })
            .expect(401)
    })

    test('delete with no auth', async() => {
        const blogs = await testHelper.getDbBlogs()
        await api.delete(`/api/blogs/${blogs[0].id}`)
            .expect(401)
    })

    test('delete with wrong auth', async() => {
        const blogs = await testHelper.getDbBlogs()
        await api.delete(`/api/blogs/${blogs[0].id}`)
            .set({ Authorization: unusedToken })
            .expect(401)
    })

    test('put with no auth', async() => {
        const blogs = await testHelper.getDbBlogs()
        const body = { likes: 55 }
        await api.put(`/api/blogs/${blogs[0].id}`)
            .send(body)
            .expect(401)
    })

    test('put with wrong auth', async() => {
        const blogs = await testHelper.getDbBlogs()
        const body = { likes: 55 }
        await api.put(`/api/blogs/${blogs[0].id}`)
            .send(body)
            .set({ Authorization: unusedToken })
            .expect(401)
    })
})

describe('change blogs', () => {
    test('missing likes default to 0', async () => {
        const newBlog = {
            title: 'Test Title 4',
            author: 'Test Author4',
            url: 'http://url4.com'
        }

        const postResponse = await api.post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
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

        const postResponse = await api.post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
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

        await api.delete(`/api/blogs/${blogs[0].id}`)
            .set({ Authorization: token })
            .expect(204)

        blogs = await testHelper.getDbBlogs()
        expect(blogs).toHaveLength(testHelper.initialBlogs.length - 1)
    })

    test('update blog', async () => {
        let blogs = await testHelper.getDbBlogs()

        const newBlog = {
            likes: 989
        }

        const putResponse = await api.put(`/api/blogs/${blogs[0].id}`)
            .send(newBlog)
            .set({ Authorization: token })
        expect(putResponse.statusCode).toBe(200)
        expect(putResponse.body.likes).toBe(newBlog.likes)

        blogs = await testHelper.getDbBlogs()

        expect(blogs).toHaveLength(testHelper.initialBlogs.length)
        expect(blogs[0].likes).toBe(newBlog.likes)
    })
})

afterAll(() => mongoose.connection.close())
