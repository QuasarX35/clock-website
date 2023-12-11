const clock = document.querySelector('.clock');
const braunClock = document.querySelector('.braunClock');
const lemnosClock = document.querySelector('.lemnosClock');
const yamazakiClock = document.querySelector('.yamazakiClock');
const clocks = [braunClock, lemnosClock, yamazakiClock];

function showBraunClock() {
    clocks.forEach(element => {
        element.style.display = 'none';
    });
    braunClock.style.display = 'block';
}

function showLemnosClock() {
    clocks.forEach(element => {
        element.style.display = 'none';
    });
    lemnosClock.style.display = 'block';
}

function showYamazakiClock() {
    clocks.forEach(element => {
        element.style.display = 'none';
    });
    yamazakiClock.style.display = 'block';
}


function drawMarks() {
    // braun clock
    const braunMarks = braunClock.getElementsByClassName('mark');
    for (var i = 0; i < 60; i++) {
        braunClock.innerHTML += "<div class='mark'></div>";
        braunMarks[i].style.transform = `rotate(${6 * i}deg)`;
    }

    // lemnos clock
    const lemnosMarks = lemnosClock.getElementsByClassName('mark');
    for (var i = 0; i < 60; i++) {
        lemnosClock.innerHTML += "<div class='mark'></div>";
        lemnosMarks[i].style.transform = `rotate(${6 * i}deg)`;
    }

    // lemnos clock
    const yamazakiMarks = yamazakiClock.getElementsByClassName('mark');
    for (var i = 0; i < 12; i++) {
        yamazakiClock.innerHTML += "<div class='mark'></div>";
        yamazakiMarks[i].style.transform = `rotate(${30 * i}deg) translateX(-40%)`;
    }
}

function drawNumbers() {
    // braun clock
    for (var i = 1; i <= 12; i++) {
        const hourNumber = document.createElement('span');
        hourNumber.classList.add('hourNumber');
        hourNumber.textContent = i;
        hourNumber.style.transform = `rotateZ(calc((${i} + 6) * calc(360/12) * 1deg)) translateY(410%) rotateZ(calc((${i} + 6) * calc(360/12) * -1deg))`;
        braunClock.appendChild(hourNumber);
    }
}


function updateClock() {
    const secondHand = document.querySelectorAll("[id='secHand']");
    const minHand = document.querySelectorAll("[id='minHand']");
    const hourHand = document.querySelectorAll("[id='hourHand']");

    const now = new Date();

    const seconds = now.getSeconds();
    const secondDeg = (seconds / 60) * 360;
    secondHand.forEach(element => {
        element.style.transform = `rotate(${secondDeg}deg)`;
    });

    const minutes = now.getMinutes();
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    minHand.forEach(element => {
        if (!(element.parentNode == lemnosClock)) {
            element.style.transform = `rotate(${minuteDeg}deg)`;
        } else {
            document.getElementById('rectangle').style.transform = `rotate(${minuteDeg}deg)`;
        }
    });

    const hours = now.getHours();
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;
    hourHand.forEach(element => {
        element.style.transform = `rotate(${hourDeg}deg)`;
    });

    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    document.getElementById('date').textContent = `${day}/${month + 1}/${year}`;
    document.getElementById('time').textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const apiKey = "b0855f0d337eb10cea885183cb8317e4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kuala%20Lumpur";

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    document.getElementById('cityNameAndTemp').textContent = `${data.name}, ${data.main.temp.toFixed(1)}°C`;
    document.getElementById('weather').textContent = `${data.weather[0].main}, ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} km/h`;
}

function update() {
    updateClock();
    checkWeather();
}

drawMarks();
drawNumbers();
setInterval(update, 1000);
update(); // Initial update
