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
    document.getElementById('time').textContent = `${hours == 0 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const apiKey = "b0855f0d337eb10cea885183cb8317e4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kuala%20Lumpur";

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    document.getElementById('cityNameAndTemp').textContent = `${data.name}, ${data.main.temp.toFixed(1)}°C`;
    document.getElementById('weather').textContent = `${data.weather[0].main}, ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} km/h`;
}

function update() {
    updateClock();
    checkWeather();
}

setInterval(update, 1000);
update(); // Initial update
