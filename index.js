const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const routes = require('./routes/index')

express()
  .use(bodyParser.json({ limit: '4mb' }))
  .use(bodyParser.urlencoded({ limit: '4mb', extended: true }))
  .use('/', routes)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
