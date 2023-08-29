const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('when there is initially some blogs saved', () => {

  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    // console.log('res.body', res.body)

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const res = await api.get('/api/blogs')

    const title = res.body.map(r => r.title)
    expect(title).toContain(
      'Go To Statement Considered Harmful'
    )
  })
})

describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // console.log('resultBlog', resultBlog.body)
    // console.log('blogToView', blogToView)

    expect(resultBlog.body).toEqual(blogToView)

  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    // console.log('validNonexistingId', validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })
  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('blogs have an id', async () => {
    const blogs = await helper.blogsInDb()
    const firstblog = blogs[0]
    console.log('firstblog', firstblog)
    expect(firstblog.id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      user: '64dcc235eddcedf1b01e7f16'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'React patterns'
    )
  })

  test('fails with statuscode 400 if data invalid', async () => {
    const newBlog = {
      title: 'invalid blog'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('has 0 likes if not defined', async () => {

    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      user: '64dcc235eddcedf1b01e7f16'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.filter(blog => blog.title === 'title').likes).toBe(0)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const token = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('put requests', () => {
  test('update specified blog', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    const updatedBlog = { ...firstBlog, title: 'test' }

    // console.log('firstBlog', firstBlog.id)
    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(updatedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    // console.log(blogsAfter)
    expect(blogsAfter[0].title).toBe('test')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
