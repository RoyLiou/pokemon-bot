const express = require('express')
const router = express.Router()

const callWeatherApi = require('../helper/apiWeather')

router.route('/weather')
  .post(function (req, res) {
    const response = "This is a sample response from your webhook!"
    // console.log(req.body.result)
    const location = req.body.result.parameters['location']
    const datetime = req.body.result.parameters['datetime']
    // const location = req.body.location
    // const datetime = req.body.datetime

    res.setHeader('Content-Type', 'application/json')
    callWeatherApi(location, datetime)
    .then(function (result) {
      res.send(JSON.stringify({
        "speech": result, "displayText": result
        //"speech" is the spoken version of the response, "displayText" is the visual version
      }))
    })
  })

module.exports = router