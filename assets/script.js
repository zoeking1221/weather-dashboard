// global variables
var cityEl = document.querySelector("#city");
var temperatureCurrEl = document.querySelector("#current-temperature");
var humidityCurrEl = document.querySelector("#current-humidity");
var windCurrEl = document.querySelector("#current-wind");
var uvCurrEl = document.querySelector("#current-uv");

// fetch call to weather api

var userCity = function() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&appid=dfda35368bbd4b6f36f9ed7f2ede83c5")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
       displayCurrent(data);
    });
};

var displayCurrent = function(data) {
    var temp = data.main.temp_min;
    var humidity = data.main.humidity;
    var wind = data.wind.speed;
    temperatureCurrEl.textContent = "Temperature: " + temp + " °F"
    humidityCurrEl.textContent = "Humidity: " + humidity + "%";
    windCurrEl.textContent = "Wind Speed: " + wind + " MPH"
}

userCity();



