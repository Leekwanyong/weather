// weather.js
import config from "../config.js";

const weatherSection = document.querySelector('#weather');
const { API_KEY } = config;

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
};

const error = () => {
    weatherSection.innerText = "Unable to retrieve your location.";
};

const getWeather = (lat, lon) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            const temperature = json.main.temp;
            const weatherDescription = json.weather[0].description;
            const location = json.name;
            weatherSection.innerText = `Location: ${location}, Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
        })
        .catch(error => {
            weatherSection.innerText = "Failed to fetch weather information.";
            console.error('Error fetching weather data:', error);
        });
};

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    weatherSection.innerText = "Geolocation is not supported by your browser.";
}
