function getTemperature(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiKey = "53534e195e419f621c24a11bb65c4126";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  console.log(response.data);
  let Temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = Temperature;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let Skydescription = document.querySelector("#description");
  Skydescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}

let apiKey = "53534e195e419f621c24a11bb65c4126";
let city = "Bariloche";
let apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

axios.get(apiURL).then(getTemperature);
