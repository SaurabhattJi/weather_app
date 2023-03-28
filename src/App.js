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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (e.target.name.value === data?.name) {
  //     setSearch(e.target.value);
  //   } else {
  //     console.log("error in submit");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.name.value); // whatever you typed into the input
  };

  // const handleSubmit = (e) => {
  //   if (e.target.name.value === data?.name) {
  //     setSearch(e.target.name.value);
  //   } else {
  //     console.log("error in setting the value in input field");
  //   }
  // };

  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={data?.name}
          onChange={(e) => console.log(setSearch(e.target.value))}
        />
        <button>Search</button>
      </form> */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />

        <input type="submit" value="submit" />
      </form>
      {search === data?.name ? (
        <div className="content">
          <h1>{data?.name}</h1>
          <h3>Temperature: {data?.main?.temp}°C</h3>
          <p>Humidity: {data?.main?.humidity} %</p>
        </div>
      ) : (
        <h4>! - No Data Found</h4>
      )}
    </div>
  );
}

export default App;
