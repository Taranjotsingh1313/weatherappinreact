import { React, useState } from "react";
import { ReactComponent as Logo } from "./sun.svg";
import { ReactComponent as Search } from "./search.svg";
import "./css/header.css";
import axios from "axios";
function Header() {
  const [state, setstate] = useState(false);
  const [name, setname] = useState();
  const [city, setcity] = useState("");
  const [temp, settemp] = useState("");
  const [speed, setspeed] = useState("");
  const [cloud, setcloud] = useState("");
  const toget = (e) => {
    setname(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7ea1cdf8496c6f6dd2a3b94c6e8efc0d`
      )
      .then((res) => {
        setcity(res.data.name);
        console.log(res);
        setstate(true);
        settemp(res.data.main.temp);
        setspeed(res.data.wind.speed);
        setcloud(res.data.weather[0].description);
      })
      .catch((er) => {
        console.log("please check city name or try again");
      });
  };
  return (
    <header>
      <nav className="navbar">
        <Logo className="sun" />
        <h2 className="navbar__heading">MYweather</h2>
      </nav>
      <form onSubmit={submit}>
        <div className="input">
          <Search id="search" />
          <input
            type="text"
            onChange={(e) => {
              toget(e);
            }}
            className="weather_input"
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className="result" id={!state ? "none" : ""}>
        <h1 className="location_name">{city}</h1>
        <div className="flex-to">
          <h1 className="temprature">Temp: {temp}</h1>
          <div className="winds">
            <h3 className="wind">Wind: </h3>
            <h3 className="wind_speed">{speed}</h3>
          </div>
        </div>
        <h2 className="clouds">Cloud: {cloud}</h2>
      </div>
    </header>
  );
}

export default Header;
