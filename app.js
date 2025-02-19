








const weatherAPIKey = '3b5e9fa34f1f108fb0f6e87f4f1fe418';
const eventsAPIKey = 'JNPECCI4RS2HOSKH5O5F';

// Async function to fetch weather data
const getWeather = async (location) => {
  const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}&units=metric`;

  try {
    const response = await fetch(weatherEndpoint);
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    alert('Error fetching weather data');
  }
};

// Async function to fetch events data
const getEvents = async (location) => {
  const eventsEndpoint = `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&token=${eventsAPIKey}`;

  try {
    const response = await fetch(eventsEndpoint);
    const eventsData = await response.json();
    displayEvents(eventsData.events);
  } catch (error) {
    console.error('Error fetching events data:', error);  // Log errors for debugging
    alert('Error fetching events data');
  }
};

// Function to display weather data
const displayWeather = (data) => {
  const weatherInfoDiv = document.getElementById('weather-info');
  if (data.cod === 200) {
    const weatherHTML = `
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Condition: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon" />
    `;
    weatherInfoDiv.innerHTML = weatherHTML;
  } else {
    weatherInfoDiv.innerHTML = '<p>Weather data not available</p>';
  }
};

// Function to display events
const displayEvents = (events) => {
  const eventsListDiv = document.getElementById('events-list');
  eventsListDiv.innerHTML = ''; // Clear previous events

  if (events.length === 0) {
    eventsListDiv.innerHTML = '<p>No events found for this location.</p>';
  } else {
    events.forEach(event => {
      const eventHTML = `
        <div class="event-card">
          <h3>${event.name.text}</h3>
          <p><strong>Date:</strong> ${new Date(event.start.local).toLocaleString()}</p>
          <p><strong>Venue:</strong> ${event.venue ? event.venue.name : 'N/A'}</p>
          <a href="${event.url}" target="_blank">More Info</a>
        </div>
      `;
      eventsListDiv.innerHTML += eventHTML;
    });
  }
};

// Event listener for button click
document.getElementById('get-weather-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value;
  if (location) {
    getWeather(location);
    getEvents(location);
    localStorage.setItem('lastLocation', location); // Save the location
  } else {
    alert('Please enter a location.');
  }
});

// On page load, check if there's a saved location
window.onload = () => {
  const lastLocation = localStorage.getItem('lastLocation');
  if (lastLocation) {
    document.getElementById('location-input').value = lastLocation;
    getWeather(lastLocation);
    getEvents(lastLocation);
  }
};