//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const axios = require('axios');


const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current";

  axios.get(url, {
    params: {
      access_key: 'def53bfa6acc2959c147b69d03d6a668',
      query: `${latitude},${longitude}`,
    }

  }).then((response) => {

    if (response.data.success !== false) {
      const data = response.data.current;
      const {
        weather_descriptions,
        temperature,
        feelslike
      } = data;
      const msg = `${weather_descriptions}. It is currently ${temperature} degrees celcius but it feels like ${feelslike} degrees celcius.`;
      callback(undefined, msg);
    } else {
      callback(`${response.data.error.info}`, undefined);

    }

  }).catch((e) => {
    callback(e, undefined);
  });
}



module.exports = forecast;