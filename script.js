const braunClock = document.querySelector('.braunClock');
const lemnosClock = document.querySelector('.lemnosClock');
const yamazakiClock = document.querySelector('.yamazakiClock');
const newgateClock = document.querySelector('.newgateClock');
const bankerClock = document.querySelector('.bankerClock');
const clocks = document.querySelectorAll('.clock');

// start at braun clock
var currentClock = 0;
clocks[currentClock].style.display = 'block';

function nextClock() {
    clocks[currentClock].style.display = 'none';
    if (currentClock == clocks.length - 1) {
        currentClock = 0;
    } else {
        currentClock++;
    }
    clocks[currentClock].style.display = `block`;
}

function drawMarks() {
    const braunMarks = braunClock.getElementsByClassName('mark');
    const lemnosMarks = lemnosClock.getElementsByClassName('mark');
    const yamazakiMarks = yamazakiClock.getElementsByClassName('mark');
    const newgateMarks = newgateClock.getElementsByClassName('mark');
    for (var i = 0; i < 60; i++) {
        // braun clock
        braunClock.innerHTML += "<div class='mark'></div>";
        braunMarks[i].style.transform = `rotate(${6 * i}deg)`;

        // lemnos clock
        lemnosClock.innerHTML += "<div class='mark'></div>";
        lemnosMarks[i].style.transform = `rotate(${6 * i}deg)`;

        // yamazaki clock
        yamazakiClock.innerHTML += "<div class='mark'></div>";
        yamazakiMarks[i].style.transform = `rotate(${30 * i}deg`;

        // newgate clock
        newgateClock.innerHTML += "<div class='mark'></div>";
        newgateMarks[i].style.transform = `rotate(${6 * i}deg)`;
    }
}

function drawNumbers() {
    for (var i = 1; i <= 12; i++) {
        // braun clock
        const hourNumber = document.createElement('span');
        hourNumber.classList.add('hourNumber');
        hourNumber.textContent = i;
        hourNumber.style.transform = `rotateZ(calc((${i} + 6) * calc(360/12) * 1deg)) translateY(415%) rotateZ(calc((${i} + 6) * calc(360/12) * -1deg))`;
        braunClock.appendChild(hourNumber);
    }

    for (var i = 1; i <= 12; i++) {
        // newgate clock
        const hourNumber = document.createElement('span');
        hourNumber.classList.add('hourNumber');
        hourNumber.textContent = i;
        hourNumber.style.transform = `rotateZ(calc((${i} + 6) * calc(360/12) * 1deg)) translateY(365%) rotateZ(calc((${i} + 6) * calc(360/12) * -1deg))`;
        newgateClock.appendChild(hourNumber);
    }

    for (var i = 1; i <= 12; i++) {
        // banker clock
        const hourNumber = document.createElement('span');
        hourNumber.classList.add('hourNumber');
        hourNumber.style.transform = `rotate(calc((${i} + 6) * calc(360/12) * 1deg)) translateY(140%)`;
        for (var j = 0; j < 12; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.transform = `translateY(${j * 110}%)`;
            if (j == i - 1) {
                square.style.backgroundColor = `black`;
            }
            hourNumber.appendChild(square);
        }
        bankerClock.appendChild(hourNumber);
    }
}

function showAlignmentLines() {
    clocks.forEach(element => {
        for (var i = 0; i < 30; i++) {
            const line = document.createElement('div');
            line.classList.add('alignmentLine');
            line.style.backgroundColor = (i % 5 == 0) ? `red` : `blue`;
            line.style.transform = `rotate(${i * 6}deg)`;
            element.appendChild(line);
        }
    });
}

function updateClock() {
    const secondHand = document.querySelectorAll(".secHand");
    const minHand = document.querySelectorAll(".minHand");
    const hourHand = document.querySelectorAll(".hourHand");

    const now = new Date();

    const seconds = now.getSeconds();
    const secondDeg = (seconds / 60) * 360;
    secondHand.forEach(element => {
        element.style.transform = `rotate(${secondDeg}deg)`;
    });

    const minutes = now.getMinutes();
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    minHand.forEach(element => {
        element.style.transform = `rotate(${minuteDeg}deg)`;
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
// showAlignmentLines(); // for checking alignment only