import './App.css';
import { FaSearchLocation } from "react-icons/fa";
function App() {
  return (
    <div className="App">
      <div className="head-container"><h1>Weather App</h1>
      <FaSearchLocation></FaSearchLocation><input type="text" placeholder = "Enter City"></input>
      </div>

      
    </div>
  );
}

export default App;
