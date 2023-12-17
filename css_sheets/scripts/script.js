function searchByZip() {
    const zipCode = document.getElementById("zipcode").value;
    // Add your logic for handling the ZIP code search here
    alert("Searching for ZIP code: " + zipCode);
}

.dropdown {
    display: none;
}

.show-dropdown {
    display: block;
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.classlist.toggle("show-description");
}
   

// Close the dropdown if the user clicks outside of it
// window.onclick = function (event) {
//     if (!event.target.matches('.gear-container')) {
//         const dropdown = document.getElementById("dropdown");
//         const computedStyle = window.getComputedStyle(dropdown);
//
//         if (computedStyle.display === "block") {
//             dropdown.style.display = "none";
//         }
//     }
// };

document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown");
    if (!event.target.closest('.gear-container') && !event.target.closest('.dropdown')) {
        dropdown.classList.remove("show-dropdown");
    }
});
