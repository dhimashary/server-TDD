const { Tweet } = require('../models')

class TweetController {
  static create(req, res, next) {
    const content = req.body.content
    Tweet.create({
      content,
      UserId: req.loggedInUser.id
    })
      .then(tweet => {
        res.status(201).json({
          id: tweet.id,
          UserId: tweet.UserId,
          content: tweet.content
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    console.log('delete', req.params)
    Tweet.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1) {
          res.status(200).json({
            message: 'Success delete a tweet'
          })
        } else {
          throw createError(500, "Internal server error")
        }
      })
      .catch(next)
  }
}

module.exports = TweetController