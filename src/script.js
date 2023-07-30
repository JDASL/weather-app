function getPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longtitude = position.coords.longitude;

  let apiKey = "4dd081d0ef549a9a1d5072307af5a45c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let getCurrentLocButton = document.querySelector("#current-loc-button");
getCurrentLocButton.addEventListener("click", getCurrentLoc);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "4dd081d0ef549a9a1d5072307af5a45c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let showTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temperature");
  displayTemp.innerHTML = response.data.main.temp;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let h4 = document.querySelector("h4");
  h4.innerHTML = response.data.weather[0].main;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day}`;

let h3 = document.querySelector("h3");
h3.innerHTML = `${hours}:${minutes}`;
