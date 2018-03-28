const http = require('http')

const weatherAppId = 'e2be97c03f0ad76f6c313c3fe89c1d20';
const weatherHost = 'http://api.openweathermap.org';

function callWeatherApi(city, date) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    let body = ''
    let fullPath = weatherHost + apiPath(city, date, '') + '&appid=' + weatherAppId;
    // Make the HTTP request to get the weather
    http.get(fullPath, (res) => {
      let body = ''; // var to store the response chunks
      
      res.on('data', (d) => {
        body = body + d
      }); // store each response chunk
      
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        let main = response['main'];
        let weather = response['weather'][0];
        let wind = response['wind'];

        // Create response
        let output = `${date} ${city} 天氣如下 | 天氣狀況: ${weather['description']} | 溫度: ${parseInt(main['temp'] - 273.15).toFixed(2)}°C | 濕度: ${main['humidity']}% | 風速狗: ${wind['speed']} meter/sec`;
        // Resolve the promise with the output text
        resolve(output);
      });
      res.on('error', (error) => {
        reject(error);
      });
    });
  });
}

function apiPath(cityName, datetime, countryCode) {
  let apiStr = ''
  
  switch (datetime) {
    case '明天':
    case '後天':
      apiStr = 'forecast'
      break;
    case '今天':
    case '現在':
    default:
      apiStr = 'weather'
  }
  
  return `/data/2.5/${apiStr}?q=${cityName},tw`;
}

module.exports = callWeatherApi