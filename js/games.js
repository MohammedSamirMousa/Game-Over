import { Ui } from "./ui.js";
import { Details } from "./details.js";

export class Games {
  constructor() {
    this.ui = new Ui();
    this.getGames("mmorpg");

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    });
  }
  async getGames(category = "mmorpg") {
    document.getElementById("Loading").classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    if (api.status >= 200 && api.status < 300) {
      const response = await api.json();
      this.ui.displayGames(response);
      this.start();
      document.getElementById("Loading").classList.add("d-none");
    } else {
      console.log("Error");
    }
  }

  start() {
    document.querySelectorAll(".data").forEach((item) => {
      item.addEventListener("click", () => {
        let id = item.dataset.id;
        this.show(id);
      });
    });
  }

  show(idGames) {
    this.detailsss = new Details(idGames);

    this.Card = document.getElementById("SS");
    this.detail = document.getElementById("detail");
    this.Card.addEventListener("click", () => {
      this.detail.classList.remove("d-none");
      document.getElementById("container").classList.add("d-none");
      document.getElementById("nav").classList.add("d-none");
      document.querySelector(".game-hero").classList.add("d-none");
    });
    this.btnClose = document.getElementById("btnClose");
    this.btnClose.addEventListener("click", () => {
      this.detail.classList.add("d-none");
      document.getElementById("container").classList.remove("d-none");
      document.getElementById("nav").classList.remove("d-none");
      document.querySelector(".game-hero").classList.remove("d-none");
    });
  }
}
