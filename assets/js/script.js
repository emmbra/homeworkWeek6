$(document).ready(function() {
















    
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