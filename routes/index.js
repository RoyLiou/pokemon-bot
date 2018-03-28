var express = require('express')
var router = express.Router()

var weather = require('../controllers/weather')

router.use(weather)

module.exports = router
