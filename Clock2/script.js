const secondHand = document.getElementById('secHand');
const minHand = document.getElementById('minHand');
const hourHand = document.getElementById('hourHand');

function updateClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondDeg = (seconds / 60) * 360;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    const minutes = now.getMinutes();
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    minHand.style.transform = `rotate(${minuteDeg}deg)`;

    const hours = now.getHours();
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;

    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    document.getElementById('date').textContent = `${month + 1}/${day}/${year}`;
    document.getElementById('time').textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateWeather() {

    // API Key methods
    var apiKey = '12345';
    Weather.setApiKey(apiKey);
    var tempApiKey = Weather.getApiKey();

    const weatherData = null;

    // Get the current weather for a given city using the latitude and longitude
    var lat = 3.136899260164333,
        long = 101.73367344637204;
    Weather.getCurrentByLatLong(lat, long, function (current) {
        weatherData = {
            temperature: current.temperature(),
            condition: current.conditions()
        };
    });

    document.getElementById('weather').textContent = `Weather: ${weatherData.condition}, ${weatherData.temperature}°C`;
}

function update() {
    updateClock();
    updateWeather();
}

setInterval(update, 1000);
update(); // Initial update
