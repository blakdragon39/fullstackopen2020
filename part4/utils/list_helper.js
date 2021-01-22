const _ = require('lodash')

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
    const groupedAuthors = _.groupBy(blogs, blog => blog.author)
    const authors = _.toArray(groupedAuthors)
    const largestGroup = _.maxBy(authors, authors => authors.length)

    if (largestGroup && largestGroup.length > 0) {
        return {
            author: largestGroup[0].author,
            blogs: largestGroup.length
        }
    } else {
        return null
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}