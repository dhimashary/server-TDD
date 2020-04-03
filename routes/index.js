const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const tweetRoutes = require('./tweet')

router.use('/', userRoutes)
router.use('/tweets', tweetRoutes)

module.exports = router
