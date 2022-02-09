function getCurrentWeather(data, zipCode) {
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '400' || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // show the initially hidden div
        weatherContent.style.display = 'block'
        // display error message to user
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return // exit the fetch operation
    }
    // if we didn't get an error then...
    // show the initially hidden div
    weatherContent.style.display = 'block'
    // create div element to make a flexbox, set its class, and append to DOM
    let bigBox = document.createElement('div')
    bigBox.classList.add('bigBox')
    weatherContent.append(bigBox)
    // create another div element to make a flexbox, set its class, and append to DOM
    let box1 = document.createElement('div')
    box1.classList.add('box1')
    bigBox.append(box1)
    // create a p element, and set the content of the p to a map pointer icon and the location name from API, then add to the div
    let p = document.createElement('p')
    p.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'><path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' /></svg> " + data.name
    p.classList.add('location')
    box1.append(p)
    // create a p element
    p = document.createElement('p')
    // create a new date object from the API data and convert to milliseconds
    let date = new Date(data.dt * 1000)
    // convert date to US format
    let dateStr = date.toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })
    // convert time to US format, with just hour and minutes
    let timeStr = date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
    // set the content of the p to the date and time, then add the p to the DOM
    p.innerHTML = dateStr + ' - ' + timeStr
    box1.append(p)
    // create a div element, set its class, and append to DOM
    div = document.createElement('div')
    div.classList.add('weatherbox')
    box1.append(div)
    // create an img element for icon
    const icon = document.createElement('img')
    // set the src attribute using the data from the API
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    icon.setAttribute('alt', 'weather icon')
    // add the icon to the div
    div.append(icon)
    // create a p element, and set the inner HTML of the p to the temperature (rounded to nearest degree) and append to div
    p = document.createElement('p')
    p.innerHTML = data.main.temp.toFixed() + "\u00B0"
    p.classList.add('temp')
    div.append(p)
    // create a p element, get High/Low Temp and Feels Like data, round to nearest degree, then set the contents of the p to these temps and append to DOM
    p = document.createElement('p')
    p.innerHTML = data.main.temp_max.toFixed() + "\u00B0 / " + data.main.temp_min.toFixed() + "\u00B0 &nbsp Feels Like " + data.main.feels_like.toFixed() + "\u00B0"
    p.classList.add('feels')
    box1.append(p)
    // create a p element, get the weather description, then set the content of the p to the weather description with the first letter capitalized and add to DOM
    p = document.createElement('p')
    let weatherDescription = data.weather[0].description
    p.innerHTML = weatherDescription[0].toUpperCase() + weatherDescription.slice(1)
    p.classList.add('description')
    box1.append(p)
    // create a div element and append to DOM
    let box2 = document.createElement('div')
    box2.classList.add('box2')
    bigBox.append(box2)
    // create a p element, get Humidity and Wind Speed data, then set the content of the p to the humidity and wind speed and append to DOM
    p = document.createElement('p')
    p.innerHTML = "Humidity: " + data.main.humidity + "%<br> Wind Speed: " + data.wind.speed + " mph"
    box2.append(p)
    // create a p element 
    p = document.createElement('p')
    // create date object from Sunrise data, convert to US time format.
    let sunrise = new Date(data.sys.sunrise * 1000)
    let timeSunrise = sunrise.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
    // create date object from Sunset data, convert to US time format. 
    let sunset = new Date(data.sys.sunset * 1000)
    let timeSunset = sunset.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
    // Put them in a paragraph with sunrise/sunset icons and append to DOM
    p.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-sun' viewBox='0 0 16 16'><path d='M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z'/></svg> Sunrise: " + timeSunrise + "<br><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-brightness-alt-high' viewBox='0 0 16 16'><path d='M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4zm0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8z'/></svg> Sunset: " + timeSunset
    box2.append(p)
}

