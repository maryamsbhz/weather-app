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
  document.querySelector("#icon").setAttribute("src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  temperatureElement = response.data.main.temp;
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

function convertToFahrenheit(event){
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahrenheitTemp = (temperatureElement * 9 / 5) + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
  celciusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}

function convertToCelcius(event){
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round( temperatureElement);
  celciusElement.classList.add("active");
  fahrenheitElement.classList.remove("active")
}


let temperatureElement = null;

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click",convertToFahrenheit);

let celciusElement = document.querySelector("#celcius-link");
celciusElement.addEventListener("click",convertToCelcius);

let form = document.querySelector("#search-city");
form.addEventListener("submit",manageSubmit);



searchCity("Tehran");