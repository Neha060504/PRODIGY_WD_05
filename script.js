// script.js
const locationInput = document.getElementById('locationInput');
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const useCurrentLocationBtn = document.getElementById('useCurrentLocationBtn');
const weatherInfo = document.getElementById('weatherInfo');

// Function to fetch weather data from API based on user input
function fetchWeather(location) {
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not available for this location');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      weatherInfo.textContent = error.message;
    });
}

// Function to display weather information
function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;

  weatherInfo.innerHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Weather: ${weatherDescription}</p>
  `;
}

// Event listeners
fetchWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value;
  if (location.trim() !== '') {
    fetchWeather(location);
  }
});

useCurrentLocationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeather(`${latitude},${longitude}`);
    }, () => {
      weatherInfo.textContent = 'Unable to retrieve your location';
    });
  } else {
    weatherInfo.textContent = 'Geolocation is not supported by your browser';
  }
});
// Function to fetch weather data from API based on user's location
function fetchWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('37°C');
          }
          return response.json();
        })
        .then(data => {
          displayWeather(data);
        })
        .catch(error => {
          weatherInfo.textContent = error.message;
        });
    }, () => {
      weatherInfo.textContent = 'Unable to retrieve your location';
    });
  } else {
    weatherInfo.textContent = 'Geolocation is not supported by your browser';
  }
}

// Event listener for "Use Current Location" button
useCurrentLocationBtn.addEventListener('click', fetchWeatherByLocation);

