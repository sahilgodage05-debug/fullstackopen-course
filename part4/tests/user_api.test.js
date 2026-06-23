const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const testUser = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash: 'secret_hash'
    })

    await testUser.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'sahil',
      name: 'Sahil Godage',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert.ok(usernames.includes(newUser.username))
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Duplicate Root',
      password: 'mypassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.ok(result.body.error.includes('unique'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if username is less than 3 characters long', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'ro',
      name: 'Short Username',
      password: 'mypassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.ok(result.body.error.includes('username must be at least 3 characters long'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password is less than 3 characters long', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'user1',
      name: 'Short Password',
      password: 'pw'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.ok(result.body.error.includes('password must be at least 3 characters long'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
