const apiKey = "6cd6d54dc57642e697d1850728f6bfdc";
const forecastContainer = document.getElementById("forecast-container");
const alertsContainer = document.getElementById("alerts-container");

// Call the function to initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const defaultZip = 20001;
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
    const tableBody = alertsContainer.querySelector("tbody");
    tableBody.innerHTML = "";

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
            const responsibilities = response.json()
            console.log(responsibilities);
            return  responsibilities;
        })
        .then(data => {
            if (data && data.length > 0) {
                // Display each forecast
                data.forEach((forecast) => {
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
            const responsibilities = response.json()
            console.log(responsibilities);
            return  responsibilities;
        })
        .then(data => {
            if (data && data.length > 0) {
                // Display each alert
                data.forEach((alert) => {
                    const tableRow = document.createElement("tr");

                    // Create an image cell for the weather icon
                    const iconCell = document.createElement("td");
                    const iconElement = document.createElement("img");
                    iconElement.src = `https://cdn.weatherbit.io/static/img/icons/${alert.icon}.png`;
                    iconElement.alt = "Weather Icon";
                    iconCell.appendChild(iconElement);

                    // Create a description cell for the alert description
                    const descriptionCell = document.createElement("td");
                    descriptionCell.className = "alert-description";
                    const alertTitle = document.createElement("span");
                    alertTitle.classname = "abbreviated-description";
                    alertTitle.textContent = alert.title;
                    const alertDescription = document.createElement("span");
                    alertDescription.classname = "full-description";
                    alertDescription.textContent = alert.description;
                    descriptionCell.appendChild(alertTitle);
                    descriptionCell.appendChild(alertDescription);

                    // Add cells to the table row
                    tableRow.appendChild(iconCell);
                    tableRow.appendChild(descriptionCell);

                    // Add the table row to the alerts container
                    alertsContainer.querySelector("tbody").appendChild(tableRow);
                });
            } else {
                // No alerts
                const tableRow = document.createElement("tr");
                const noAlertsCell = document.createElement("td");
                noAlertsCell.textContent = "No weather alerts for the specified area.";
                tableRow.appendChild(noAlertsCell);
                alertsContainer.querySelector("tbody").appendChild(tableRow);
            }
        })
        .catch(error => {
            console.error("Error fetching weather alerts:", error);
            alertsContainer.innerHTML = "Failed to load weather alerts.";
        });
}