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

  // invoke functions to display weather info for default city
  weatherDaily();
  weatherFiveDay();

  //function to retrieve the daily forecast for city searched and create html elements to display data
  //set default value to citySearched so page displays weather
  function weatherDaily(citySearched = "San Francisco") {
    // API request for daily weather conditions based on city searched for
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&units=imperial`,
      type: "GET"
    }).then(function(response) {
      $("#daily-forecast").empty();

      // variables
      var dailyForecastCard = $("<div>").addClass("card");
      var dailyForecastCardBody = $("<div>").addClass("card-body");
      var cityName = $("<h5>")
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
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&lat=${latitude}&lon=${longitude}`,
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
  function weatherFiveDay(citySearched = "San Francisco") {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&units=imperial`,
      type: "GET"
    }).then(function(response) {
      console.log(response);
      $("#5-day-forecast").empty();
      // for loop to cycle through 5 day forecast api response and pull same time forecast (18:00:00) for each day
      for (var i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("18:00:00") !== -1) {
          //better way to write this equality statement?
          //

          // create HTML elements
          
          var fiveDayCard = $("<div>").addClass("card");
          var fiveDayCardBody = $("<div>").addClass("card-body");
          var formattedDate = moment(response.list[i].dt_txt).format("LL");
          var fiveDayCityName = $("<h5>").addClass("card-title").text(response.city.name + ": ");
          var fiveDayDate = $("<span>")
            .addClass("card-title")
            .text(formattedDate);
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
          // $("#5-day-forecast").append(fiveDayForecast);
          fiveDayCityName.append(fiveDayDate);
          fiveDayCardBody.append(
            fiveDayCityName,
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
    var citySearched = $("#city-searched")
      .val()
      .trim();
    $("#city-searched").val("");
    weatherDaily(citySearched);
    weatherFiveDay(citySearched);
    historyBar(citySearched);
    // push citySearched to history array and then save to local storage
    searchHistory.push(citySearched);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  });

  // on click event listener for clear button
  $("#clear-btn").on("click", function() {
    localStorage.clear();
    $("#history-bar").empty();
  });

  // on click event listener for cities in the history bar
  $("#history-bar").on("click", "li", function() {
    weatherDaily($(this).text());
    weatherFiveDay($(this).text());
  });
});
