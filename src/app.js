function getTemperature(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiKey = "53534e195e419f621c24a11bb65c4126";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  celcius = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = celcius;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let Skydescription = document.querySelector("#description");
  Skydescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconId = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];

  return ` ${day}, ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "53534e195e419f621c24a11bb65c4126";
  let apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  axios.get(apiURL).then(getTemperature);
}

// Search New City //

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//unit conversion

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#temperature");
  let Fahrenheit = celcius * 1.8 + 32;
  fahrenheitTemperature.innerHTML = Math.round(Fahrenheit);
}

let celcius = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

search("Bariloche");
