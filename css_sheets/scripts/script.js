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
