import "./App.css";
import "./Responsive.css"
import { useEffect, useState } from "react";
import axios from "axios";
import loadingImg from "./image/loading.webp"
function App() {
  // useState to set search keyword and setting current and location details
  const [searchKey, setSearchKey] = useState("bhojpur");
  const [current, setCurrent] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMessage , setErrorMessage] = useState("")

  // useEffect "searchKey" as dependency
  useEffect(() => {
    getData();
  }, [searchKey]);
  // useEffect end

  // Passing params as custom query
  const params = {
    access_key: "12413d12510d42113973019d39df135c",
    query: searchKey,
  };
  // custom query end

  // getting data from api
  const getData = async () => {
    try {
      let response = await axios.get("http://api.weatherstack.com/current", {
        params,
      });
      setCurrent(response.data.current);
      setLocation(response.data.location);
      setErrorMessage(response.data.error.info)
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  };
  // api call ends

  // toggle for displaying more details start
  const [show, setShow] = useState(false);
  const [btnMessage, setBtnMessage] = useState("More details");
  const showMore = () => {
    if (!show) {
      setShow(true);
      setBtnMessage("Hide Details");
    } else {
      setShow(false);
      setBtnMessage("More details");
    }
  };
    // toggle end

  return (
    <div className="App">
    {/* nav start  */}
    
    <div className="header">
        <div className="brandName">
          <span>W</span>eather<span>A</span>pp
        </div>
        <input
          type="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
    {/* nav end */}
     
    {/* body start */}

     { current!=null ?
      <div className="container">
        <div className="mainDetails">
          <div className="timeDate">
            <p>{location.localtime.split(" ")[0]}</p>
            <hr />
            <hr />
            <h2 style={{ color: "blue" }}>{location.localtime.split(" ")[1]}</h2>
          </div>

          <div className="tempCity">
            <h1 className="temp">
              {current.temperature}<sup>o</sup>C
            </h1>
            <b>{location.name}</b>
          </div>

          <div className="weatherCond">
            <img
              src={current.weather_icons}
              alt=""
            />
            <p>{current.weather_descriptions}</p>
          </div>
        </div>
        <div className="otherDetails">
          <p>
            <b>Humidity </b>: {current.humidity}%
          </p>
          <p>
            <b>Precipitation</b> : {current.precip}mm
          </p>
        </div>
        <button onClick={showMore}>{btnMessage}</button>
      </div> :
      <div className="loadingImg">
      {/* error message start */}
    {
      errorMessage!=="" && <h1 style={{color:"red", textAlign:"center"}}>{errorMessage}</h1> 
    }
    {/* error message end */}
      <img src={loadingImg} alt="" />
      </div>
      
     }
      
    {/* body end */}

    {/* show more details start */}
    
      {show && (
        <div className="moreDetails">
          <p>
            <b>Wind Speed :</b> {current.wind_speed} km/h
          </p>
          <p>
            <b>Wind Direction :</b> {current.wind_dir}...
          </p>
          <p>
            <b>Wind degree :</b> {current.wind_degree}<sup>o</sup>
          </p>
          <p>
            <b>Cloud Cover :</b> {current.cloudcover} %
          </p>
          <p>
            <b>Feels Like :</b> {current.feelslike} <sup>o</sup>C
          </p>
          <p>
            <b>Visibility :</b> {current.visibility} m
          </p>
        </div>
      )}
      {/* show more details end */}
    </div>
  );
}

export default App;
