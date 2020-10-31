const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const error = document.querySelector('.error');
const result = document.querySelector(".result");

result.innerHTML = "Waiting for location submition"

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.innerHTML = data.error;
        result.innerHTML = "";
      } else {
        error.innerHTML = "";
        result.innerHTML = `${data.place_name} ---- Weather Forecast: ${data.forecastData}`;

      }
    })
  })


  console.log(location);
})