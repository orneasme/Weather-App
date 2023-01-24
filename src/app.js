function getTemperature(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiKey = "53534e195e419f621c24a11bb65c4126";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let Temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = Temperature;
}

let apiKey = "53534e195e419f621c24a11bb65c4126";
let city = "Paris";
let apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

axios.get(apiURL).then(getTemperature);
