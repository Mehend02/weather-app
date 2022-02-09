# Overview

This application displays the Current Forecast or a 5-Day Forecast based on ZIP code, along with other meterological data. The weather data is retrieved using JavaScript fetch() (AJAX) calls to the OpenWeatherMap API.

**You will need an API key in order to communicate with the API and run this application.**

## Signing Up for an OpenWeather API account and getting an API key

- Sign up for a free OpenWeather.org account at [https://home.openweathermap.org/users/sign_up]
- You will then be brought to the home page
- Click on the tab that says "API Keys"
- On the right, you will see a section labeled "Create Key".
- Follow the instructions to generate an API key.
- You will need this key in order for the JavaScript code to access the API.

## Adding Your API Key to the JavaScript Code

In the file named **weather.js** within the folder named **js**, you will need to insert your API key on line 188, where it says YOUR_API_KEY_GOES_HERE. The API key should be a string in single quotes.
