import './App.css';
import React, { useState } from 'react';

const api = {
  key: "7722e2663007701afbba36df146b2e6c",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      //call to fetch weather from api url using api key
      console.log(query)
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json()) //get response, convert to json
        .then(result => {
          setWeather(result)
          setQuery(''); //once we've submitted, reset query value to search again
          console.log(result);
        }); //passes result and we set weather to result
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //Template literals (`) can contain placeholders. 
    //These are indicated by the dollar sign and curly braces (${expression}).
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      //if the weather is undefined, only show 'App'
      (typeof weather.main != "undefined") ? (
        //if the weather is above 60, show 'App warm' otherwise show 'App cold'
        (weather.main.temp > 60) ? 'App warm' : 'App cold'
      ) : 'App'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search.."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°f
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </>) : ('')}
      </main>
    </div>
  );
}

export default App;
