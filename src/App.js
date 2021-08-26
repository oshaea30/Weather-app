import React, {useState} from 'react';
import './App.css';
import ReactAnimatedWeather from 'react-animated-weather';

const api = {
  key: "f67490d0dd2daf9963641a5f4fda7e7b",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
   const [query, setQuery] = useState('');
   const [weather, setWeather] = useState({});

   const search = evt => {
     if (evt.key === "Enter") {
       fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
         .then(res => res.json())
         .then(result => {
           setWeather(result)
           setQuery('')
           console.log(result)
          });
       
     }
   }
  
   const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month}  ${date} ${year}` 
   }

  return (
    <div className={(typeof weather.main !== "undefined") 
    ? ((weather.main.temp >16) 
    ? 'app warm' : 'app') 
    : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" 
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
       <div>
        <div className="location-box">
          <div className="location">{weather.name}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
        <div className="weather">{weather.weather[0].description}</div>
          <div className="temp">
            {Math.round(weather.main.temp)}°F
          </div>
          <div className="max-temp">H:{Math.round(weather.main.temp_max)}° L:{Math.round(weather.main.temp_min)}°</div>
        </div>
       </div>
        ) : ('')}
      </main>
 
    </div>
  );
}

export default App;
