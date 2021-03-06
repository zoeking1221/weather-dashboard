// global variables
var cityEl = document.querySelector("#city");
var temperatureCurrEl = document.querySelector("#current-temperature");
var humidityCurrEl = document.querySelector("#current-humidity");
var windCurrEl = document.querySelector("#current-wind");
var indexEl = document.querySelector("#current-uv")
var temp1El = document.querySelector("#temp-1");
var humidity1El = document.querySelector("#humidity-1");
var temp2El = document.querySelector("#temp-2");
var humidity2El = document.querySelector("#humidity-2");
var temp3El = document.querySelector("#temp-3");
var humidity3El = document.querySelector("#humidity-3");
var temp4El = document.querySelector("#temp-4");
var humidity4El = document.querySelector("#humidity-4");
var temp5El = document.querySelector("#temp-5");
var humidity5El = document.querySelector("#humidity-5");
var icon1El = document.querySelector("#icon-1")
var icon2El = document.querySelector("#icon-2")
var icon3El = document.querySelector("#icon-3")
var icon4El = document.querySelector("#icon-4")
var icon5El = document.querySelector("#icon-5")
var cityDateEl = document.querySelector("#city-date");
var currentDateEl = moment().format("M/D/YYYY");
var day1DateEl = document.querySelector("#date-1");
var day2DateEl = document.querySelector("#date-2");
var day3DateEl = document.querySelector("#date-3");
var day4DateEl = document.querySelector("#date-4");
var day5DateEl = document.querySelector("#date-5");
var iconCurrEl = document.querySelector("#current-icon");
var cityInputEl = document.querySelector("#city-input");
var submitBtnEl = document.querySelector("#submit-btn")
var searchedCitiesArray = [];
var searchedCitiesEl = document.querySelector("#searched-cities");
var cityClickEl = document.querySelector("city-click");


// function to print previously searched cities
var printCityList = function() {
    var cityList = JSON.parse(localStorage.getItem("city"));
    if (cityList) {
        searchedCitiesArray = cityList;
    }
    console.log(searchedCitiesArray);
    searchedCitiesEl.textContent = "";
    for (i = 0; i < searchedCitiesArray.length; i++) {
        var searchedCity = $("<li>").text(searchedCitiesArray[i]);
        searchedCity.addClass("city-click");
        $(searchedCitiesEl).append(searchedCity);
    };
}


// fetch call to weather api
var currentWeather = function(currentCity) {
    var cityList = JSON.parse(localStorage.getItem("city"));
    if (cityList) {
        searchedCitiesArray = cityList;
        if (searchedCitiesArray.includes(currentCity)) {
        }
        else {
        searchedCitiesArray.push(currentCity);
        localStorage.setItem("city", JSON.stringify(searchedCitiesArray));
        };
    }
    else {
        searchedCitiesArray.push(currentCity);
        localStorage.setItem("city", JSON.stringify(searchedCitiesArray)); 
    }

    printCityList();

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=1ff931a046e8da2e9dbb764cf69663cb")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
       displayCurrent(data);
    });
};


// function to display current weather info
var displayCurrent = function(data) {
    iconCurrEl.textContent = "";
    // var currentCity = cityInputEl.value.trim();
    cityDateEl.textContent = data.name + " (" + currentDateEl + ")";
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var wind = data.wind.speed;
    temperatureCurrEl.textContent = "Temperature: " + temp + " °F";
    humidityCurrEl.textContent = "Humidity: " + humidity + "%";
    windCurrEl.textContent = "Wind Speed: " + wind + " MPH";  
    var iconCurrent = data.weather[0].icon;
    var iconCurrImg = document.createElement('img');
    iconCurrImg.setAttribute('src', "http://openweathermap.org/img/wn/" + iconCurrent + "@2x.png");
    iconCurrEl.appendChild(iconCurrImg);

    // uv index
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon +"&appid=1ff931a046e8da2e9dbb764cf69663cb")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var index = data.value;
        indexEl.textContent = " " + index;
        if (index <= 2) {
            $(indexEl).addClass("favorable");
        }
        else if (index > 2 & index <= 5) {
            $(indexEl).addClass("moderate");
        }
        else {
            $(indexEl).addClass("severe");
        }
    });
}


