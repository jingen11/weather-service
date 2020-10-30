const axios = require('axios');


const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`;

  axios.get(geoUrl, {
    params: {
      access_token: "pk.eyJ1IjoiamluZ2VuMTEiLCJhIjoiY2tna3ViZ2RhMjhhaDJ4cGRkMnhqaDhwMCJ9.NXOKEA8YYAo1D0FsS8H7GA",
      limit: "1"
    }
  }).then((response) => {
    if (response.data.features.length !== 0) {
      const data = response.data.features[0];

      const {
        place_name,
        center: Latlong
      } = data;

      const msg = `${place_name} is located at ${Latlong}`;
      callback(undefined, {
        place_name: place_name,
        latitude: Latlong[1],
        longitude: Latlong[0]
      });
    } else {
      callback("Invalid input", undefined);
    };
  }).catch((e) => {
    callback(
      "Unable to connect to location services!", undefined);
  });
}



module.exports = geocode;