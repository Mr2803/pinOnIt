# PinOnIt

This project represents a small MERN APP which I called **PinOnIt**.
On the client side, the user displays a map on which he can insert, if registered, a pin and write a specific review of a place he has visited. The pins of the logged in user have a different color than the other pins.
The user can search for a specific place from the searchbar (created with the help of google bees) and will be returned to the chosen place.


## Server Side
As for the server instead. You will need to create a new access for the Mongo db.
Create an env file inside the backend folder using the environment variable `MONGO_URL` and assigned your mongodb+srv value <br/>

mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster0.zukns.mongodb.net/<YOUR_DB>?retryWrites=true&w=majority


## API Keys Client

For this demo to work, please create a Google Map API Key (with google platform), and ensure that the two services below are enabled... otherwise it won't work! This API key must be in the environment variable in frontend folder .env file with name `REACT_APP_GOOGLE_MAP`.

- Maps JavaScript API
- Places API
- Geocoding API


## Preview
![pinOnIt](https://user-images.githubusercontent.com/55139220/124463430-2b38b600-dd93-11eb-86a1-6538d1ee0ad9.JPG)
