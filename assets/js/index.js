const apiurl = 'https://api.openweathermap.org';
const apiKey = '2ac394ef97cc276f641aa44871202faf';
const searchFromEl = document.getElementById('search-form');
const textFormEl = document.getElementById('search-text');
const submitSearchEl = document.querySelector('input[type="submit"]');
const localDateTime = new Date ().toLocaleString();
const searchHistory = [];


var searchedCity = document.querySelector('#searched-city')
var searchedUV = document.querySelector('#main-uv')
var searchedWind = document.querySelector('#main-wind')
var searchedHumid = document.querySelector('#main-humidity')
var searchedTemp = document.querySelector('#main-temp')

var previousSelection = document.querySelector('#previous-selection')

var dayOneImg = document.querySelector('#day-1-image')
var dayOneTemp = document.querySelector('#day-1-temp')
var dayOneWindSpd = document.querySelector('#day-1-wind-speed')
var dayOneHumid = document.querySelector('#day-1-humid')

var dayTwoImg = document.querySelector('#day-2-image')
var dayTwoTemp = document.querySelector('#day-2-temp')
var dayTwoWindSpd = document.querySelector('#day-2-wind-speed')
var dayTwoHumid = document.querySelector('#day-2-humid')

var dayThreeImg = document.querySelector('#day-3-image')
var dayThreeTemp = document.querySelector('#day-3-temp')
var dayThreeWindSpd = document.querySelector('#day-3-wind-speed')
var dayThreeHumid = document.querySelector('#day-3-humid')

var dayFourImg = document.querySelector('#day-4-image')
var dayFourTemp = document.querySelector('#day-4-temp')
var dayFourWindSpd = document.querySelector('#day-4-wind-speed')
var dayFourHumid = document.querySelector('#day-4-humid')





const locationPrompt = navigator.geolocation.getCurrentPosition(({coords}) => console.log(coords));


function fetchUserLocation (city) {
    fetch(`${apiurl}/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then((res) => (
        res.json()
    )).then((data) => {
        // console.log(data)
        fetchCurrentWeather(data);
    }).catch(err => console.log(err))
};


function handleSearch(event) {
    event.preventDefault();

    // if (searchedCity == true){
    //     searchedCity.remove(),
    //     searchedUV.remove()
    //     searchedWind.remove()
    //     searchedHumid.remove()
    //     searchedTemp.remove()
    // }

    if (locationPrompt?.latitude && locationPrompt?.longitude) {
        // api call that gets forecast and current weather.
        // fetchCurrentWeather(locationPrompt)
    }
    if (!locationPrompt) {
        fetchUserLocation (textFormEl.value)
    }


    // console.log(textFormEl.value);

}
 

function fetchCurrentWeather(userLocation) {
    console.log(userLocation)
    fetch(`${apiurl}/data/2.5/weather?lat=${userLocation?.coord.lat}&lon=${userLocation?.coord.lon}&appid=${apiKey}&units=imperial`)
    .then((res) => (
        res.json()
    )).then((data) => (
        
        renderWeather(data),

        // console.log(typeof data),
        searchedCity.insertAdjacentText('beforeend', `${data.name}`),
        searchedUV.insertAdjacentHTML('afterbegin', `<p class="search">Current UV Index: ${data.sys.type}</p>`),
        searchedWind.insertAdjacentHTML('afterbegin', `<p class="search">Current Windspeed: ${data.wind.speed} MPH</p>`),
        searchedHumid.insertAdjacentHTML('afterbegin', `<p class="search">Current Humidity: ${data.main.humidity}</p>`),
        searchedTemp.insertAdjacentHTML('afterbegin', `<p class="search">Current Temperature: ${data.main.temp} Degrees Fahrenheit </p>`),

        previousSelection.insertAdjacentHTML('beforeend', `<li class="collection-item"><div>${data.name}<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>`),

        dayOneImg.insertAdjacentHTML('beforeend', `<img src=${data}></img>`),
        dayOneTemp.insertAdjacentHTML('beforeend', `<p>Temp: ${data}</p>`),
        dayOneWindSpd.insertAdjacentHTML('beforeend', `<p>Wind Speed: ${data}</p>`),
        dayOneHumid.insertAdjacentHTML('beforeend', `<p>Humidity: ${data}</p>`),

        dayTwoImg.insertAdjacentHTML('beforeend', `<img src=${data}></img>`),
        dayTwoTemp.insertAdjacentHTML('beforeend', `<p>Temp: ${data}</p>`),
        dayTwoWindSpd.insertAdjacentHTML('beforeend', `<p>Wind Speed: ${data}</p>`),
        dayTwoHumid.insertAdjacentHTML('beforeend', `<p>Humidity: ${data}</p>`),

        dayThreeImg.insertAdjacentHTML('beforeend', `<img src=${data}></img>`),
        dayThreeTemp.insertAdjacentHTML('beforeend', `<p>Temp: ${data}</p>`),
        dayThreeWindSpd.insertAdjacentHTML('beforeend', `<p>Wind Speed: ${data}</p>`),
        dayThreeHumid.insertAdjacentHTML('beforeend', `<p>Humidity: ${data}</p>`),

        dayFourImg.insertAdjacentHTML('beforeend', `<img src=${data}></img>`),
        dayFourTemp.insertAdjacentHTML('beforeend', `<p>Temp: ${data}</p>`),
        dayFourWindSpd.insertAdjacentHTML('beforeend', `<p>Wind Speed: ${data}</p>`),
        dayFourHumid.insertAdjacentHTML('beforeend', `<p>Humidity: ${data}</p>`)



    )).catch(err=> console.log(err))
}

function renderWeather(forecast, timezone){
    const weatherElement = document.createElement("div")
    const textEl = document.createElement("p")
    weatherElement.setAttribute("class", "weathercontainer")
    textEl.innerText = "Current Five Day Forecast: "
    weatherElement.appendChild(textEl);
    for( let i = 0; i < forecast.length; i++) {
        textEl.append(JSON.stringify(forecast[i]))
        weatherElement.appendChild(forecast[i])
    }
}

submitSearchEl.addEventListener('click', handleSearch)
