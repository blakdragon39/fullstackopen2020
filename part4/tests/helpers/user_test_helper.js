const User = require('../../models/user')

const initialUsers = [
    {
        username: 'Test',
        displayName: 'Test',
        passwordHash: 'test'
    },
    {
        username: 'Test2',
        displayName: 'Test',
        passwordHash: 'test'
    }
]

const getDbUsers = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers,
    getDbUsers
}