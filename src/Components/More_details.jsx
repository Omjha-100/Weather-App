import React from 'react'
import './More_details.css'
const More_details = (WeatherData) => {
  return (
    <div className="more_details">
      <div className="temp_details">
        <span>Max Temp {WeatherData.data.temp_max} °C</span>
        <span>Min Temp {WeatherData.data.temp_min} °C</span>
      </div>
      <div className="other">
        <span>Feels Like {WeatherData.data.feels_like} °C</span>
        <span>Pressure {(WeatherData.data.pressure)/1000} bar</span>
      </div>
    </div>
  );
}

export default More_details
