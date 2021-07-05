import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Star } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import * as timeago from "timeago.js";
import Search from "./components/Search";
import Register from "./components/Register";
import Login from "./components/Login";

import "./App.css";

const libraries = ["places"];

function App() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [center, setCenter] = useState({
    lat: 40.608768,
    lng: 14.98303,
  });
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(2);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
    libraries: libraries,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios("/pins");

        if (res) setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating: value,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    try {
      const res = await axios.post("/pins", newPin);
      if (res) {
        setPins([...pins, res.data]);
        setNewPlace(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setCenter({ lat: lat, lng: long });
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleAddClick = useCallback((e) => {
    setNewPlace({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }, []);

  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    disableDoubleClickZoom: true,
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";

  return (
    <>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
        onDblClick={(e) => {
          if (currentUser) {
            handleAddClick(e);
          } else {
            setShowRegister(true);
          }
        }}
        options={options}
        onLoad={onMapLoad}
      >
        {pins.map((pin) => {
          const {
            _id: id,
            createdAt,
            description,
            lat,
            long: lng,
            rating,
            title,
            username,
          } = pin;
          return (
            <div key={id}>
              <Marker
                position={{ lat, lng }}
                icon={{
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                  url:
                    currentUser === username
                      ? `/marker-15.svg`
                      : `/marker-16.svg`,
                }}
                onClick={() => handleMarkerClick(id, lat, lng)}
              />
              {id === currentPlaceId && (
                <InfoWindow
                  position={{ lat, lng }}
                  closeOnClick={false}
                  onCloseClick={() => {
                    setCurrentPlaceId(null);
                  }}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{title}</h4>
                    <label>Review</label>
                    <p className="desc">{description}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array.from(Array(rating), (_, i) => (
                        <Star key={i} className="star" />
                      ))}
                    </div>
                    <label>Info</label>
                    <span className="username">
                      created by <b>{username}</b>
                    </span>
                    <span className="date">{timeago.format(createdAt)}</span>
                  </div>
                </InfoWindow>
              )}
            </div>
          );
        })}
        {newPlace ? (
          <InfoWindow
            position={{ lat: newPlace.lat, lng: newPlace.lng }}
            closeButton={true}
            closeOnClick={false}
            onCloseClick={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Titolo</label>
                <input
                  placeholder="Inserisci un titolo"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Recensione</label>
                <textarea
                  placeholder="Scrivi qualcosa su questo luogo"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Voto</label>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <button className="submitButton" type="submit">
                  Invia
                </button>
              </form>
            </div>
          </InfoWindow>
        ) : null}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="button-container">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && (
          <Register
            setShowRegister={setShowRegister}
            localStorage={localStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            localStorage={localStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </GoogleMap>
    </>
  );
}

export default App;
