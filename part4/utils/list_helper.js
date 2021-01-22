const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog.likes)
        .reduce((total, blogLikes) => total + blogLikes, 0)
}

module.exports = {
    dummy,
    totalLikes
}