function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    const computedStyle = window.getComputedStyle(dropdown);

    if (computedStyle.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function searchByZip() {
    const zipCode = document.getElementById("zipcode").value;
    const apiKey = '6f3eb8eb9a573b50f188798f9ab3ce7f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;


    // Check if zipCode is valid before processing
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
        alert("Please enter a valid ZIP code.");
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeather(weatherData) {
    const temperatureCelsius = weatherData.main.temp;
    const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    const description = weatherData.weather[0].description;

    // Example: Display the temperature and description in the console
    console.log(`Current Temperature: ${temperatureFahrenheit.toFixed(2)}°F`);
    console.log(`Description: ${description}`);

    // Update the DOM elements with the weather information as needed
    // For example, you can update a div with id="weather-info"
    const weatherInfoElement = document.getElementById("weather-info");
    weatherInfoElement.innerHTML = `Current Temperature: ${temperatureFahrenheit.toFixed(2)}°F, Weather Description: ${description}`;

    // Display the 7-day weather forecast
    displayWeatherForecast(weatherData);
}

function displayWeatherForecast(weatherData) {
    // Check if the forecast element exists
    const forecastElement = document.getElementById("forecast");
    if (!forecastElement) {
        console.error("Forecast element not found");
        return;
    }

    // Check if weather data contains coordinates
    if (!weatherData.coord || !weatherData.coord.lat || !weatherData.coord.lon) {
        console.error("Invalid weather data for forecast");
        return;
    }

    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = '6f3eb8eb9a573b50f188798f9ab3ce7f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${apiKey}&units=metric`;

    // Make a GET request to the OpenWeatherMap API for 7-day forecast
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the DOM with the forecast information
            displayForecastData(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayForecastData(forecastData) {
    // Example: Update the DOM with forecast information
    const forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = '<h3>7-DAY WEATHER FORECAST</h3>';

    // Create a container div to hold forecast items
    const forecastContainer = document.createElement("div");

    // Loop through forecast data and create list items with lines
    forecastData.list.forEach(item => {
        const timestamp = item.dt * 1000; // Convert seconds to milliseconds
        const date = new Date(timestamp);
        const temperatureCelsius = item.main.temp;
        const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;

        // Create a list item for each forecast entry
        const listItem = document.createElement("div");
        listItem.innerHTML = `<p>${date.toDateString()} - ${temperatureCelsius}°C / ${temperatureFahrenheit.toFixed(2)}°F</p>`;

        // Append a horizontal line between forecast entries
        const line = document.createElement("hr");
        listItem.appendChild(line);

        // Append the list item to the forecast container
        forecastContainer.appendChild(listItem);
    });

    // Append the forecast container to the forecast element
    forecastElement.appendChild(forecastContainer);
}

document.addEventListener('DOMContentLoaded', function () {
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(alert => {
        const title = alert.querySelector('.alert-title');
        const abbreviatedDescription = alert.querySelector('.abbreviated-description');
        const fullDescription = alert.getAttribute('data-full-description');
        const descriptionCell = alert.querySelector('.alert-description');

        title.addEventListener('mouseover', function () {
            // Display the full description on hover
            descriptionCell.innerText = fullDescription;
            abbreviatedDescription.style.display = 'none';
        });

        title.addEventListener('mouseout', function () {
            // Hide the full description when the mouse leaves the title
            descriptionCell.innerText = ''; // Clear the content
            abbreviatedDescription.style.display = 'inline-block';
        });
    });
});
