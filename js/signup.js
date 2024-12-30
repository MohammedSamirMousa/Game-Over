export class Signup {
  constructor() {
    this.login = document.querySelector(".login");
    this.signUp = document.querySelector(".sign-up");
    this.userName = document.getElementById("userName");
    this.emailSignup = document.getElementById("emailSignup");
    this.passSignup = document.getElementById("passSignup");
    this.rePassSignup = document.getElementById("rePassSignup");
    this.formSignup = document.getElementById("formSignup");
    this.signupBtn = document.getElementById("signupBtn");
    this.alert2 = document.getElementById("alert2");
    this.loginLink = document.getElementById("loginLink");
    this.allInputs = document.querySelectorAll(".sign-up input");
    this.nameRegex = /^[a-zA0-Z9 ]{3,}$/;
    this.emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    this.dataSignup = [];
    if (localStorage.getItem("user")) {
      this.dataSignup = JSON.parse(localStorage.getItem("user"));
      console.log(this.dataSignup);
    }

    this.formSignup.addEventListener("submit", (e) => {
      e.preventDefault();
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
      if (isValidName && isValidEmail && isValidPass && isValidRePass) {
        this.getData();
      }
    });

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
    this.loginLink.addEventListener("click", () => {
      this.login.classList.remove("d-none");
      this.signUp.classList.add("d-none");
    });
  }

  getData() {
    if (this.isExist()) {
      this.alert2.classList.replace("d-none", "d-block");
    } else {
      let userSignup = {
        nameSignup: this.userName.value,
        email: this.emailSignup.value,
        pass: this.passSignup.value,
        rePass: this.rePassSignup.value,
      };
      this.dataSignup.push(userSignup);
      this.clear();
      this.alert2.classList.replace("d-block", "d-none");
      localStorage.setItem("user", JSON.stringify(this.dataSignup));
      window.location.reload();
    }
  }

  clear() {
    this.userName.value = "";
    this.emailSignup.value = "";
    this.passSignup.value = "";
    this.rePassSignup.value = "";
    for (let i = 0; i < this.allInputs.length; ++i) {
      this.allInputs[i].classList.remove("is-valid");
    }
  }
  valid(input, condition) {
    if (condition) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }
  }

  isExist() {
    for (let i = 0; i < this.dataSignup.length; ++i) {
      if (
        this.dataSignup[i].email.toLowerCase() === this.emailSignup.value.toLowerCase() &&
        this.dataSignup[i].rePass.toLowerCase() === this.passSignup.value.toLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
