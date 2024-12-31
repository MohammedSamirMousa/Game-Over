// Details class to handle fetching and displaying the details of a specific game
import { Ui } from "./ui.js";

export class Details {
  // Constructor to initialize the UI and fetch the game details by its ID
  constructor(id) {
    this.uiss = new Ui(); // Create an instance of the Ui class to display game details
    this.getApiDetails(id); // Fetch the game details from the API using the provided game ID
  }

  // Method to fetch the game details from the API based on the game ID
  async getApiDetails(idGames) {
    // Show the loading indicator while the API request is being processed
    document.getElementById("Loading").classList.remove("d-none");

    // Set up the request options with headers for the API call
    const options = {
      method: "GET", // HTTP GET request method
      headers: {
        "x-rapidapi-key": "b38c306ecamsh25ff694e1184898p1ee807jsn3717d0a4ec36", // API key for authentication
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com", // API host URL
      },
    };

    // Fetch the game details from the API using the provided game ID
    let url = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
      options
    );

    // Check if the API response status is successful (2xx)
    if (url.status >= 200 && url.status < 300) {
      // Parse the JSON response from the API
      let urlResponse = await url.json();
      // Pass the game details to the Ui class to display the game detail view
      this.uiss.displayGamesDetail(urlResponse);
      // Hide the loading indicator after the game details are successfully fetched
      document.getElementById("Loading").classList.add("d-none");
    } else {
      console.log("Error"); // Log an error if the API request fails
    }
  }
}
