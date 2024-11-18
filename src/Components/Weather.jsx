import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from "../assets/clear.png";
import humidity_icon from '../assets/humidity.png'
import wind_icon from "../assets/wind.png";
import More from './More'
import './Weather.css'


function Weather() {
    const [WeatherData,setWeatherData]=useState(false)
    const inputRef=useRef()

    const roundTo=(temp)=>{
        let tempr=0;
        if(temp){
            tempr=temp.toFixed(1)
        }
        return tempr;
    }

    const icon=(icon)=>{
        const url = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
        return url;
    }

    const search=async(city)=>{
        inputRef.current.value=''
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            // console.log(import.meta.env.VITE_APP_ID);
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                temp:data.main.temp,
                humidity:data.main.humidity,
                wind_speed:data.wind.speed,
                location:data.name,
                details:data.weather[0].main,
                icon:data.weather[0].icon,
                feels_like:data.main.feels_like,
                pressure:data.main.pressure,
                temp_max:data.main.temp_max,
                temp_min:data.main.temp_min
            })
            // console.log(WeatherData.location)
        } catch (error) {
            console.log("error=", error.message)
        }
    }

    const handleKeyDown=(event)=>{
        if(event.key==='Enter'){
            search(inputRef.current.value)
            inputRef.current.value=''
        }
    }

    useEffect(()=>{
        search("Bangalore")
    },[])

  return (
    <div className="Weather">
      <div className="search_bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={handleKeyDown}
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>
      <div className="icon">
        {/* <img src={clear_icon} alt="" /> */}
        {/* https://openweathermap.org/img/wn/${WeatherData.icon}@2x.png */}
        <img src={icon(WeatherData.icon) || clear_icon} alt="" />
        {/* {console.log(WeatherData.icon)} */}
      </div>
      <div>
        <p className="temp">{roundTo(WeatherData.temp)} °C</p>
        <p className="weatherDetails">{WeatherData.details || "clear"}</p>
      </div>
      <p className="Location">{WeatherData.location || "City"}</p>
      <div className="weather_data">
        <div className="humidity">
          <div className="humidity_details">
            <img src={humidity_icon} alt="" />
            <p>{WeatherData.humidity}%</p>
          </div>
          <p>Humidity</p>
        </div>
        <div className="wind_speed">
          <div className="wind_details">
            <img src={wind_icon} alt="" />
            <p>{WeatherData.wind_speed} km/h</p>
          </div>
          <p>Wind Speed</p>
        </div>
      </div>
      <More data={WeatherData}/>
    </div>
  );
}

export default Weather
