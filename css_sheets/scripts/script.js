const apiKey = "2ca0d649560a42dfa9b58ae3fed9d1eb";
const mapContainer = document.getElementById("map-container");
const alertsContainer = document.getElementById("alerts-container");

// Call the function to initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadWeatherMap(20001, mapContainer);
    fetchWeatherAlerts(20001, alertsContainer)
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
    document.getElementById("map-container").innerHTML = "";
    document.getElementById("alerts-container").innerHTML = "";

    // Fetch weather data
    loadWeatherMap(zipCode, mapContainer);
    fetchWeatherAlerts(zipCode, alertsContainer);
}

// Function to load the Weather map
function loadWeatherMap(zipCode, mapContainer) {
    const mapUrl = `https://api.weatherbit.io/v2.0/current?postal_code=${zipCode}&key=${apiKey}`;

    // Fetch data from the Weatherbit API
    fetch(mapUrl)
        .then(response => response.json())
        .then(data => {
            // Extract latitude and longitude from the response data
            const latitude = data.data[0].lat;
            const longitude = data.data[0].lon;
            const mapTileUrl = `https://api.weatherbit.io/v2.0/singleband/fullsat/latest/5/${latitude}/${longitude}.png?&key=${apiKey}`;

            // Create an image element for the map
            const mapImage = document.createElement("img");
            mapImage.src = mapTileUrl;
            mapImage.alt = "Weather Map";
            mapContainer.appendChild(mapImage);
        })
        .catch(error => {
            console.error("Error fetching weather map data:", error);
            mapContainer.innerHTML = "Failed to load weather map.";
        });
}

function fetchWeatherAlerts(zipCode, alertsContainer) {
    const alertsUrl = `https://api.weatherbit.io/v2.0/alerts?postal_code=${zipCode}&key=${apiKey}`;

    // Fetch data from the Weatherbit API
    fetch(alertsUrl)
        .then(response => response.json())
        .then(data => {
            if (alerts && alerts.length > 0) {
                // Display each alert
                alerts.forEach((alert) => {
                    const alertElement = document.createElement("div");

                    alertElement.className = "alert";

                    // Create an image element for the weather icon
                    const iconElement = document.createElement("img");

                    iconElement.src = `https://www.weatherbit.io/static/img/icons/${alert.icon}.png`;
                    iconElement.alt = "Weather Icon";

                    // Set border color based on the severity
                    alertElement.style.borderColor = getBorderColor(alert.severity);

                    // Add the icon and description to the alert element
                    alertElement.appendChild(iconElement);
                    alertElement.textContent = alert.description;
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

// Function to display weather alerts
function displayWeatherAlerts(alerts, alertsContainer) {
    // Clear previous alerts
    alertsContainer.innerHTML = "";

    if (alerts && alerts.length > 0) {
        // Display each alert
        alerts.forEach((alert) => {
            const alertElement = document.createElement("div");

            alertElement.className = "alert";

            // Create an image element for the weather icon
            const iconElement = document.createElement("img");

            iconElement.src = `https://www.weatherbit.io/static/img/icons/${alert.icon}.png`;
            iconElement.alt = "Weather Icon";

            // Set border color based on the severity
            alertElement.style.borderColor = getBorderColor(alert.severity);

            // Add the icon and description to the alert element
            alertElement.appendChild(iconElement);
            alertElement.textContent = alert.description;
            alertsContainer.appendChild(alertElement);
        });
    } else {
        // No alerts
        alertsContainer.textContent = "No weather alerts for the specified area.";
    }
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