// fetch call for 5 day forecast
var fiveDayForecast = function(currentCity) {
    
    // clear data from previous search
    $(indexEl).removeClass("moderate favorable severe");
    while (icon1El.hasChildNodes()) {
        icon1El.removeChild(icon1El.firstChild);
    }
    while (icon2El.hasChildNodes()) {
        icon2El.removeChild(icon2El.firstChild);
    }
    while (icon3El.hasChildNodes()) {
        icon3El.removeChild(icon3El.firstChild);
    }
    while (icon4El.hasChildNodes()) {
        icon4El.removeChild(icon4El.firstChild);
    }
    while (icon5El.hasChildNodes()) {
        icon5El.removeChild(icon5El.firstChild);
    }

    // get input city text, then use to fetch api
    // var currentCity = cityInputEl.value.trim();
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&&appid=1ff931a046e8da2e9dbb764cf69663cb")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        displayFiveDay(data);
    })
};

// function to display 5 day forecast
var displayFiveDay = function(data) {
    // day 1
    var day1Date = moment().add(1, 'days').format("M/D/YYYY");
    day1DateEl.textContent = day1Date;
    var temp1 = data.list[3].main.temp;
    var humidity1 = data.list[3].main.humidity;
    var icon1 = data.list[3].weather[0].icon;
    var icon1Img = document.createElement('img');
    icon1Img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon1 + "@2x.png");
    icon1El.appendChild(icon1Img);
    temp1El.textContent = "Temp: " + temp1 + " °F";
    humidity1El.textContent = "Humidity: " + humidity1 + "%";

    // day 2
    var day2Date = moment().add(2, 'days').format("M/D/YYYY");
    day2DateEl.textContent = day2Date;
    var temp2 = data.list[11].main.temp;
    var humidity2 = data.list[11].main.humidity;
    var icon2 = data.list[11].weather[0].icon;
    var icon2Img = document.createElement('img');
    icon2Img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon2 + "@2x.png");
    icon2El.appendChild(icon2Img);
    temp2El.textContent = "Temp: " + temp2 + " °F"
    humidity2El.textContent = "Humidity: " + humidity2 + "%"

    // day 3
    var day3Date = moment().add(3, 'days').format("M/D/YYYY");
    day3DateEl.textContent = day3Date;
    var temp3 = data.list[19].main.temp;
    var humidity3 = data.list[19].main.humidity;
    var icon3 = data.list[19].weather[0].icon;
    var icon3Img = document.createElement('img');
    icon3Img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon3 + "@2x.png");
    icon3El.appendChild(icon3Img);
    temp3El.textContent = "Temp: " + temp3 + " °F"
    humidity3El.textContent = "Humidity: " + humidity3 + "%"

    // day 4
    var day4Date = moment().add(4, 'days').format("M/D/YYYY");
    day4DateEl.textContent = day4Date;
    var temp4 = data.list[27].main.temp;
    var humidity4 = data.list[27].main.humidity;
    var icon4 = data.list[27].weather[0].icon;
    var icon4Img = document.createElement('img');
    icon4Img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon4 + "@2x.png");
    icon4El.appendChild(icon4Img);
    temp4El.textContent = "Temp: " + temp4 + " °F"
    humidity4El.textContent = "Humidity: " + humidity4 + "%"

    // day 5
    var day5Date = moment().add(5, 'days').format("M/D/YYYY");
    day5DateEl.textContent = day5Date;
    var temp5 = data.list[36].main.temp;
    var humidity5 = data.list[36].main.humidity;
    var icon5 = data.list[36].weather[0].icon;
    var icon5Img = document.createElement('img');
    icon5Img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon5 + "@2x.png");
    icon5El.appendChild(icon5Img);
    temp5El.textContent = "Temp: " + temp5 + " °F"
    humidity5El.textContent = "Humidity: " + humidity5 + "%"
    
}



printCityList();

// event listener - submit button
$(submitBtnEl).on("click", function(event) {
    event.preventDefault();
    var currentCitySearch = cityInputEl.value.trim();
    currentWeather(currentCitySearch);
    fiveDayForecast(currentCitySearch);
});

// event listener - previously searched cities
$(searchedCitiesEl).on("click", function(event) {
    if (event.target.classList.contains("city-click")) {
        var currentCityClick = event.target.innerHTML;
    }
    else {
        return;
    }
    currentWeather(currentCityClick);
    fiveDayForecast(currentCityClick);
});






