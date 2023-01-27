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
  getForecast(response.data.coord);
}
//Weather forecast

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `btf543c27aa56491e02b95f3b69cob77`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecastDays(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let weeklyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastElement = `<div class="row">`;
  weeklyForecast.forEach(function (day, index) {
    if (index < 7 && index != 0) {
      let iconUrl = day.condition.icon_url;
      let max = Math.round(day.temperature.maximum);
      let min = Math.round(day.temperature.minimum);
      forecastElement =
        forecastElement +
        `
    <div class="col-2">
               <div class="forecast-Date"> ${displayForecastDays(
                 day.time * 1000
               )} </div>
                <img src="${iconUrl}" width="30px">
               <div class="forecast-temperature"><span class="forecast-temperature-max">${max}°</span><span class="forecast-temperature-min">|${min}°</span></div>
              </div>`;
    }
  });
  forecastElement = forecastElement + `</div>`;
  forecast.innerHTML = forecastElement;
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

function displayCelsius(event) {
  event.preventDefault();
  let celciusTemperature = document.querySelector("#temperature");
  celciusTemperature.innerHTML = celcius;
}

let celcius = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", displayCelsius);

search("Bariloche");
