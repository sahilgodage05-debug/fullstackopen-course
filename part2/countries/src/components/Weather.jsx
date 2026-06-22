// Exercise 2.20 - Weather component for the capital city
// OpenWeatherMap API use karta hai
// API key: VITE_WEATHER_API_KEY environment variable

import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  // Har baar capital badlega toh weather fetch hoga
  useEffect(() => {
    if (!capital) return
    setWeather(null) // loading state - purana weather clear karo

    weatherService
      .getWeather(capital)
      .then(data => setWeather(data))
      .catch(() => setWeather(null))
  }, [capital])

  if (!weather) return <p>Loading weather for {capital}...</p>

  const iconUrl = weatherService.getIconUrl(weather.weather[0].icon)

  return (
    <div className="weather-box">
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        title={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
