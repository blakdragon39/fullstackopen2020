const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog.likes)
        .reduce((total, blogLikes) => total + blogLikes, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs && blogs.length != 0) {
        return blogs.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)
    } else {
        return null
    }
}

const mostBlogs = (blogs) => {
    return lodash
        .groupBy(blogs, blog => blog.author)
        // .maxBy(authors => authors.length)
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}