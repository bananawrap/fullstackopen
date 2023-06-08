const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => {
        return sum + item.likes
    },0)
}

const favoriteBlog = (blogs) => {
    blogs.join()
    return blogs.sort((a, b) => b.likes - a.likes)[0]
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}