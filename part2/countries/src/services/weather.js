// Exercise 2.20 - OpenWeatherMap API service
// API key .env file mein hona chahiye as VITE_WEATHER_API_KEY
// Vite sirf VITE_ prefix wale variables expose karta hai browser ko

import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (city) => {
  return axios
    .get(`${baseUrl}?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.data)
}

// Weather icon URL banana
const getIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export default { getWeather, getIconUrl }
