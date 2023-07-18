const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'User Name',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.blogsInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const username = usersAtEnd.map(u => u.username)
    expect(username).toContain(newUser.username)
  })
})
