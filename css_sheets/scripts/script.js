function searchByZip() {
    const zipCode = document.getElementById("zipcode").value;
    // Add your logic for handling the ZIP code search here
    alert("Searching for ZIP code: " + zipCode);
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    const computedStyle = window.getComputedStyle(dropdown);

    if (computedStyle.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}
   

// Close the dropdown if the user clicks outside of it
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown");
    if (!event.target.closest('.gear-container') && !event.target.closest('.dropdown')) {
        dropdown.classList.remove("show-dropdown");
    }
});
