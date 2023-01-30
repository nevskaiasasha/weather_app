// const API_KEY = "2b5d4786fc4292f9178411ecfa14f022";
let cityStorage = [];
const previouslySearchedEl = document.querySelector('.search-history');
const inputEl = document.querySelector('.input-box');
const citySearchBtn = document.querySelector('.show');
const invalidSearchMessageEl = document.querySelector(
  '.invalid-search-message',
);
let addCity;
let showWeather;
let showCity;
const { ymaps } = window;

function initialisation() {
  if (localStorage.getItem('cityName')) {
    cityStorage = JSON.parse(localStorage.getItem('cityName'));
  }
  showCity();
  showWeather(document.querySelector('#container'), '');
  return cityStorage;
}

async function getLocation(city) {
  if (city === '') {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    const json = await response.json();
    return fetch(
      // eslint-disable-next-line max-len
      `https://api.openweathermap.org/data/2.5/weather?lat=${json.latitude}&lon=${json.longitude}&units=metric&appid=2b5d4786fc4292f9178411ecfa14f022`,
    );
  }
  return fetch(
    // eslint-disable-next-line max-len
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2b5d4786fc4292f9178411ecfa14f022`,
  );
}

showWeather = async (e, city) => {
  const respWeather = await getLocation(city);
  const json = await respWeather.json();

  if (!respWeather.ok) {
    invalidSearchMessageEl.textContent = 'Please try another city';
    return;
  }
  invalidSearchMessageEl.textContent = '';

  e.innerHTML = `<h1>${json.name}</h1><h2>${Math.round(
    json.main.temp,
  )}&deg;</h2>
    <img alt="weather-icon" src="http://openweathermap.org/img/wn/${
  json.weather[0].icon
}@2x.png" class="center">`;

  addCity(json.name);

  document.getElementById('map').innerHTML = '';

  function createMap() {
    new ymaps.Map('map', {
      center: [json.coord.lat, json.coord.lon],
      zoom: 8,
    });
  }
  ymaps.ready(createMap);
};

citySearchBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  const citySearchInput = inputEl.value.trim();
  if (citySearchInput === '') {
    invalidSearchMessageEl.textContent = 'Please enter a city!';
  } else {
    showWeather(document.querySelector('#container'), citySearchInput);
  }
});

addCity = (citySearchInput) => {
  if (!cityStorage.includes(citySearchInput)) {
    while (cityStorage.length > 9) {
      cityStorage.pop();
    }
    cityStorage.unshift(citySearchInput);
    localStorage.setItem('cityName', JSON.stringify(cityStorage));
  }
  showCity();
};

showCity = () => {
  if (previouslySearchedEl) {
    previouslySearchedEl.textContent = '';
  }
  cityStorage.forEach((city) => {
    const cityButton = document.createElement('button');
    cityButton.setAttribute('class', 'city-button');
    cityButton.textContent = city;
    previouslySearchedEl.appendChild(cityButton);
    cityButton.addEventListener('click', () => {
      showWeather(document.querySelector('#container'), city);
    });
  });
};

initialisation();
