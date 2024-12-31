export class Signup {
  constructor() {
    // Select DOM elements for login and signup sections
    this.login = document.querySelector(".login");
    this.signUp = document.querySelector(".sign-up");

    // Select input fields for the signup form
    this.userName = document.getElementById("userName");
    this.emailSignup = document.getElementById("emailSignup");
    this.passSignup = document.getElementById("passSignup");
    this.rePassSignup = document.getElementById("rePassSignup");

    // Select the form and signup button
    this.formSignup = document.getElementById("formSignup");
    this.signupBtn = document.getElementById("signupBtn");

    // Select the alert element for showing error messages
    this.alert2 = document.getElementById("alert2");

    // Select the login link for switching between login and signup forms
    this.loginLink = document.getElementById("loginLink");

    // Select all input elements within the signup form
    this.allInputs = document.querySelectorAll(".sign-up input");

    // Regular expressions for validating name, email, and password formats
    this.nameRegex = /^[a-zA0-Z9 ]{3,}$/;
    this.emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Array to store registered users' data from localStorage
    this.dataSignup = [];

    // Check if there's any user data stored in localStorage
    if (localStorage.getItem("user")) {
      this.dataSignup = JSON.parse(localStorage.getItem("user"));
      console.log(this.dataSignup); // For debugging
    }

    // Add an event listener to handle form submission
    this.formSignup.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      // Validate the inputs using the valid() method
      let isValidName = this.valid(
        this.userName,
        this.nameRegex.test(this.userName.value)
      );
      let isValidEmail = this.valid(
        this.emailSignup,
        this.emailRegex.test(this.emailSignup.value)
      );
      let isValidPass = this.valid(
        this.passSignup,
        this.passRegex.test(this.passSignup.value)
      );
      let isValidRePass = this.valid(
        this.rePassSignup,
        this.passSignup.value === this.rePassSignup.value
      );

      // If all validations pass, proceed to save user data
      if (isValidName && isValidEmail && isValidPass && isValidRePass) {
        this.getData();
      }
    });

    // Add event listeners for real-time input validation
    this.userName.addEventListener("input", () => {
      this.valid(this.userName, this.nameRegex.test(this.userName.value));
    });
    this.emailSignup.addEventListener("input", () => {
      this.valid(
        this.emailSignup,
        this.emailRegex.test(this.emailSignup.value)
      );
    });
    this.passSignup.addEventListener("input", () => {
      this.valid(this.passSignup, this.passRegex.test(this.passSignup.value));
    });
    this.rePassSignup.addEventListener("input", () => {
      this.valid(
        this.rePassSignup,
        this.passSignup.value === this.rePassSignup.value
      );
    });

    // Add event listener to switch to the login form
    this.loginLink.addEventListener("click", () => {
      this.login.classList.remove("d-none"); // Show the login form
      this.signUp.classList.add("d-none"); // Hide the signup form
    });
  }

  // Method to process and store the user data if valid
  getData() {
    if (this.isExist()) {
      // If user already exists, show an error alert
      this.alert2.classList.replace("d-none", "d-block");
    } else {
      // Create a new user object and push it to the dataSignup array
      let userSignup = {
        nameSignup: this.userName.value,
        email: this.emailSignup.value,
        pass: this.passSignup.value,
        rePass: this.rePassSignup.value,
      };
      this.dataSignup.push(userSignup);

      // Clear form inputs after successful signup
      this.clear();

      // Hide the alert message after successful signup
      this.alert2.classList.replace("d-block", "d-none");

      // Save the user data to localStorage
      localStorage.setItem("user", JSON.stringify(this.dataSignup));

      // Reload the page to reflect the changes
      window.location.reload();
    }
  }

  // Method to clear the input fields and reset the form
  clear() {
    this.userName.value = "";
    this.emailSignup.value = "";
    this.passSignup.value = "";
    this.rePassSignup.value = "";

    // Remove 'is-valid' class from all input fields
    for (let i = 0; i < this.allInputs.length; ++i) {
      this.allInputs[i].classList.remove("is-valid");
    }
  }

  // Method to add valid or invalid classes based on the validation result
  valid(input, condition) {
    if (condition) {
      // If valid, add 'is-valid' class and remove 'is-invalid' class
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      return true;
    } else {
      // If invalid, add 'is-invalid' class and remove 'is-valid' class
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }
  }

  // Method to check if the email or password already exists
  isExist() {
    return this.dataSignup.some(
      (user) =>
        user.email.toLowerCase() === this.emailSignup.value.toLowerCase() || // Check if email exists
        user.pass.toLowerCase() === this.passSignup.value.toLowerCase() // Check if password exists
    );
  }
}
