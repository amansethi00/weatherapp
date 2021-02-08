import './App.css';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import {RingLoader,PulseLoader,PacmanLoader,MoonLoader} from "react-spinners";
import Loader from "react-loader";
function App() {
  const [userInput, setuserInput] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  function inputHandler(e){
    setuserInput(e.target.value);
    // console.log(e.target.value);
  }
  function handleKeyDown(e){
    if(e.key === "Enter" && userInput!==""){
      setShowLoader(true);
      
      
      
    }
  }
  return (
    <div className="App">
      <div className="head-container"><h1 className="head-text">Weather App</h1>
      <div className="search-box"><FontAwesomeIcon icon={faSearchLocation} /><input type="text" placeholder = "Enter City" className="input" onChange={inputHandler} onKeyDown={handleKeyDown}></input></div>
      
      </div>
      <div className="body-container">
      <RingLoader loading={showLoader} color="orange"></RingLoader>
      </div>
      
      
    </div>
  );
}

export default App;
