// ============================================
// Exercise 2.13 - Backend communication service module
//
// Saari axios calls yahan hain — App.jsx clean rehta hai
// ============================================

import axios from 'axios'

const baseUrl = '/api/persons'

// Sabhi persons fetch karo
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

// Naya person create karo (POST)
const create = (personObject) => {
  return axios.post(baseUrl, personObject).then(response => response.data)
}

// Person delete karo by id (DELETE)
// Note: "delete" reserved word hai JavaScript mein, isliye "remove" naam use kiya
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// Person ka number update karo (PUT)
const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data)
}

export default { getAll, create, remove, update }
