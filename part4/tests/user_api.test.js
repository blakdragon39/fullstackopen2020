const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
    {
        'username': 'Test',
        'displayName': 'Test',
        'passwordHash': 'test'
    },
    {
        'username': 'Test2',
        'displayName': 'Test',
        'passwordHash': 'test'
    }
]

beforeEach(async () => {
    await User.deleteMany()

    const user1 = initialUsers[0]
    const user2 = initialUsers[1]

    await user1.save()
    await user2.save()
})

describe('success cases', () => {
    test('login', async () => {
        // const user = {
        //     'username': 'Test2',
        //     'displayName': 'Test 2',
        //     'password': 'password'
        // }
        //
        // await api.post('/api/users')
        //     .send(user)
        //     .expect(200)
    })
})

afterAll(() => mongoose.connection.close())