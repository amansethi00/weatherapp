import "./App.css";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
  faSearchLocation,
  faWind,
  faTint,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import {RingLoader} from "react-spinners";

// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
function App() {
  const [userInput, setuserInput] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [weather, setWeather] = useState("");
  const [JSON, setJSON] = useState({});
  const [bgImage, setbgImage] = useState("");

  function inputHandler(e) {
    setuserInput(e.target.value);
    // console.log(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && userInput !== "") {
      setShowLoader(true);
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          userInput +
          "&APPID=0ec25607079c0340148f363221b79c62"
      )
        .then((response) => response.json())
        .then(
          (json) => {
            console.log(json);
            if (json.cod !== "404") {
              setJSON({
                icon:
                  "https://openweathermap.org/img/wn/" +
                  json.weather[0].icon +
                  "@2x.png",
                temp: json.main.temp,
                main: json.weather[0].main,
                humidity: json.main.humidity,
                wind: json.wind.speed,
                country: json.sys.country,
              });
              setWeather(parseInt(json.main.temp) - 273);
              setbgImage(json.weather[0].main);
              console.log(bgImage);
            } else {
              alert("Please enter a valid city");
            }
            setShowLoader(false);
          },
          (error) => {
            setShowLoader(false);
            alert(`there is error ${error}`);
          }
        );
    }
  }
  return (
    <div className="App">
      <div className="head-container">
        <h1 className="head-text">Weather App</h1>
        <div className="search-box">
          <FontAwesomeIcon icon={faSearchLocation} />
          <input
            type="text"
            placeholder="Enter City"
            className="input"
            onChange={inputHandler}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
      </div>
      <div className="loader">
        <RingLoader loading={showLoader} color="orange"></RingLoader>
      </div>

      {weather !== "" ? (
        <>
          <div className="body-container">
            <div className="fetchedData">
              <div className="body-head">
                <img src={JSON.icon} alt="weather logo" className="icon"></img>
                <span className="icon-info">{JSON.main}</span>
              </div>
              <div className="body-content">
                <span className="temperature">{weather}°C</span>

                <span>
                  <FontAwesomeIcon
                    icon={faWind}
                    style={{marginRight: "0.5rem"}}
                  ></FontAwesomeIcon>{" "}
                  {JSON.wind}km/h
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faTint}
                    style={{marginRight: "1rem"}}
                  />
                  {JSON.humidity}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faFlag}
                    style={{marginRight: "0.8rem"}}
                  />
                  {JSON.country}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
