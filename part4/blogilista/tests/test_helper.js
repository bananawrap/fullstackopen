const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const initialBlogs = [
  {
    _id: '64dcc4b12dacfcf3eb1f27b6',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    userId: '64dcc235eddcedf1b01e7f16',
    __v: 0,
  },
  {
    _id: '64dcc4b12dacfcf3eb1f27b7',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    userId: '64dcc235eddcedf1b01e7f16',
    __v: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'no one', url: 'google.com/' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
