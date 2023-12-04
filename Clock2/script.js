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

    document.getElementById('time').textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds}`;
}

function updateWeather() {
    // Simulated weather data
    const weatherData = {
        temperature: 25,
        condition: 'Sunny'
    };

    document.getElementById('weather').textContent = `Weather: ${weatherData.condition}, ${weatherData.temperature}°C`;
}

function update() {
    updateClock();
    updateWeather();
}

setInterval(update, 1000);
update(); // Initial update
