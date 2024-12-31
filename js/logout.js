export class Logout {
  constructor() {
    this.logOut = document.getElementById("logOut");
    this.site = document.getElementById("site");
    this.login = document.getElementById("login");

    this.logOut.addEventListener("click", () => {
      this.logoutUser();
    });
  }

  logoutUser() {
    localStorage.clear("user"); // Clear all localStorage data
    this.site.classList.add("d-none");
    this.login.classList.remove("d-none");
  }
}