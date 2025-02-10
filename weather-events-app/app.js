const weatherAPIKey = '3b5e9fa34f1f108fb0f6e87f4f1fe418'; // Replace with your OpenWeather API key
const eventsAPIKey = 'JNPECCI4RS2HOSKH5O5F'; // Replace with your Eventbrite API key

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

/*const getEvents = async (location) => {
  const eventsEndpoint = `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&token=${eventsAPIKey}`;

  try {
    const response = await fetch(eventsEndpoint);
    const eventsData = await response.json();
    displayEvents(eventsData.events);
  } catch (error) {
    alert('Error fetching events data');
  }
};*/

const displayWeather = (data) => {
  const weatherInfoDiv = document.getElementById('weather-info');
  if (data.cod === 200) {
    const weatherHTML = `
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
    weatherInfoDiv.innerHTML = weatherHTML;
  } else {
    weatherInfoDiv.innerHTML = '<p>Weather data not available</p>';
  }
};

const displayEvents = (events) => {
  const eventsListDiv = document.getElementById('events-list');
  eventsListDiv.innerHTML = ''; // Clear previous events

  if (events.length === 0) {
    eventsListDiv.innerHTML = '<p>No events found for this location.</p>';
  } else {
    events.forEach(event => {
      const eventHTML = `
        <div>
          <h3>${event.name.text}</h3>
          <p><strong>Date:</strong> ${new Date(event.start.local).toLocaleString()}</p>
          <p><strong>Venue:</strong> ${event.venue.name}</p>
          <a href="${event.url}" target="_blank">More Info</a>
        </div>
        <hr>
      `;
      eventsListDiv.innerHTML += eventHTML;
    });
  }
};

document.getElementById('get-weather-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value;
  if (location) {
    getWeather(location);
    getEvents(location);
  } else {
    alert('Please enter a location.');
  }
});






const getEvents = async (location) => {
                    const eventsEndpoint = `https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&token=${eventsAPIKey}`;
                  
                    try {
                      const response = await fetch(eventsEndpoint);
                      const eventsData = await response.json();
                      
                      // Debugging: Log the structure of the response to check for errors
                      console.log('Eventbrite Response:', eventsData);
                  
                      if (eventsData.events) {
                        displayEvents(eventsData.events);
                      } else {
                        alert('No events data available');
                      }
                    } catch (error) {
                      console.error('Error fetching events data:', error);
                      alert('Error fetching events data');
                    }
                  };