import "./App.css";
import { useEffect, useState } from "react";
import React from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("Delhi");
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=60a2ec5a39ada3c71f3dd0699fe766a2`;

  const fetchData = async (url) => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      setData(data);
      setSearch(data?.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(API);
    // eslint-disable-next-line
  }, [search === data?.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.name.value);
  };

  // const date = new Date().toLocaleString;
  return (
    <div className="container">
      <div className="App">
        {search === data?.name ? (
          <>
            <div className="content">
              <h1>{data?.main?.temp}°</h1>
              <h3>{data?.name}</h3>
              <p>Humidity: {data?.main?.humidity} %</p>
              <p>Longitude: {data?.coord?.lon}</p>
              <p>Latitude: {data?.coord?.lat}</p>
              {/* <p>{date}</p> */}
            </div>
          </>
        ) : (
          <h4>! - No Data Found</h4>
        )}
      </div>
      <div className="App2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Search Here "
            autoComplete="off"
          />

          <button type="submit" value="submit">
            Search
          </button>
        </form>
        <div className="temp" style={{ marginTop: "20px" }}>
          <ul>
            <li>Minimum Temperature: {data?.main?.temp_min}°</li>
            <li>Maximum Temperature: {data?.main?.temp_max}°</li>
            <li>Wind Speed: {data?.wind?.speed} Kmph</li>
            <li>Degree: {data?.wind?.deg}°</li>
            <li>Pressure: {data?.main?.pressure} Pascal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
