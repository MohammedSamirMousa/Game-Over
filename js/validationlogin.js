export class Valid {
  constructor() {
    this.dataArray = JSON.parse(localStorage.getItem("user"));
    this.login = document.querySelector(".login");
    this.signUp = document.querySelector(".sign-up");
    this.userEmail = document.getElementById("userEmail");
    this.userPass = document.getElementById("userPass");
    this.loginBtn = document.getElementById("loginBtn");
    this.formLogin = document.getElementById("formLogin");
    this.alert1 = document.getElementById("alert1");
    this.site = document.getElementById("site");
    this.signupLink = document.getElementById("signupLink");
    this.allInputs = document.querySelectorAll("#login input");
    this.emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    this.formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValidEmail = this.valid(
        this.userEmail,
        this.emailRegex.test(this.userEmail.value)
      );
      let isValidPass = this.valid(
        this.userPass,
        this.passRegex.test(this.userPass.value)
      );
      if (isValidEmail && isValidPass) {
        this.getData();
      }
    });
    this.userEmail.addEventListener("input", () => {
      this.valid(this.userEmail, this.emailRegex.test(this.userEmail.value));
    });
    this.userPass.addEventListener("input", () => {
      this.valid(this.userPass, this.passRegex.test(this.userPass.value));
    });
    this.signupLink.addEventListener("click", () => {
      this.login.classList.add("d-none");
      this.signUp.classList.remove("d-none");
    });
  }
  getData() {
    if (this.isExist()) {
      this.clear()
      this.login.classList.add("d-none")
      this.site.classList.remove("d-none")
      this.alert1.classList.replace("d-block" , "d-none")
    }else{
      this.alert1.classList.replace("d-none" , "d-block")
    }
  }
  clear() {
    this.userEmail.value = "";
    this.userPass.value = "";
    for (let i = 0; i < this.allInputs.length; ++i) {
      this.allInputs[i].classList.remove("is-valid");
    }
  }
  valid(input, condition) {
    if ((input, condition)) {
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
    return this.dataArray.some(
      (user) =>
        user.email.toLowerCase() === this.userEmail.value.toLowerCase() &&
        user.pass === this.userPass.value
    );
  }
}
