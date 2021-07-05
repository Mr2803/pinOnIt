# Google Maps in React Demo

This project represents a small MERN APP which I called **PinOnIt**.
On the client side, the user displays a map on which he can insert, if registered, a pin and write a specific review of a place he has visited. The pins of the logged in user have a different color than the other pins.
The user can search for a specific place from the searchbar (created with the help of google bees) and will be returned to the chosen place.

## API Keys

For this demo to work, please create a Google Map API Key (with google platform), and ensure that the two services below are enabled... otherwise it won't work! This API key must be in the environment variable `REACT_APP_GOOGLE_MAP`.

- Maps JavaScript API
- Places API
- Geocoding API
