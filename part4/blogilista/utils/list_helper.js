const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => blogs.sort((a, b) => b.likes - a.likes)[0]


const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const authorWithMostBlogs = Object.entries(authors)
    .reduce(
      (acc, [author, blogs]) =>
        blogs > acc.blogs ? { author, blogs } : acc,
      { author: '', blogs: 0 }
    )
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const authorWithMostLikes = Object.entries(authors)
    .reduce(
      (acc, [author, likes]) =>
        blogs > acc.likes ? { author, likes } : acc,
      { author: '', likes: 0 }
    )
  return authorWithMostLikes
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
