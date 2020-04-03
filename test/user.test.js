const app  = require('../app.js')
const { User, sequelize } = require('../models')
const request = require('supertest')
const { queryInterface } = sequelize

describe('User Routes Test', () => {
  const userData = {
    email: 'd@mail.com',
    password: 'qweqwe'
  }

  const userData2 = {
    email: 's@mail.com',
    password: 'qweqwe'
  }

  describe('POST /register - create new user', () => {

    beforeAll(done => {
      User.create(userData2)
        .then(_ => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    afterAll(done => {
      queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch(err => done(err));
    });

    test('201 Success register - should create new User', (done) => {
      request(app)
        .post('/register')
        .send(userData)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('email', userData.email)
          done()
        })
    })

    test('400 Failed register - should return error if email is null', (done) => {
      request(app)
        .post('/register')
        .send({
          password: 'qweqwe'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email cannot be empty')
          done()
        })
    })

    test('400 Failed register - should return error if email is empty string', (done) => {
      request(app)
        .post('/register')
        .send({
          email: '',
          password: 'qweqwe'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Invalid email format')
          done()
        })
    })

    test('400 Failed register - should return error if password is empty', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'd@mail.com'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Password cannot be empty')
          done()
        })
    })

    test('400 Failed register - should return error if email is already used', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 's@mail.com',
          password: 'qweqwes'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 's@mail.com already exists')
          done()
        })
    })

    test('400 Failed register - should return error if email have invalid format', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'samail.com',
          password: 'qweqwe'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Invalid email format')
          done()
        })
    })

  })

  describe('POST /login - user authentication process', () => {
    beforeAll(done => {
      User.create(userData)
        .then(_ => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    afterAll(done => {
      queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch(err => done(err))
    })

    test('200 Success login - should return access_token', (done) => {
      request(app)
        .post('/login')
        .send(userData)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        })
    })

    test('400 Failed login - should return access_token', (done) => {
      request(app)
        .post('/login')
        .send({
          email: 'd@mailssss.com',
          password: 'qweqwe'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Invalid Email/Password')
          done()
        })
    })
  })

})
