const apiKey = "2ca0d649560a42dfa9b58ae3fed9d1eb";

function searchByZip() {
    const zipCode = document.getElementById("zipcode").value;
    const apiUrl = `https://api.weatherbit.io/v2.0/alerts?postal_code=${zipCode}&key=${apiKey}`;

    // Check if zipCode is valid before processing
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
        alert("Please enter a valid ZIP code.");
        return;
    }

    // Fetch weather data
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Handle the weather alerts data and update the UI
            displayWeatherAlerts(data.alerts);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    const computedStyle = window.getComputedStyle(dropdown);

    dropdown.classList.toggle("show-dropdown");
}
   

// Close the dropdown if the user clicks outside of it
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown");
    const gearContainer = document.querySelector('.gear-container');

    // Check if the clicked element is outside the dropdown or gear container
    if (!gearContainer.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show-dropdown");
    }
});

// Function to display weather alerts
function displayWeatherAlerts(alerts) {
    const alertsContainer = document.getElementById("alerts");

    // Clear previous alerts
    alertsContainer.innerHTML = "";

    if (alerts && alerts.length > 0) {
        // Display each alert
        alerts.forEach((alert) => {
            const alertElement = document.createElement("div");
            alertElement.className = "alert";
            alertElement.textContent = alert.description;
            alertsContainer.appendChild(alertElement);
        });
    } else {
        // No alerts
        alertsContainer.textContent = "No weather alerts for the specified area.";
    }
}