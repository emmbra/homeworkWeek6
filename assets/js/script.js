$(document).ready(function() {


// function to check local storage for saved searches and append items to history bar



//function to retrieve the daily forecast for city searched and create html elements to display data
// add in localstorage.set here?

function weatherDaily (citySearched) {
    // API request for daily weather conditions based on city searched for
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&units=imperial",
        type: "GET"
    }).then(function(response) {
        $("#daily-forecast").empty();

        // variables
        var dailyForecastCard = $("<div>").addClass("card");
        var dailyForecastCardBody = $("<div>").addClass("card-body");
        var cityName = $("<p>").addClass("card-title").text(data.name);
        var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temperature = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "°F");
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        // nested API request for daily UV conditions based on city searched for
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=a9fa8e4a5cdb9ab82f25d7a62cad4d&lat=" + latitude + "&lon=" + longitude,
    
            type: "GET"
        }).then(function(response) {

            //variables
            var uvValue = response.value;
            var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + uvValue);
            // come back to change colors based on uvValue, maybe use bootstrap buttons?
                // btn-danger = red
                // btn-warning = yellow
                // btn-sucess = green
                // UV Scale = 1-2 (low), 3-7 (medium), >7 (high)
                // use if/else statements to set button colors, set button text to uvValue

            // append created HTML elements to the card body
            dailyForecastCardBody.append(uvIndex);

        });

        //append created HTML elements to the card
        dailyForecastCardBody.append(cityName, weatherIcon, temperature, windSpeed, humidity)
        dailyForecastCard.append(dailyForecastCardBody);
        $("#daily-forecast").append(dailyForecastCard);
    });
}




// function to retrieve 5 day forecast based on city searched for
function weatherFiveDay (citySearched) {

}



// on click event listener for search button
$("#search-btn").on("click", function () {
    var citySearched = $("#city-searched").val();
    $("#search-value").val("");
    weatherDaily(citySearched);
});




// on click event listener for cities in the history bar











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