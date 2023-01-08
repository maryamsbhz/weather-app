//Feature 1
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let minutes = now.getMinutes();
let hours = now.getHours();

function showDate() {
  let date = document.querySelector("h6");
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  date.innerHTML = `${day} ${hours}:${minutes}`;
}
showDate();


//Show current location and temperature

function weather(response){
  document.querySelector("#special-city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  
}

function searchCity(city){
  let apiKey="5f472b7acba333cd8a035ea85a0d4d4c";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}


function manageSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function findLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weather);
}


function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}


let form = document.querySelector("#search-city");
form.addEventListener("submit",manageSubmit);


let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click",currentLocation);


searchCity("Tehran");