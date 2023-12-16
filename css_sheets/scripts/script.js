function searchByZip() {
    var zipCode = document.getElementById("zipcode").value;
    // Add your logic for handling the ZIP code search here
    alert("Searching for ZIP code: " + zipCode);
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.gear-container')) {
        var dropdown = document.getElementById("dropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}
