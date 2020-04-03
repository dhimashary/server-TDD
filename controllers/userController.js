const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const createError = require('http-errors')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body

    User.create({
      email,
      password
    })
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then(result => {
        if (result && bcryptjs.compareSync(password, result.password)) {
          res.status(200).json({
            access_token: jwt.sign({ id: result.id }, "kucing")
          })
        } else {
          throw createError(400, "Invalid Email/Password")
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController