require('dotenv').config()

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT
let MONGODB_URI = process.env.DEV_MONGODB_URI

if (ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    PORT,
    MONGODB_URI
}