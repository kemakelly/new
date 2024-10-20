

const time = document.getElementById("time");
const date = document.getElementById("date");
const country = document.getElementById("country");
const form = document.getElementById("form");
const city = document.getElementById("city");
let APIKEY = "418aec0fc40a9dc323d864599bdbcd2b";
const leftBottom = document.getElementById("left-bottom");
const weatherDetails = document.getElementById("weather-details");
const rightContainer = document.getElementById("right-container");

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const timeString = `${hours}:${minutes}:${seconds}`;
    time.textContent = timeString;
    const dateString = `${day}/${month}/${year}`;
    date.textContent = dateString;
}
updateClock();
setInterval(updateClock, 1000);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let cityInput = city.value;
    collectWeatherReport(cityInput);
    form.reset();
});

function collectWeatherReport(city) {
    let weatherRequest = new XMLHttpRequest();
    weatherRequest.open("Get", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);

    weatherRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);
            printWeatherOnUI(data);
        }
    };
    weatherRequest.send();
}

function printWeatherOnUI(data) {
    console.log(data);
    let temperature = data.main.temp;
    let cloudy = data.clouds.all;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let nameofCity = data.name;
    let weatherId = data.weather[0].id;
    let weatherDescription = data.weather[0].description; 

    let nameOfCityContainer = document.createElement("div");
    nameOfCityContainer.classList.add("cityname");
    let nameofCityText = document.createElement("h2");
    nameofCityText.textContent = nameofCity;

    let currentTempContainer = document.createElement("div");
    currentTempContainer.classList.add("degree");
    let displayDegree = document.createElement("h1");
    displayDegree.textContent = `${(temperature - 273.15).toFixed()}°C`;

    let humidityContainer = document.createElement("div");
    humidityContainer.classList.add("cloudy");
    let humidityTitle = document.createElement("p");
    humidityTitle.textContent = `Humidity`;
    let displayHumidity = document.createElement("h5");
    displayHumidity.textContent = `${humidity}%`;

    let cloudyContainer = document.createElement("div");
    cloudyContainer.classList.add("cloudy");
    let cloudyTitle = document.createElement("p");
    cloudyTitle.textContent = `Cloudy`;
    let displayCloud = document.createElement("h5");
    displayCloud.textContent = `${cloudy}%`;

    let windContainer = document.createElement("div");
    windContainer.classList.add("cloudy");
    let windTitle = document.createElement("p");
    windTitle.textContent = `Wind`;
    let displaywind = document.createElement("p");
    displaywind.textContent = `${wind} km/h`;

    let weatherIconElement = document.getElementById("weather-icon");
    let weatherIconClass = getWeatherIconClass(weatherId); 

   
    weatherIconElement.className = "";
    weatherIconElement.classList.add("fa-solid", weatherIconClass);

    
    let weatherConditionTextElement = document.getElementById("weather-condition-text");
    if (!weatherConditionTextElement) {
        weatherConditionTextElement = document.createElement("p");
        weatherConditionTextElement.id = "weather-condition-text";
        rightContainer.append(weatherConditionTextElement);
    }
    weatherConditionTextElement.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1); 

    nameOfCityContainer.append(nameofCityText);
    currentTempContainer.append(displayDegree);
    humidityContainer.append(humidityTitle, displayHumidity);
    cloudyContainer.append(cloudyTitle, displayCloud);
    windContainer.append(windTitle, displaywind);

    leftBottom.innerHTML = "";
    weatherDetails.innerHTML = "";
    leftBottom.append(nameOfCityContainer, currentTempContainer);
    weatherDetails.append(humidityContainer, cloudyContainer, windContainer);

    function getWeatherIconClass(weatherId) {
        if (weatherId >= 200 && weatherId < 300) {
            return "fa-cloud-bolt"; // Thunderstorm
        } else if (weatherId >= 300 && weatherId < 500) {
            return "fa-cloud-drizzle"; // Drizzle
        } else if (weatherId >= 500 && weatherId < 600) {
            return "fa-cloud-showers-heavy"; // Rain
        } else if (weatherId >= 600 && weatherId < 700) {
            return "fa-snowflake"; // Snow
        } else if (weatherId >= 700 && weatherId < 800) {
            return "fa-smog"; // Atmosphere (mist, fog, etc.)
        } else if (weatherId === 800) {
            return "fa-sun"; // Clear sky
        } else if (weatherId > 800) {
            return "fa-cloud"; // Cloudy
        }
    }
}