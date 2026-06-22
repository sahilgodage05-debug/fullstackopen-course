// ============================================
// Exercises 2.18 - 2.20: Countries
//
// 2.18 - Sab countries fetch karo, filter karo, result ke count ke basis pe show karo
// 2.19 - List mein har country ke sath "show" button
// 2.20 - Single country view mein capital ka weather dikhao
// ============================================

import { useState, useEffect } from 'react'
import Search from './components/Search'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])       // all countries from API
  const [filter, setFilter] = useState('')              // search input
  const [selectedCountry, setSelectedCountry] = useState(null) // exercise 2.19: show button se set hota hai

  // Exercise 2.18: mount pe saare countries fetch karo
  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  // Filter change hone par selected country reset karo
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setSelectedCountry(null)
  }

  // Exercise 2.19: "show" button handler
  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  // Filter logic - case insensitive
  const filteredCountries = filter.trim() === ''
    ? []
    : countries.filter(c =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  // Kya dikhana hai?
  const renderContent = () => {
    // Kuch search nahi kiya abhi tak
    if (filter.trim() === '') {
      return <p>Search for a country above.</p>
    }

    // Exercise 2.19: "show" button se koi country select hua
    if (selectedCountry) {
      return <CountryDetail country={selectedCountry} />
    }

    // Exercise 2.18: 10 se zyada matches
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    // Koi match nahi mila
    if (filteredCountries.length === 0) {
      return <p>No countries match your search.</p>
    }

    // Exercise 2.18: exactly 1 match → seedha detail dikhao
    if (filteredCountries.length === 1) {
      return <CountryDetail country={filteredCountries[0]} />
    }

    // Exercise 2.19: 2–10 matches → list with show buttons
    return (
      <CountryList
        countries={filteredCountries}
        onShow={handleShow}
      />
    )
  }

  return (
    <div>
      <h2>Countries</h2>

      {/* Exercise 2.18: search input */}
      <Search filter={filter} onFilterChange={handleFilterChange} />

      {/* Result area */}
      {renderContent()}
    </div>
  )
}

export default App
