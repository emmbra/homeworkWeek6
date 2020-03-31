# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
## Pseudocode
1. user opens weather dashboard
2. user can enter a city into a search bar
    a. build search bar
        1. user types something and clicks
        2. on click, page displays current/future conditions for that city
            a. city name
            b. date
            c. weather condition icon
            d. temperature
            e. humidity
            f. wind speed
            g. uv index (comes from 2nd API call)
                1. uv index is color coded
                    a. color #1 - favorable
                    b. color #2 - moderate
                    c. color #3 - severe
            h. 5 day forecast (comes from 3rd API call)
                1. date
                2. weather condition icon
                3. temperature
                4. humidity
        3. user can view search history
            a. history city on click presents current/future conditions for that city
        4. save search history to localstorage.set from array
3. user revisits page
    a. user presented with last searched city forecast
        1. localstorage.get (use for loop)

HTML Layout
-sidebar for the history
-search bar in header
-main div to hold all the weather info
    -daily
    -5 day

Functions:
-getWeather function - nested APIs
-localstorage.set function
-localstorage.get function
-on click for user search   -- diff onclick
-on click for history search-- diff onclick


The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
