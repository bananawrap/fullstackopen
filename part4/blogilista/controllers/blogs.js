const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id).populate('user', { username: 1, name: 1 })
  // console.log('found blog', blog)
  response.status(200).json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title and/or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id
  })
  // console.log('blog', blog)

  const savedBlog = await blog.save()
  // console.log('savedBlog', savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  // console.log('request body', request.body)
  const body = new Blog(request.body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
    _id: id
  })
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
