const config = require('config')
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    config: config.get('frontend')
  })
})

module.exports = router
