const express = require('express')
const router = express.Router()
const TweetController = require('../controllers/tweetController')
const Auth = require('../middlewares/auth')

router.use(Auth.authentication)
router.post('/', TweetController.create)
router.delete('/:id', Auth.authorization, TweetController.delete)

module.exports = router;
