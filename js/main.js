// Importing the necessary classes from external files
import { Games } from "./games.js";       // Importing the Games class to manage game-related functionality
import { Valid } from "./login.js";        // Importing the Valid class to handle login validation
import { Signup } from "./signup.js";     // Importing the Signup class to handle signup functionality
import { Logout } from "./logout.js";     // Importing the Logout class to handle user logout functionality

// Creating new instances of each class to initialize them and activate their functionality
new Games();                            // Instantiate the Games class to enable the game-related features
new Valid();                            // Instantiate the Valid class to enable the login validation
new Signup();                           // Instantiate the Signup class to enable the signup functionality
new Logout();                           // Instantiate the Logout class to enable the logout functionality
