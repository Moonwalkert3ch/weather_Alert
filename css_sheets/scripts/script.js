const apiKey = "6cd6d54dc57642e697d1850728f6bfdc";
const forecastContainer = document.getElementById("forecast-container");
const alertsContainer = document.getElementById("alerts-container");

// Call the function to initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function () {
    alert("Please say \"OK\", first.");
    const defaultZip = 20001;

    // Check if zipCode is valid before processing
    if (!defaultZip || !/^\d{5}$/.test(defaultZip)) {
        alert("Please enter a valid ZIP code.");
        return;
    }

    // Clear existing map and alerts content
    document.getElementById("forecast-container").innerHTML = "";
    document.getElementById("alerts-container").innerHTML = "";

    // Fetch weather data
    loadForecast(defaultZip);
    loadWeatherAlerts(defaultZip);
});

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

    // Check if zipCode is valid before processing
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
        alert("Please enter a valid ZIP code.");
        return;
    }

    // Clear existing map and alerts content
    document.getElementById("forecast-container").innerHTML = "";
    document.getElementById("alerts-container").innerHTML = "";

    // Fetch weather data
    loadForecast(zipCode);
    loadWeatherAlerts(zipCode);
}

// Function to load the Weather map
function loadForecast(zipCode) {
    const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zipCode}&key=${apiKey}`;

    // Fetch data from the Weatherbit API
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return  response.json();
        })
        .then(forecasts => {
            if (forecasts && forecasts.length > 0) {
                // Display each forecast
                forecasts.forEach((forecast) => {
                    const forecastElement = document.createElement("div");
                    forecastElement.className = "forecast";
        
                    // Create an image element for the weather icon
                    const iconElement = document.createElement("img");
                    iconElement.src = `https://cdn.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`;
                    iconElement.alt = `${forecast.weather.description}`;
        
                    // Add the icon and forecast information to the forecast element
                    forecastElement.appendChild(iconElement);
                    forecastElement.textContent = `${forecast.valid_date}: ${forecast.weather.description}, High: ${forecast.high_temp}°C, Low: ${forecast.low_temp}°C`;
                    forecastContainer.appendChild(forecastElement);
                });
            } else {
                // No forecast
                forecastContainer.textContent = "No weather forecast available.";
            }
        })
        .catch(error => {
            console.error("Error fetching weather forecast:", error);
            forecastContainer.innerHTML = "Failed to load weather forecast.";
        });
}

function loadWeatherAlerts(zipCode) {
    const alertsUrl = `https://api.weatherbit.io/v2.0/alerts?postal_code=${zipCode}&key=${apiKey}`;

    // Fetch data from the Weatherbit API
    fetch(alertsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(alerts => {
            if (alerts && alerts.length > 0) {
                // Display each alert
                alerts.forEach((alert) => {
                    const alertElement = document.createElement("div");

                    alertElement.className = "alert";
                    alertElement.style.borderColor = getBorderColor(alert.severity); // Set border color based on the severity
                    alertElement.textContent = alert;
                    alertElement.textContent = alert.title; // Add the description to the alert element
                    alertsContainer.appendChild(alertElement);
                });
            } else {
                // No alerts
                alertsContainer.textContent = "No weather alerts for the specified area.";
            }
        })
        .catch(error => {
            console.error("Error fetching weather alerts:", error);
            alertsContainer.innerHTML = "Failed to load weather alerts.";
        });
}

// Function to get border color based on severity
function getBorderColor(severity) {
    switch (severity) {
        case "Warning":
            return "#ff0000"; // Red for extreme severity
        case "Watch":
            return "#ffa500"; // Orange for moderate severity
        case "Advisory":
            return "#ffff00"; // Yellow for minor severity
        default:
            return "#808080"; // Gray for unknown severity
    }
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
        title.addEventListener('mouseout', function () {
            // Hide the full description when the mouse leaves the title
            descriptionCell.innerText = ''; // Clear the content
            abbreviatedDescription.style.display = 'inline-block';
        });
    });
});