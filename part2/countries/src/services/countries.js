// Exercise 2.18 - Countries REST API service
// https://studies.cs.helsinki.fi/restcountries/

import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

// Saare countries ek baar fetch karo, filter client-side hoga
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

export default { getAll }
