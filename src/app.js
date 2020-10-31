const path = require('path');
const express = require('express'); //express is a function
const hbs = require('hbs');
const axios = require('axios');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Jing En"
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About me",
    name: "Jing En"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "help",
    msg: "Call me at 1234135567",
    name: 'Jing En'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address term'
    })
  }

  const place = req.query.address;

  geocode(place, (error, {
    latitude,
    longitude,
    place_name
  } = {}) => {
    if (error) {
      return res.send({
        error: 'Geocode API failed to read.'
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'Forecast API failed to read.'
        })
      }
      res.send({
        forecastData,
        place_name,
        address: place
      })

    })

  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})


//app.com
//app.com/help
//app.com/about domain/route
app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error 404',
    msg: "Help article not found.",
    name: 'Jing En'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error 404',
    msg: "Page not found.",
    name: 'Jing En'
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
})