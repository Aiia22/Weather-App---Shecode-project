//date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayArray[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#currentDate");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

//Units
function convertUnitC(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "17";
}
let unitC = document.querySelector("#celcius");
unitC.addEventListener("click", convertUnitC);

function convertUnitF(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "63";
}
let unitF = document.querySelector("#fahr");
unitF.addEventListener("click", convertUnitF);

//current temperature by city name

function ShowCityCurrentTemp(response) {
  console.log(response);
  let city = document.querySelector("#searchBar");
  let h1 = document.querySelector("#currentCity");
  if (city.value) {
    h1.innerHTML = response.data.name + ", ";
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#currentTemp");
    temperatureElement.innerHTML = `${temperature}`;
    let humidity = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#currentHumidity");
    humidityElement.innerHTML = `${humidity}`;
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#currentWind");
    windElement.innerHTML = `${wind}`;
    let feel = Math.round(response.data.main.feels_like);
    let feelElement = document.querySelector("#currentFeels");
    feelElement.innerHTML = `${feel}`;
  } else if (city.value.length === 0) {
    alert("Please enter a city");
  }
}

function searchCity() {
  event.preventDefault();
  let apiOpenWeatherKey = "2a64b8c658dc2d165dbcbfd51a3372f7";
  let lookUpCity = document.querySelector("#searchBar").value;
  let apiOpenWeatherCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${lookUpCity}&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherCityUrl).then(ShowCityCurrentTemp);
}

let form = document.querySelector("#search-form ");
form.addEventListener("submit", searchCity);

//current temperature by geolocation

function showWeather(response) {
  event.preventDefault();
  console.log(response);
  console.log("kjuhyghyjuhyghjuhyg" + response.data.main.temp);
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = response.data.name + ", ";
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${temperature}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#currentHumidity");
  humidityElement.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#currentWind");
  windElement.innerHTML = `${wind}`;
  let feel = Math.round(response.data.main.feels_like);
  let feelElement = document.querySelector("#currentFeels");
  feelElement.innerHTML = `${feel}`;
}

function retrievePosition(position) {
  console.log(position);
  let apiOpenWeatherKey = "2a64b8c658dc2d165dbcbfd51a3372f7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiOpenWeatherGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherGeoUrl).then(showWeather);
}

function currentGeolocation(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", currentGeolocation);
