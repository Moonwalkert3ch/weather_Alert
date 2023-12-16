function searchByZip() {
    var zipCode = document.getElementById("zipcode").value;
    // Add your logic for handling the ZIP code search here
    alert("Searching for ZIP code: " + zipCode);
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}
   

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.gear-container')) {
        const dropdown = document.getElementById("dropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
};
