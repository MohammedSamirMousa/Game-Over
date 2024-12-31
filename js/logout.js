// Logout class to handle user logout functionality
export class Logout {
  // Constructor to initialize elements and event listeners
  constructor() {
    this.logOut = document.getElementById("logOut"); // Get the 'logOut' button element
    this.site = document.getElementById("site"); // Get the main site content element
    this.login = document.getElementById("login"); // Get the login screen element

    // Adding an event listener to the logout button
    this.logOut.addEventListener("click", () => {
      this.logoutUser(); // Call logoutUser method when 'logOut' button is clicked
    });
  }

  // Method to handle the actual logout process
  logoutUser() {
    localStorage.clear("user"); // Clear all data from localStorage, effectively logging the user out
    this.site.classList.add("d-none"); // Hide the main site content
    this.login.classList.remove("d-none"); // Show the login screen
  }
}