function getWeatherForecast(data, zipCode) {
    console.log(data)
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '400' || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // show the initially hidden div
        weatherContent.style.display = 'block'
        // display error message to user
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return // exit the fetch operation
    }
    // if we didn't get an error then...
    // change the style attribute to display the weather content div on the page
    weatherContent.style.display = 'block'
    // create an h3 element, set its text to Weather Forecast and location from API, and append to DOM
    let h3 = document.createElement('h3')
    h3.innerHTML = "Weather Forecast for " + data.city.name
    // h3.classList.add('text-center')
    h3.classList.add('forecast-title')
    h3.classList.add('mb-4')
    h3.classList.add('fs-2')
    h3.classList.add('fw-bold')
    weatherContent.append(h3)
    // declare variable currentDate and have it be undefined initially
    let currentDate
    // the data from the API fetch operation will come back as an array so need to iterate through it to display the weather for each day and times of day
    data.list.forEach(function (dayTime) {
        // create a p element
        let p = document.createElement('p')
        // create a date object from the API data
        let day = new Date(dayTime.dt * 1000)
        // convert the date to US format
        let dayStr = day.toLocaleDateString('en-us', { weekday: 'long', month: 'short', day: 'numeric' })
        // convert the time to US format
        let forecastTimeStr = day.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
        // Since the data readings are taken 8 times a day, we want to display the date only once for that series of readings per day
        // Check to see if the current date repeats.
        if (currentDate != dayStr) {
            // If it is not a repeat, then set the inner HTML of the p to the date 
            currentDate = dayStr
            p.innerHTML = currentDate
            p.classList.add('date')
            weatherContent.append(p)
        }
        // create a div element to make a flexbox and append to DOM
        let displayContainer = document.createElement('div')
        displayContainer.classList.add('displayContainer')
        weatherContent.append(displayContainer)
        // create a p element, set its inner HTML to the time, and append to DOM
        p = document.createElement('p')
        p.innerHTML = forecastTimeStr
        p.classList.add('time')
        displayContainer.append(p)
        // create a div to make a flexbox and append the div to the DOM
        let timeBox1 = document.createElement('div')
        timeBox1.classList.add('timeBox1')
        displayContainer.append(timeBox1)
        // create a div element and append to DOM
        let timeBox2 = document.createElement('div')
        timeBox2.classList.add('timeBox2')
        timeBox1.append(timeBox2)
        // create another div and append to timeBox1 div
        let tempBox = document.createElement('div')
        tempBox.classList.add('tempBox')
        timeBox2.append(tempBox)
        // create img element for icon
        const icon = document.createElement('img')
        // set the src attribute using the data from the API
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${dayTime.weather[0].icon}@2x.png`)
        icon.setAttribute('alt', 'weather icon')
        // add the icon to the DOM
        tempBox.append(icon)
        // create a p element, set its inner HTML to the temperature, rounded to nearest degree, then append to DOM
        p = document.createElement('p')
        p.innerHTML = dayTime.main.temp.toFixed() + "\u00B0"
        p.classList.add('forecastTemp')
        tempBox.append(p)
        // create a p element, get High/Low Temp and Feels Like data, round to nearest degree and put them in the paragraph and append to DOM
        p = document.createElement('p')
        p.innerHTML = dayTime.main.temp_max.toFixed() + "\u00B0 / " + dayTime.main.temp_min.toFixed() + "\u00B0 &nbsp Feels Like " + dayTime.main.feels_like.toFixed() + "\u00B0"
        p.classList.add('feelsLike')
        timeBox2.append(p)
        // create a p element, get weather description, with first letter converted to uppercase, put it in the paragraph and append to DOM
        p = document.createElement('p')
        let weatherDescription = dayTime.weather[0].description
        p.innerHTML = weatherDescription[0].toUpperCase() + weatherDescription.slice(1)
        p.classList.add('description2')
        timeBox2.append(p)
        // create a horizotal rule and append to DOM
        let hr = document.createElement('hr')
        hr.classList.add('rule')
        timeBox2.append(hr)
        // create a p element, get Humidity, Wind Speed, Visibility (convert to miles, rounded to nearest mile), and Chance of Rain data and put it in the paragraph and append to DOM
        p = document.createElement('p')
        let convertMiles = dayTime.visibility / 1609.344
        let miles = convertMiles.toFixed()
        p.innerHTML = "Humidity: " + dayTime.main.humidity + "%<br> Wind Speed: " + dayTime.wind.speed + " mph<br>Visibility: " + miles + " miles<br>Chance of Rain: " + (dayTime.pop * 100).toFixed() + "%"
        p.classList.add('details')
        timeBox1.append(p)
    })
}

// Declare Variables and get a handle on the div where the weather data should be displayed
const weatherContent = document.querySelector('#weather')
const API_KEY = 'YOUR_API_KEY_GOES_HERE'
// get a handle on and add event listener to the Get Current Weather button, so when it is clicked, current weather data will be fetched from the OpenWeather API and the getCurrentWeather function will be called
document.querySelector('#getWeather').addEventListener('click', function () {
    weatherContent.innerHTML = '' // clear out prior results
    // get the value from the input field
    let zipCode = document.querySelector('#zip').value
    // set the url to the API url with zipcode and API key
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    // perform a fetch operation to get the data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call getCurrentWeather function and pass in data and zipcode variables
            getCurrentWeather(data, zipCode)
        }).catch((e) => {
            // if there is an error in the fetch process, then display error message in console log
            console.log(`This error occurred: ${e}`)
        })
})
// get a handle on and add event listener to the Get Weather Forecast button, so when it is clicked, the 5-day weather forecast data will be fetched from the OpenWeather API and the getWeatherForecast function will be called
document.querySelector('#getWeatherForecast').addEventListener('click', function () {
    // clear out prior results
    weatherContent.innerHTML = ''
    // from the input field, get the zipcode value that the user entered
    let zipCode = document.querySelector('#zip').value
    // set the url to the API url with zipcode and API key
    let url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    // perform a fetch operation to get the data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // call the getWeatherForecast function and pass in data and zipcode variables
            getWeatherForecast(data, zipCode)
        }).catch((e) => {
            // if there is an error in the fetch process, then display error message in console log
            console.log(`This error occurred: ${e}`)
        })
})