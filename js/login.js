// Valid class to handle user login validation
export class Valid {
  // Constructor to initialize elements, events, and set up validation logic
  constructor() {
    // Retrieve data from localStorage or initialize as an empty array
    this.dataArray = JSON.parse(localStorage.getItem("user")) || [];

    // Get references to DOM elements
    this.login = document.querySelector(".login"); // Login form container
    this.signUp = document.querySelector(".sign-up"); // Sign-up form container
    this.userEmail = document.getElementById("userEmail"); // Email input field
    this.userPass = document.getElementById("userPass"); // Password input field
    this.loginBtn = document.getElementById("loginBtn"); // Login button
    this.formLogin = document.getElementById("formLogin"); // Login form
    this.alert1 = document.getElementById("alert1"); // Alert message for invalid credentials
    this.site = document.getElementById("site"); // Main site content (to show after successful login)
    this.signupLink = document.getElementById("signupLink"); // Link to the sign-up form
    this.allInputs = document.querySelectorAll("#login input"); // All input fields in login form

    // Regular expressions for validating email and password
    this.emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Event listener for form submission
    this.formLogin.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      let isValidEmail = this.valid(
        this.userEmail,
        this.emailRegex.test(this.userEmail.value) // Validate email format
      );
      let isValidPass = this.valid(
        this.userPass,
        this.passRegex.test(this.userPass.value) // Validate password format
      );
      // If both email and password are valid, get the user data
      if (isValidEmail && isValidPass) {
        this.getData();
      }
    });

    // Event listeners for real-time validation of inputs
    this.userEmail.addEventListener("input", () => {
      this.valid(this.userEmail, this.emailRegex.test(this.userEmail.value));
    });
    this.userPass.addEventListener("input", () => {
      this.valid(this.userPass, this.passRegex.test(this.userPass.value));
    });

    // Event listener for navigating to the sign-up form
    this.signupLink.addEventListener("click", () => {
      this.login.classList.add("d-none"); // Hide the login form
      this.signUp.classList.remove("d-none"); // Show the sign-up form
    });
  }

  // Method to validate and check if the user exists
  getData() {
    if (this.isExist()) {
      // Check if the user exists in the dataArray
      this.clear(); // Clear the form fields
      this.login.classList.add("d-none"); // Hide the login form
      this.site.classList.remove("d-none"); // Show the main site content
      this.alert1.classList.replace("d-block", "d-none"); // Hide the alert
    } else {
      this.alert1.classList.replace("d-none", "d-block"); // Show alert if credentials are incorrect
    }
  }

  // Method to clear form fields and reset input styles
  clear() {
    this.userEmail.value = ""; // Clear the email input
    this.userPass.value = ""; // Clear the password input
    for (let i = 0; i < this.allInputs.length; ++i) {
      this.allInputs[i].classList.remove("is-valid"); // Remove valid input styles
    }
  }

  // Method to handle input validation and styling
  valid(input, condition) {
    if (condition) {
      input.classList.add("is-valid"); // Add valid input styles
      input.classList.remove("is-invalid"); // Remove invalid input styles
      return true;
    } else {
      input.classList.add("is-invalid"); // Add invalid input styles
      input.classList.remove("is-valid"); // Remove valid input styles
      return false;
    }
  }

  // Method to check if the entered email and password match any user in dataArray
  isExist() {
    return this.dataArray.some(
      (user) =>
        user.email.toLowerCase() === this.userEmail.value.toLowerCase() &&
        user.pass.toLowerCase() === this.userPass.value.toLowerCase()
    );
  }
}
