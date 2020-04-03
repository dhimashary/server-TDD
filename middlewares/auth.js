const { User, Tweet } = require('../models')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

class Auth {
  static authentication (req, res, next){

    try { 
      req.loggedInUser = jwt.verify(req.headers.access_token, 'kucing')
      console.log(req.loggedInUser)
      User.findByPk(req.loggedInUser.id)
        .then(result => {
          if(!result) { throw createError(404, "User not found!")}
          next()
          return null
          
        })
        .catch(err => {
          next(err)
        })
    }
    catch (err){
      next(err)
    }

  }
  static authorization (req, res, next){
    let tweetId = req.params.id

    Tweet.findByPk(tweetId)
      .then(result => {
        if (!result) throw createError(404, "Tweet not found")
        if(result.UserId == req.loggedInUser.id){
          next()
        }
        else { 
          throw createError(401, "You are not authorized")
        }
      })
      .catch(next)
  }
}

module.exports = Auth