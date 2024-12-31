// Games class to handle fetching, displaying, and managing game data
export class Games {
  // Constructor to initialize the UI and set up event listeners for the menu
  constructor() {
    this.ui = new Ui(); // Create an instance of the UI class
    this.getGames("mmorpg"); // Fetch games of category "mmorpg" by default

    // Set up event listeners for menu item clicks to change the active category
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Remove the active class from the previously active item
        document.querySelector(".menu .active").classList.remove("active");
        // Add the active class to the clicked item
        e.target.classList.add("active");
        // Fetch games based on the selected category
        this.getGames(e.target.dataset.category);
      });
    });
  }

  // Method to fetch games based on the category, defaulting to "mmorpg"
  async getGames(category = "mmorpg") {
    // Show the loading indicator
    document.getElementById("Loading").classList.remove("d-none");

    // Set up the request options for the API call
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712", // API key for authentication
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com", // API host URL
        Accept: "application/json", // Accept JSON response format
        "Content-Type": "application/json", // Specify JSON request content
      },
    };

    // Make the API call to fetch the games based on the selected category
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );

    // Check if the response status is successful (2xx)
    if (api.status >= 200 && api.status < 300) {
      const response = await api.json(); // Parse the response JSON data
      this.ui.displayGames(response); // Pass the games data to the UI class for display
      this.start(); // Start event listeners for the game cards
      document.getElementById("Loading").classList.add("d-none"); // Hide the loading indicator
    } else {
      console.log("Error"); // Log an error if the API request failed
    }
  }

  // Method to set up event listeners for the game cards (each game item)
  start() {
    // Add event listeners for each game item (card)
    document.querySelectorAll(".data").forEach((item) => {
      item.addEventListener("click", () => {
        let id = item.dataset.id; // Get the unique game ID from the data attribute
        this.show(id); // Show the detailed information for the clicked game
      });
    });
  }

  // Method to display the detailed view of a specific game based on its ID
  show(idGames) {
    this.detailsss = new Details(idGames); // Create an instance of the Details class for the game

    // Get references to the game detail card and close button elements
    this.Card = document.getElementById("SS"); // Game card for showing details
    this.detail = document.getElementById("detail"); // Detailed view section

    // Event listener to open the detail view when the game card is clicked
    this.Card.addEventListener("click", () => {
      this.detail.classList.remove("d-none"); // Show the detail view
    });

    // Get reference to the close button and add event listener to close the detail view
    this.btnClose = document.getElementById("btnClose");
    this.btnClose.addEventListener("click", () => {
      this.detail.classList.add("d-none"); // Hide the detail view when the close button is clicked
    });
  }
}
