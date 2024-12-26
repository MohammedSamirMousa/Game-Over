import { Ui } from "./ui.js";
export class Details {
  constructor(id) {
    this.uiss = new Ui();
    this.getApiDetails(id);
  }
  async getApiDetails(idGames) {
    document.getElementById("Loading").classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b38c306ecamsh25ff694e1184898p1ee807jsn3717d0a4ec36",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let url = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
      options
    );
    if (url.status >= 200 && url.status < 300) {
      let urlResponse = await url.json();
      this.uiss.displayGamesDetail(urlResponse);
      document.getElementById("Loading").classList.add("d-none");
    } else {
      console.log("Error");
    }
  }
}
