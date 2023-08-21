const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get requests', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('have correct amount of blogs', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('have correct identification', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    expect(blog._id).toBeDefined()
  })
})

describe('post requests', () => {
  test('work with a valid blog', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)

    expect(titles).toContain(
      'React patterns'
    )
  })
})

describe('delete requests', () => {
  test('delete the specified blog', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlogId = blogs[0]._id

    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter).toHaveLength(blogs.length - 1)
  })
})

describe('put requests', () => {
  test('update specified blog', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    const updatedBlog = {...firstBlog, title: 'test'}

    await api
      .put(`/api/blogs/${firstBlog._id}`)
      .send(updatedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb() 
    console.log(blogsAfter)
    expect(blogsAfter[0].title).toBe('test')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
