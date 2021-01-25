const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./helpers/user_test_helper')

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany()

    const user1 = new User(testHelper.initialUsers[0])
    const user2 = new User(testHelper.initialUsers[1])

    await user1.save()
    await user2.save()
})

test('create user', async () => {
    const user = {
        'username': 'WhatsGoingOn',
        'displayName': 'Test 3',
        'password': 'password'
    }

    await api.post('/api/users')
        .send(user)
        .expect(200)

    const users = await testHelper.getDbUsers()
    expect(users).toHaveLength(testHelper.initialUsers.length + 1)
})

test('password too short', async () => {
    const user = {
        'username': 'SomethingElse',
        'displayName': 'Test 3',
        'password': '12'
    }

    await api.post('/api/users')
        .send(user)
        .expect(400)

    const users = await testHelper.getDbUsers()
    expect(users).toHaveLength(testHelper.initialUsers.length)
})

test('duplicate user name', async () => {

    const user = {
        'username': 'Test',
        'displayName': 'Test 3',
        'password': 'password'
    }

    await api.post('/api/users')
        .send(user)
        .expect(400)

    const users = await testHelper.getDbUsers()
    expect(users).toHaveLength(testHelper.initialUsers.length)
})

afterAll(() => mongoose.connection.close())