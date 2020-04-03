const { Tweet } = require('../models')

class TweetController {
  static create(req, res, next) {
    const content = req.body.content
    Tweet.create({
      content,
      UserId: req.loggedInUser.id
    })
      .then(tweet => {
        res.status(201).json(tweet)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Tweet.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TweetController