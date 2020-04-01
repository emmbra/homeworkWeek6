$(document).ready(function() {
  // sets current date
  var currentDay = moment().format("LL");

  // check local storage for searchHistory or create blank array 
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // append local storage items to history bar
  for (var i = 0; i < searchHistory.length; i++) {
    historyBar(searchHistory[i]);
}

  // function to create items in history bar
  function historyBar(citySearched) {
    var cityList = $("<li>").text(citySearched);
    $("#history-bar").append(cityList);
  }

  //function to retrieve the daily forecast for city searched and create html elements to display data
  function weatherDaily(citySearched) {
    // API request for daily weather conditions based on city searched for
    var citySearched = $("#city-searched")
      .val()
      .trim();
    // push citySearched to history array and then save to local storage
    searchHistory.push(citySearched);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    // append citySearched to history bar
    historyBar();

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        citySearched +
        "&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&units=imperial",
      type: "GET"
    }).then(function(response) {
      console.log("hello", response);
      $("#daily-forecast").empty();

      // variables
      var dailyForecastCard = $("<div>").addClass("card");
      var dailyForecastCardBody = $("<div>").addClass("card-body");
      var cityName = $("<h4>")
        .addClass("card-title")
        .text(response.name + ":");
      var dateTime = $("<span>").text(" " + currentDay);
      var weatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      var windSpeed = $("<p>")
        .addClass("card-text")
        .text("Wind Speed: " + response.wind.speed + "MPH");
      var humidity = $("<p>")
        .addClass("card-text")
        .text("Humidity: " + response.main.humidity + "%");
      var temperature = $("<p>")
        .addClass("card-text")
        .text("Temperature: " + response.main.temp + "°F");
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;

      // nested API request for daily UV conditions based on city searched for
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/uvi?appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&lat=" +
          latitude +
          "&lon=" +
          longitude,

        type: "GET"
      }).then(function(response) {
        //variables
        var uvValue = response.value;
        var uvIndex = $("<span>")
          .addClass("card-text")
          .text("UV Index: ");
        var uvBtn = $("<button>")
          .addClass("btn btn-sm")
          .text(uvValue);
        // uvValue determines uv button colors
        if (uvValue < 4) {
          uvBtn.addClass("btn-success");
        } else if (uvValue < 7) {
          uvBtn.addClass("btn-warning");
        } else {
          uvBtn.addClass("btn-danger");
        }

        // append created HTML elements to the card body
        dailyForecastCardBody.append(uvIndex);
        dailyForecastCardBody.append(uvBtn);
      });

      //append created HTML elements to the card
      cityName.append(dateTime);
      dailyForecastCardBody.append(
        cityName,
        weatherIcon,
        temperature,
        windSpeed,
        humidity
      );
      dailyForecastCard.append(dailyForecastCardBody);
      $("#daily-forecast").append(dailyForecastCard);
    });
  }

  // function to retrieve 5 day forecast based on city searched for
  function weatherFiveDay(citySearched) {
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearched +
        "&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&units=imperial",
      type: "GET"
    }).then(function(response) {
      console.log("hi", response);
      // for loop to cycle through 5 day forecast api and pull same time forecast (18:00:00) for each day
      for (var i = 0; i < response.list.length; i++);
      {
        if (response.list[i].dt_txt.indexOf("18:00:00") !== -1) { //better way to write this equality statement?
          //

          // create HTML elements
          var fiveDayCard = $("<div>").addClass("card");
          var fiveDayCardBody = $("<div>").addClass("card-body");
          var fiveDayDate = $("<h4>")
            .addClass("card-title")
            .text(response.list[i].dt_txt);
          var fiveDayIcon = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              response.list[i].weather[0].icon +
              ".png"
          );
          var fiveDayTemp = $("<p>")
            .addClass("card-text")
            .text("Temperature: " + response.list[i].main.temp + "°F");
          var fiveDayHumidity = $("<p>")
            .addClass("card-text")
            .text("Humidity: " + response.list[i].main.humidity + "%");

          // append created HTML elements
          fiveDayCardBody.append(
            fiveDayDate,
            fiveDayIcon,
            fiveDayTemp,
            fiveDayHumidity
          );
          fiveDayCard.append(fiveDayCardBody);
          $("#5-day-forecast").append(fiveDayCard);
        }
      }
    });
  }

  // on click event listener for search button
  $("#search-btn").on("click", function() {
    var citySearched = $("#city-searched").val();
    $("#search-value").val("");
    weatherDaily(citySearched);
    weatherFiveDay(citySearched);
  });

  // on click event listener for cities in the history bar
  $("#history-bar").on("click", "li", function() {
    weatherDaily($(this).text());
    weatherFiveDay($(this).text());
  });
});
// 1. user opens weather dashboard
// 2. user can enter a city into a search bar
//     a. build search bar
//         1. user types something and clicks
//         2. on click, page displays current/future conditions for that city
//             a. city name
//             b. date
//             c. weather condition icon
//             d. temperature
//             e. humidity
//             f. wind speed
//             g. uv index (comes from 2nd API call)
//                 1. uv index is color coded
//                     a. color #1 - favorable
//                     b. color #2 - moderate
//                     c. color #3 - severe
//             h. 5 day forecast (comes from 3rd API call)
//                 1. date
//                 2. weather condition icon
//                 3. temperature
//                 4. humidity
//         3. user can view search history
//             a. history city on click presents current/future conditions for that city
//         4. save search history to localstorage.set from array
// 3. user revisits page
//     a. user presented with last searched city forecast
//         1. localstorage.get (use for loop)

// HTML Layout
// -sidebar for the history
// -search bar in header
// -main div to hold all the weather info
//     -daily
//     -5 day

// Functions:
// -getWeather function - nested APIs
// -localstorage.set function
// -localstorage.get function
// -on click for user search   -- diff onclick
// -on click for history search-- diff onclick
